const db = require("../config/db.config");
const dataUnity = require("../utils/arrange");
const multer = require("multer");
const upload = require("../utils/uploadsHandler");

// ---- All Index routes here ----
exports.indexDeshboard = async (req, res) => {
  const viewMode = req.query.viewMode || req.session.viewMode || "grid";
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
        FROM   properties
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
          SELECT properties.*, MIN(prop_images.location) AS imgLink 
          FROM properties 
          LEFT JOIN prop_images ON properties.id = prop_images.prop_id
        `;
      if (req.query.category) {
        query += ` WHERE properties.category LIKE ? `;
        params.push(`%${req.query.category}%`);
      }
      query += ` GROUP BY properties.id ORDER BY properties.id DESC `;
    }
    const [results] = await db.query(query, params);
    res
      .status(200)
      .render("../views/admin/_index.ejs", { data: results, viewMode });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Error fetching properties.");
  }
};

exports.clientsPage = async (req, res) => {
  try {
    let query = `SELECT * FROM clients ORDER BY id DESC`;
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

exports.ownersPage = async (req, res) => {
  try {
    let query = `SELECT * FROM owners ORDER BY id DESC`;
    let params = [];

    if (req.query.search) {
      query = `SELECT * FROM owners WHERE name LIKE ? OR email LIKE ? OR contact LIKE ? ORDER BY id DESC`;
      const search = `%${req.query.search}%`;
      params = [search, search, search];
    }

    const [results] = await db.query(query, params);
    res.status(200).render("../views/admin/owners.ejs", {
      data: results,
      search: req.query.search || "",
    });
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).send("Error fetching owners.");
  }
};

exports.userPage = async (req, res) => {
  try {
    let query = `SELECT * FROM users ;`;
    let params = [];
    let role=req.session.role;
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
      role
    });
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).send("Error fetching owners.");
  }
};

exports.queriesPage = async (req, res) => {
  const query = `select * from queries;`;
  try {
    const [results] = await db.query(query);
    res.status(200).render("../views/admin/queries.ejs", { data: results });
  } catch (error) {
    console.error("E rror fetching properties:", error);
    res.status(500).send("Error fetching properties.");
  }
};

exports.insertProp = async (req, res) => {
  upload.array("upload__inputfile", 20)(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ msg: "File upload failed." });
    }

    try {
      const formData = req.body;
      const uploadedFiles = req.files;

      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res
          .status(400)
          .json({ msg: "No files uploaded. Please upload files." });
      }
      const query = `INSERT INTO properties (name, number, location, bhk, floor, map_link, owner_name, owner_number, category,amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
      const values = [
        formData.name,
        formData.number,
        formData.location,
        formData.bhk,
        formData.floor,
        formData.map_link,
        formData.owner_name,
        formData.owner_number,
        formData.category,
        formData.amount,
      ];

      const [result] = await db.query(query, values);
      const propertyId = result.insertId;

      if (!propertyId) {
        throw new Error("Property insertion failed. No propertyId returned.");
      }
      const imageQuery = `INSERT INTO prop_images (prop_id, location, pref) VALUES ?`;
      const imageData = uploadedFiles.map((file) => [
        propertyId,
        file.filename,
        file.originalname,
      ]);
      console.log("Start Time:", Date.now());
      await db.query(imageQuery, [imageData]);
      console.log("End Time:", Date.now());
      console.log("All images inserted successfully");
      res.redirect("/admin/dashboard?from=0&to=1");
    } catch (error) {
      console.error("Error inserting property:", error);
      res.status(500).json({ msg: "Failed to insert property." });
    }
  });
};

exports.PropertiesForm = async (req, res) => {
  res.status(200).render("../views/admin/form.ejs");
};

exports.PropertiesDetailsPage = async (req, res) => {
  const query = `SELECT properties.id AS property_id,
    properties.name,properties.number,properties.location,properties.bhk,properties.floor,properties.map_link,properties.owner_name,properties.owner_number,properties.category,properties.amount,prop_images.prop_id,
    prop_images.location AS image_location,prop_images.pref AS image_pref FROM properties LEFT JOIN prop_images ON prop_images.prop_id = properties.id WHERE properties.id = ?;`;
  try {
    const [results] = await db.query(query, [req.params.id]);
    if (results.length === 0) {
      return res.status(404).send("Property not found.");
    }
    const metadata = {
      id: results[0].property_id,
      name: results[0].name,
      number: results[0].number,
      location: results[0].location,
      bhk: results[0].bhk,
      floor: results[0].floor,
      map_link: results[0].map_link,
      owner_name: results[0].owner_name,
      owner_number: results[0].owner_number,
      category: results[0].category,
      amount: results[0].amount,
      prop_id: results[0].prop_id,
    };
    const images = results.map((row) => ({
      location: row.image_location,
      pref: row.image_pref,
    }));
    const responseData = { metadata, images };
    res
      .status(200)
      .render("../views/admin/propertieDetails.ejs", { data: responseData });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Error fetching properties.");
  }
};
