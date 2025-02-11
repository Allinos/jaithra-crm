const databaseCon = require("../config/db.config.js");
const { createHmac } = require("crypto");
const fs = require("fs");
const path = require("path");

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

exports.PropertieDelete = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const fetchImagesQuery = `SELECT location FROM prop_images WHERE prop_id = ?`;
    const [images] = await databaseCon.query(fetchImagesQuery, [propertyId]);
    images.forEach((image) => {
      const filePath = path.join(
        __dirname,
        "../static/uploads",
        image.location
      );
      fs.unlink(filePath, (err) => {
        console.log(filePath);
        if (err) {
          console.error(`Failed to delete file ${filePath}:`, err);
        }
      });
    });
    const deleteImagesQuery = `DELETE FROM prop_images WHERE prop_id = ?`;
    await databaseCon.query(deleteImagesQuery, [propertyId]);
    const deletePropertyQuery = `DELETE FROM properties WHERE id = ?`;
    const [result] = await databaseCon.query(deletePropertyQuery, [propertyId]);
    if (result.affectedRows === 0) {
      return res.status(404).send({
        status: false,
        msg: "Property not found or already deleted.",
      });
    }
    res.status(200).send({
      status: true,
      msg: "Property and associated images deleted successfully! 😊",
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).send({ status: false, msg: "Failed to delete property." });
  }
};

