const express = require("express");
const router = express.Router();
const path = require('path');
const authController = require("../../controllers/_auth.js");

// Redirect root
router.get("/", (req, res) => {
   res.status(200).sendFile(path.join(__dirname, '../../views/static_files/index.html'));
//    res.status(200).send({ message: "Welcome to Jaithra CRM" });
});


module.exports = router;
