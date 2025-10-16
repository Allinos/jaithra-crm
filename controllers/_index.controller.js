const db = require("../config/db.config");
const dataUnity = require("../utils/arrange");
const multer = require("multer");
const upload = require("../utils/uploadsHandler");

// ---- All Index routes here ----
exports.indexDeshboard = async (req, res) => {
  const viewMode = req.query.viewMode || req.session.viewMode || "table";
  if (req.query.viewMode) {
    req.session.viewMode = viewMode;
    return res.redirect("/admin/dashboard?from=0&to=1");
  }
  try {
    let query = `SELECT 
  COUNT(*) AS total_invoices,
  SUM(CASE WHEN status = 'Paid' THEN 1 ELSE 0 END) AS paid_invoices,
  SUM(CASE WHEN status = 'Unpaid' THEN 1 ELSE 0 END) AS unpaid_invoices,
  SUM(CASE WHEN status = 'Pay soon' THEN 1 ELSE 0 END) AS paysoon_invoices,
  SUM(CASE WHEN status = 'Credit' THEN 1 ELSE 0 END) AS credit_invoices,
  SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending_invoices,

  SUM(amount) AS total_invoice_amount,
  SUM(CASE WHEN status = 'Paid' THEN amount ELSE 0 END) AS paid_invoice_amount,
  SUM(CASE WHEN status = 'Unpaid' THEN amount ELSE 0 END) AS unpaid_invoice_amount,
  SUM(CASE WHEN status = 'Pay soon' THEN amount ELSE 0 END) AS paysoon_invoice_amount,
  SUM(CASE WHEN status = 'Credit' THEN amount ELSE 0 END) AS credit_invoice_amount,
  SUM(CASE WHEN status = 'Pending' THEN amount ELSE 0 END) AS pending_invoice_amount
  FROM invoices;

  SELECT * FROM invoices ORDER BY invoice_date DESC LIMIT 6;
  SELECT COUNT(*) AS total_leads FROM leads;
  SELECT COUNT(*) AS total_clients FROM clients;
  SELECT COUNT(*) AS total_users FROM users;
  SELECT SUM(amount) AS total_clientsPayment FROM client_payments;
  `;




    const [results] = await db.query(query);
    console.log(results);
    res.status(200).render("../views/admin/_dashboard.ejs", { data: results, viewMode });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).send("Error fetching invoices.");
  }
};
exports.invoice = async (req, res) => {
  const viewMode = req.query.viewMode || req.session.viewMode || "table";
  if (req.query.viewMode) {
    req.session.viewMode = viewMode;
    return res.redirect("/admin/dashboard?from=0&to=1");
  }
  try {
    let query;
    let params = [];
    if (req.query.search) {
      const searchTerm = `%${req.query.search}%`;
      query = `  SELECT *
        FROM   invoices
        WHERE  location LIKE ?
        OR bhk LIKE ?
        OR floor LIKE ?
        OR owner_name LIKE ?
        OR owner_number LIKE ?
        OR NAME LIKE ?
        ORDER  BY id DESC;`;
      params = [
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm,
      ];
    } else {
      query = `
         SELECT i.*,c.name FROM invoices i LEFT JOIN clients c on c.id=i.client_id
        `;
      if (req.query.category) {
        query += ` WHERE i.category LIKE ? `;
        params.push(`%${req.query.category}%`);
      }
      query += `ORDER BY i.id DESC `;
    }
    const [results] = await db.query(query, params);
    res
      .status(200)
      .render("../views/admin/invoices.ejs", { data: results, viewMode });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).send("Error fetching invoices.");
  }
};
exports.clientsPage = async (req, res) => {
  try {
    let query = `SELECT 
    c.id, 
    c.name, 
    c.number, 
    c.location, 
    c.category, 
    c.other, 
    c.address, 
    c.gst, 
    c.status, 
    c.date,
    i.total_amount, 
    p.paid
FROM clients c
LEFT JOIN (
    SELECT client_id, SUM(amount) AS total_amount
    FROM invoices
    GROUP BY client_id
) i ON c.id = i.client_id
LEFT JOIN (
    SELECT client_id, SUM(amount) AS paid
    FROM client_payments
    GROUP BY client_id
) p ON c.id = p.client_id;
`;
    let params = [];

    if (req.query.search) {
      query = `SELECT * FROM clients WHERE name LIKE ? OR budget LIKE ? OR number LIKE ? OR location LIKE ? ORDER BY id DESC`;
      const search = `%${req.query.search}%`;
      params = [search, search, search];
    }

    const [results] = await db.query(query, params);
    res.status(200).render("../views/admin/clients.ejs", {
      data: results,
      search: req.query.search || "",
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).send("Error fetching clients.");
  }
};
exports.leadsPage = async (req, res) => {
  try {
    let query = `SELECT * FROM leads ORDER BY id DESC`;
    let params = [];

    if (req.query.search) {
      query = `SELECT * FROM leads WHERE name LIKE ? OR budget LIKE ? OR number LIKE ? OR location LIKE ? ORDER BY id DESC`;
      const search = `%${req.query.search}%`;
      params = [search, search, search];
    }

    const [results] = await db.query(query, params);
    res.status(200).render("../views/admin/leads.ejs", {
      data: results,
      search: req.query.search || "",
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send("Error fetching leads.");
  }
};

exports.userPage = async (req, res) => {
  try {
    let query = `SELECT * FROM users ;`;
    let params = [];
    let role = req.session.role;
    console.log(req.session);

    if (req.query.search) {
      query = `SELECT * FROM owners WHERE name LIKE ? OR email LIKE ? OR contact LIKE ? ORDER BY id DESC`;
      const search = `%${req.query.search}%`;
      params = [search, search, search];
    }

    const [results] = await db.query(query, params);
    res.status(200).render("../views/admin/userManager.ejs", {
      data: results,
      search: req.query.search || "",
      role,
    });
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).send("Error fetching owners.");
  }
};

exports.insertInvoice = async (req, res) => {
  try {
    const {
      invoice_id,
      amount,
      mode,
      invoice_date,
      due_date,
      status,
      sales_by,
      category,
      client_id,
    } = req.body;
    // Validation: Make sure essential fields are present
    console.log(req.body);

    if (!invoice_id || !amount || !invoice_date || !due_date) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    const insertQuery = `
      INSERT INTO invoices (invoice_id, amount,mode, invoice_date, due_date, status, sales_by, category,client_id)
      VALUES (?, ?, ?,?, ?, ?, ?, ?,?)
      `;

    const values = [
      invoice_id,
      amount,
      mode,
      invoice_date,
      due_date,
      status,
      sales_by,
      category,
      client_id || null,
    ];

    const [result] = await db.query(insertQuery, values);
    if (result.affectedRows === 0) {
      throw new Error("Invoice insertion failed.");
    }
    res.status(200).redirect("/admin/form");
  } catch (error) {
    console.error("Error inserting invoice:", error);
    res.status(500).json({ status: false, msg: "Failed to insert invoice." });
  }
};

exports.invoice_Add_Form = async (req, res) => {
  try {
    let query = `SELECT id, name FROM clients ORDER BY id `;
    const [results] = await db.query(query);

    res.status(200).render("../views/admin/form.ejs", { data: results });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send("Error fetching leads.");
  }
};

// exports.ownersPage = async (req, res) => {
//   try {
//     let query = `SELECT * FROM owners ORDER BY id DESC`;
//     let params = [];

//     if (req.query.search) {
//       query = `SELECT * FROM owners WHERE name LIKE ? OR email LIKE ? OR contact LIKE ? ORDER BY id DESC`;
//       const search = `%${req.query.search}%`;
//       params = [search, search, search];
//     }

//     const [results] = await db.query(query, params);
//     res.status(200).render("../views/admin/owners.ejs", {
//       data: results,
//       search: req.query.search || "",
//     });
//   } catch (error) {
//     console.error("Error fetching owners:", error);
//     res.status(500).send("Error fetching owners.");
//   }
// };