exports.PropertieUpdate = async (req, res) => {
  const {
    id,
    name,
    location,
    bhk,
    floor,
    map_link,
    owner_name,
    owner_number,
    category,
  } = req.body;
  const sql = `UPDATE properties SET location = ?, bhk = ?, floor = ?, map_link = ?, owner_name = ?, owner_number = ?, category = ?, name = ? WHERE id = ? `;
  try {
    const [result] = await databaseCon.query(sql, [
      location,
      bhk,
      floor,
      map_link,
      owner_name,
      owner_number,
      category,
      name,
      id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Property not found. No update performed." });
    } else {
      res.status(200).json({ status: true, error: "Updates Successfully" });
    }
  } catch (error) {
    console.error("Error updating Property:", error.message);
    res.status(500).json({
      status: false,
      error: "Internal server error.",
      details: error.message,
    });
  }
};

// Add Client
exports.AddClient = async (req, res) => {
  const { name, number, location, bhk, budget } = req.body;
  try {
    const [result] = await databaseCon.query(
      "INSERT INTO clients (name, number, location, bhk, budget) VALUES (?, ?, ?, ?, ?)",
      [name, number, location, bhk, budget]
    );
    res.redirect("/admin/clients");
  } catch (error) {
    console.error("Error adding client:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};

// Add Owner
exports.AddOwner = async (req, res) => {
  const { name, number, location } = req.body;
  if (!name || !number || !location) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const [result] = await databaseCon.query(
      "INSERT INTO owners (name, number, location) VALUES (?, ?, ?)",
      [name, number, location]
    );
    res.redirect("/admin/owners");
  } catch (error) {
    console.error("Error adding owner:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};

// Update Clients by ID
exports.UpdateClientsByID = async (req, res) => {
  const { id } = req.params;
  const { name, number, location, bhk, budget } = req.body;

  if (!name || !number || !location || !bhk || !budget) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [result] = await databaseCon.query(
      "UPDATE clients SET name = ?, number = ?, location = ?, bhk = ?, budget = ? WHERE id = ?",
      [name, number, location, bhk, budget, id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Client not found. No update performed." });
    }
    res.redirect("/admin/clients");
  } catch (error) {
    console.error("Error updating client:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};
exports.StatusOfClientsByID = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "fields are required." });
  }

  try {
    const [result] = await databaseCon.query(
      "UPDATE clients SET status = ? WHERE id = ?",
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Client not found. No update performed." });
    }
    res.status(200).send({
      status: true,
      msg: "Client Updated successfully! 😊",
    });
  } catch (error) {
    console.error("Error updating client:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};
exports.DateofClientsByID = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  try {
    const [result] = await databaseCon.query(
      "UPDATE clients SET date = ? WHERE id = ?",
      [date, id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Client not found. No update performed." });
    }
    res.status(200).send({
      status: true,
      msg: "Client Updated successfully! 😊",
    });
  } catch (error) {
    console.error("Error updating client:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};
// Delete Clients by ID
exports.DeleteClientsByID = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await databaseCon.query(
      "DELETE FROM clients WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Client not found. No deletion performed." });
    }
    res.status(200).json({
      status: true,
      message: "Client deleted successfully.",
      deletedClientID: id,
    });
  } catch (error) {
    console.error("Error deleting client:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};

// Update Owners by ID
exports.UpdateOwnersByID = async (req, res) => {
  const { id } = req.params;
  const { name, number, location } = req.body;

  if (!name || !number || !location) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [result] = await databaseCon.query(
      "UPDATE owners SET name = ?, number = ?, location = ? WHERE id = ?",
      [name, number, location, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Owner not found. No update performed." });
    }

    res.redirect("/admin/owners");
  } catch (error) {
    console.error("Error updating owner:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};

// Delete Owners by ID
exports.DeleteOwnersByID = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await databaseCon.query(
      "DELETE FROM owners WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Owner not found. No deletion performed." });
    }

    res.status(200).json({
      status: true,
      message: "Owner deleted successfully.",
      deletedOwnerID: id,
    });
  } catch (error) {
    console.error("Error deleting owner:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};

exports.changePwdUser = (req, res) => {
  let password = createHmac("sha256", "zxcvbnmsdasgdrf")
    .update(req.body.Password)
    .digest("hex");
  const query = `UPDATE users SET password=? WHERE id=${req.params.id} `;
  databaseCon.query(query, [password], (err, result, field) => {
    if (!err) {
      res
        .status(200)
        .send({ status: true, msg: "Successfully Password Updated " });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};

exports.addUser = async (req, res) => {
  let role = req.body.role || "user";
  let password = createHmac("sha256", "zxcvbnmsdasgdrf")
    .update(req.body.Password)
    .digest("hex");
  const query = `INSERT INTO users (name,email,password,number,job_role,role) VALUES(?,?,?,?,?,?);`;
  await databaseCon.query(
    query,
    [
      req.body.Name,
      req.body.Email,
      password,
      req.body.Number,
      req.body.jobRole,
      role,
    ],
    (err, result, field) => {
      if (err) throw new errorHandler("", err);
      res.status(200).send({ status: true, msg: "Life success!" });
    }
  );
        
};
exports.getOneUser = (req, res) => {
  const query = `SELECT name,email,number,status FROM users WHERE id = ?  `;
  databaseCon.query(query, [req.params.id], (err, result, field) => {
    if (err) throw new errorHandler("", err);
    res.status(200).send({ status: true, msg: "Life success!", data: result });
  });
};
exports.updateUser = (req, res) => {
  let val = [];
  let query = `UPDATE users SET `;
  Object.keys(req.body).forEach((key, index, arr) => {
    query += `${key}=?`;
    val.push(req.body[key]);
    if (index < arr.length - 1) {
      query += ",";
    }
  });
  query += "WHERE id =?";
  val.push(req.params.id);
  console.log(query, val);
  databaseCon.query(query, val, (err, result, field) => {
    if (err) throw new errorHandler(err.statusCode, err);
    res.status(200).send({ status: true, msg: "Life success!" });
  });
};
exports.deleteUser = (req, res) => {
  const query = `UPDATE users SET status ='inactive' WHERE id=?; `;
  databaseCon.query(query, [req.params.id], (err, result, field) => {
    if (err) throw new errorHandler(err.status, err);
    res.status(200).send({ status: true, msg: "Life success!" });
  });
};
