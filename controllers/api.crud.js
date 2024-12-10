const databaseCon = require("../config/db.config.js");
// const { EmailSender } = require("../utils/emailSender.js");

exports.GetImagesByID = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    const q = `SELECT * FROM prop_images where prop_id=${req.params.id}`;
    try {
      const [results] = await databaseCon.query(q);
      res.status(200).send({ data: results });
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).send("Error fetching properties.");
    }
  } else {
    res.redirect("/admin/login");
  }
};

// Add Client
exports.AddClient = async (req, res) => {
  if (!req.session.isLoggedIn || req.session.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized access. Admin role required." });
  }
  const { name, number, location, bhk, budget } = req.body;
  try {
    const [result] = await databaseCon.query(
      "INSERT INTO clients (name, number, location, bhk, budget) VALUES (?, ?, ?, ?, ?)",
      [name, number, location, bhk, budget]
    );
    res.redirect('/admin/clients');
  } catch (error) {
    console.error("Error adding client:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};

// Add Owner
exports.AddOwner = async (req, res) => {
  if (!req.session.isLoggedIn || req.session.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized access. Admin role required." });
  }

  const { name, number, location } = req.body;

  if (!name || !number || !location) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [result] = await databaseCon.query(
      "INSERT INTO owners (name, number, location) VALUES (?, ?, ?)",
      [name, number, location]
    );
    res.redirect('/admin/owners');
  } catch (error) {
    console.error("Error adding owner:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};

// Update Clients by ID
exports.UpdateClientsByID = async (req, res) => {
  if (!req.session.isLoggedIn || req.session.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized access. Admin role required." });
  }

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
      return res.status(404).json({ message: "Client not found. No update performed." });
    }

    res.status(200).json({
      message: "Client updated successfully.",
      updatedFields: { name, number, location, bhk, budget },
    });
  } catch (error) {
    console.error("Error updating client:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};

// Delete Clients by ID
exports.DeleteClientsByID = async (req, res) => {
  if (!req.session.isLoggedIn || req.session.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized access. Admin role required." });
  }
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

// Update Owners by ID
exports.UpdateOwnersByID = async (req, res) => {
  if (!req.session.isLoggedIn || req.session.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized access. Admin role required." });
  }

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
      return res.status(404).json({ message: "Owner not found. No update performed." });
    }

    res.status(200).json({
      message: "Owner updated successfully.",
      updatedFields: { name, number, location },
    });
  } catch (error) {
    console.error("Error updating owner:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};

// Delete Owners by ID
exports.DeleteOwnersByID = async (req, res) => {
  if (!req.session.isLoggedIn || req.session.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized access. Admin role required." });
  }
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

    res
      .status(200)
      .json({status:true, message: "Owner deleted successfully.", deletedOwnerID: id });
  } catch (error) {
    console.error("Error deleting owner:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
};
