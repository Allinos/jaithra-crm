const databaseCon = require("../config/db.config.js");
const { createHmac } = require("crypto");
const fs = require("fs");
const path = require("path");

// Client Invoice
exports.InvoiceDelete = async (req, res) => {
  const invoiceId = req.params.id;
  try {
    const deleteInvoiceQuery = `DELETE FROM invoices WHERE id = ?`;
    const [result] = await databaseCon.query(deleteInvoiceQuery, [invoiceId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        status: false,
        msg: "Invoice not found or already deleted.",
      });
    }

    res.status(200).send({
      status: true,
      msg: "Invoice deleted successfully! 🧾",
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).send({
      status: false,
      msg: "Failed to delete invoice.",
      error: error.message,
    });
  }
};
exports.InvoiceUpdate = async (req, res) => {
  const {
    id,
    invoice_id,
    amount,
    invoice_date,
    due_date,
    status,
    sales_by,
    category,
  } = req.body;

  const updateQuery = `
    UPDATE invoices
    SET invoice_id = ?, amount = ?, invoice_date = ?, due_date = ?, status = ?, sales_by = ?, category = ?
    WHERE id = ?
  `;

  try {
    const [result] = await databaseCon.query(updateQuery, [
      invoice_id,
      amount,
      invoice_date,
      due_date,
      status,
      sales_by,
      category,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found. No update performed.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Invoice updated successfully!",
    });
  } catch (error) {
    console.error("Error updating invoice:", error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.UpdatePaymentInvoiceStatus = async (req, res) => {
  const {status} = req.body;

  const updateQuery = `UPDATE invoices SET status = ? WHERE id = ?  `;
  try {
    const [result] = await databaseCon.query(updateQuery, [status,req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found. No update performed.",
      });
    }
    res.status(200).json({
      status: true,
      message: "Invoice updated successfully!",
    });
  } catch (error) {
    console.error("Error updating invoice:", error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// Clients CRUD
exports.AddClient = async (req, res) => {
  const { name, number, location, category, other, address, gst, status, date } = req.body;

  try {
    const [result] = await databaseCon.query(
      "INSERT INTO clients (name, number, location, category, other, address, gst, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, number, location, category, other, address, gst, status, date]
    );
    res.redirect("/admin/clients");
  } catch (error) {
    console.error("Error adding client:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};
// Update an existing client by ID
exports.UpdateClientsByID = async (req, res) => {
  const { id } = req.params;
  const { name, number, location, category, other, address, gst, status, date } = req.body;

  if (!name || !number || !location || !category || !address) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    const [result] = await databaseCon.query(
      "UPDATE clients SET name = ?, number = ?, location = ?, category = ?, other = ?, address = ?, gst = ?, status = ?, date = ? WHERE id = ?",
      [name, number, location, category, other, address, gst, status, date, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found. No update performed." });
    }

    res.redirect("/admin/clients");
  } catch (error) {
    console.error("Error updating client:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};
// Update only the status of a client
exports.StatusOfClientsByID = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required." });
  }

  try {
    const [result] = await databaseCon.query(
      "UPDATE clients SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found. No update performed." });
    }

    res.status(200).send({ status: true, msg: "Client status updated successfully! 😊" });
  } catch (error) {
    console.error("Error updating client status:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};
// Update only the date of a client
exports.DateofClientsByID = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: "Date is required." });
  }

  try {
    const [result] = await databaseCon.query(
      "UPDATE clients SET date = ? WHERE id = ?",
      [date, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found. No update performed." });
    }

    res.status(200).send({ status: true, msg: "Client date updated successfully! 😊" });
  } catch (error) {
    console.error("Error updating client date:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};
// Delete client by ID
exports.DeleteClientsByID = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await databaseCon.query(
      "DELETE FROM clients WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found. No deletion performed." });
    }

    res.status(200).json({
      status: true,
      message: "Client deleted successfully.",
      deletedClientID: id,
    });
  } catch (error) {
    console.error("Error deleting client:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};

//CLIENT PAYMENTS
exports.AddClientPayment = async (req, res) => {
  const { client_id, amount, mode, date, remark, recievedby } = req.body;

  try {
    const [result] = await databaseCon.query(
      "INSERT INTO client_payments (client_id, amount, mode, date, remark, recievedby) VALUES (?, ?, ?, ?, ?, ?)",
      [client_id, amount, mode, date, remark, recievedby]
    );

    res.status(201).json({ message: "Payment added successfully", paymentId: result.insertId });
  } catch (error) {
    console.error("Error adding client payment:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
exports.GetAllClientPayments = async (req, res) => {
  try {
    const [payments] = await databaseCon.query("SELECT * FROM client_payments ORDER BY date DESC");
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
exports.GetClientPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await databaseCon.query("SELECT * FROM client_payments WHERE client_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({status:true,msg:'retrived successfully',data:rows});
  } catch (error) {
    console.error("Error fetching payment:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
exports.UpdateClientPayment = async (req, res) => {
  const { id } = req.params;
  const { client_id, amount, mode, date, remark, recievedby } = req.body;

  try {
    const [result] = await databaseCon.query(
      "UPDATE client_payments SET client_id = ?, amount = ?, mode = ?, date = ?, remark = ?, recievedby = ? WHERE id = ?",
      [client_id, amount, mode, date, remark, recievedby, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ message: "Payment updated successfully" });
  } catch (error) {
    console.error("Error updating payment:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
exports.DeleteClientPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await databaseCon.query("DELETE FROM client_payments WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ status: true,message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};





//Leads CRUD
exports.AddLead = async (req, res) => {
  const { name, number, location, inquery, oth, status, date } = req.body;

  try {
    const [result] = await databaseCon.query(
      "INSERT INTO leads (name, number, location, inquery, oth, status, date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, number, location, inquery, oth, status, date]
    );
    res.redirect("/admin/leads");
  } catch (error) {
    console.error("Error adding lead:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};
// Update lead by ID
exports.UpdateLeadsByID = async (req, res) => {
  const { id } = req.params;
  const { name, number, location, inquery, oth, status, date } = req.body;

  if (!name || !number || !location || !inquery || !oth) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [result] = await databaseCon.query(
      "UPDATE leads SET name = ?, number = ?, location = ?, inquery = ?, oth = ?, status = ?, date = ? WHERE id = ?",
      [name, number, location, inquery, oth, status, date, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found. No update performed." });
    }

    res.redirect("/admin/leads");
  } catch (error) {
    console.error("Error updating lead:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};
// Update lead status
exports.StatusOfLeadsByID = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status field is required." });
  }

  try {
    const [result] = await databaseCon.query(
      "UPDATE leads SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found. No update performed." });
    }

    res.status(200).json({ status: true, msg: "Lead status updated successfully! 😊" });
  } catch (error) {
    console.error("Error updating lead status:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};
// Update lead date
exports.DateofLeadsByID = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  try {
    const [result] = await databaseCon.query(
      "UPDATE leads SET date = ? WHERE id = ?",
      [date, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found. No update performed." });
    }

    res.status(200).json({ status: true, msg: "Lead date updated successfully! 😊" });
  } catch (error) {
    console.error("Error updating lead date:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};
// Delete lead
exports.DeleteLeadsByID = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await databaseCon.query(
      "DELETE FROM leads WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found. No deletion performed." });
    }

    res.status(200).json({
      status: true,
      message: "Lead deleted successfully.",
      deletedLeadID: id,
    });
  } catch (error) {
    console.error("Error deleting lead:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};




// Users CRUD
exports.changePwdUser = async (req, res) => {
  let password = req.body.Password.trim();
  try {
    let hashPassword = createHmac("sha256", "zxcvbnmsdasgdrf")
      .update(password)
      .digest("hex");
    const query = `UPDATE users SET password=? WHERE id=?`;

    const [result] = await databaseCon.query(query, [
      hashPassword,
      req.params.id,
    ]);
    console.log(password, req.body);
    console.log(hashPassword, result);

    res
      .status(200)
      .send({ status: true, msg: "Successfully Password Updated" });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        msg: "Internal error occurred!",
        error: err.message,
      });
    throw err;
  }
};

exports.addUser = async (req, res) => {
  try {
    console.log(req.body);

    let role = req.body.role || "user";
    let password = createHmac("sha256", "zxcvbnmsdasgdrf")
      .update(req.body.Password.trim())
      .digest("hex");
    const query = `INSERT INTO users (name, email, password, number, job_role, role) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await databaseCon.query(query, [
      req.body.Name,
      req.body.Email,
      password,
      req.body.Number,
      req.body.jobRole,
      role,
    ]);

    res.status(200).send({ status: true, msg: "User added successfully!" });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Error adding user!", error: err.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const query = `SELECT name, email, number, status FROM users WHERE id = ?`;
    const [result] = await databaseCon.query(query, [req.params.id]);

    res
      .status(200)
      .send({ status: true, msg: "User fetched successfully!", data: result });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Error fetching user!", error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let val = [];
    let query = `UPDATE users SET `;

    Object.keys(req.body).forEach((key, index, arr) => {
      query += `${key}=?`;
      val.push(req.body[key]);
      if (index < arr.length - 1) {
        query += ",";
      }
    });

    query += " WHERE id =?";
    val.push(req.params.id);
    console.log(val, query);

    const [result] = await databaseCon.query(query, val);

    res.status(200).send({ status: true, msg: "User updated successfully!" });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Error updating user!", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const query = `DELETE FROM users  WHERE id=?`;
    const [result] = await databaseCon.query(query, [req.params.id]);
    res.status(200).send({ status: true, msg: "User deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Error deleting user!", error: err.message });
  }
};








//////////////////not used Data////////////////
exports.GetImagesByID = async (req, res) => {
  const q = `SELECT * FROM prop_images where prop_id=${req.params.id}`;
  try {
    const [results] = await databaseCon.query(q);
    res.status(200).send({ data: results });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Error fetching properties.");
  }
};