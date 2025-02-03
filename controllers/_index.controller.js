const db = require("../config/db.config");
const dataUnity = require("../utils/arrange");
const multer = require("multer");
const upload = require("../utils/uploadsHandler");

// ---- All Index routes here ----
exports.indexDeshboard = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    const viewMode = req.query.viewMode || "grid";
    const category = req.query.category;
    let query = `SELECT properties.*, MIN(prop_images.location) AS imgLink 
                 FROM properties 
                 LEFT JOIN prop_images ON properties.id = prop_images.prop_id`;
    if (category) {
      query += ` WHERE  properties.category LIKE  ?`;
    }
    query += ` GROUP BY properties.id`;
    try {
      const [results] = await db.query(query, category ? [`%${category}%`] : []);
      res.status(200).render("../views/admin/_index.ejs", { data: results,viewMode });
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).send("Error fetching properties.");
    }
  } else {
    res.redirect("/admin/login");
  }
};

exports.clientsPage = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    const query = `select * from clients;`;
    try {
      const [results] = await db.query(query);
      res.status(200).render("../views/admin/clients.ejs", { data: results });
    } catch (error) {
      console.error("E rror fetching properties:", error);
      res.status(500).send("Error fetching properties.");
    }
  }
};
exports.ownersPage = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    const query = `select * from owners;`;
    try {
      const [results] = await db.query(query);
      res.status(200).render("../views/admin/owners.ejs", { data: results });
    } catch (error) {
      console.error("E rror fetching properties:", error);
      res.status(500).send("Error fetching properties.");
    }
  }
};

exports.insertProp = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    upload.array("upload__inputfile", 20)(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).send({ msg: "File upload failed." });
      }

      try {
        const formData = req.body;
        const uploadedFiles = req.files;
        if (!uploadedFiles || uploadedFiles.length === 0) {
          return res
            .status(400)
            .json({ message: "No files uploaded. Please upload files." });
        }
        const query = `INSERT INTO properties (name, number, location, bhk, floor, map_link, owner_name, owner_number, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
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
        ];
        const [result] = await db.query(query, values);
        const propertyId = result.insertId;
        if (!propertyId) {
          throw new Error("Property insertion failed. No propertyId returned.");
        }
        const imageQuery = `INSERT INTO prop_images (prop_id, location, pref) VALUES (?, ?, ?)`;
        const imagePromises = uploadedFiles.map((file) => {
          const imagePath = file.filename;
          const imageName = file.originalname;
          if (!imagePath || !imageName) {
            console.error("Invalid image data:", file);
            return Promise.reject("Invalid image data");
          }
          return db.query(imageQuery, [propertyId, imagePath, imageName]);
        });
        await Promise.all(imagePromises);
        console.log("All images inserted successfully");
        res.redirect("/admin/dashboard");
      } catch (error) {
        console.error("Error inserting property:", error);
        res.status(500).send({ msg: "Failed to insert property." });
      }
    });
  } else {
    res.redirect("/admin/login");
  }
};

exports.PropertiesForm = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    res.status(200).render("../views/admin/form.ejs");
  } else {
    res.status(500).send({ msg: "Some internal error has occurred !!" });
  }
};

exports.PropertiesDetailsPage = async (req, res) => {
  const query = `SELECT properties.id AS property_id,
    properties.name,properties.number,properties.location,properties.bhk,properties.floor,properties.map_link,properties.owner_name,properties.owner_number,properties.category,prop_images.prop_id,
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
      prop_id: results[0].prop_id,
    };
    const images = results.map((row) => ({
      location: row.image_location,
      pref: row.image_pref,
    }));
    const responseData = { metadata, images };
    res.status(200).render("../views/admin/propertieDetails.ejs", { data: responseData });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Error fetching properties.");
  }
};
