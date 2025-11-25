const express = require("express");
const router = express.Router();
const authController = require("../../controllers/_auth.js");

// Redirect root
router.get("/", (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/crm/dashboard?from=0&to=1");
  } else {
    res.redirect("/crm/login");
  }
});
// Login page
router.get("/login", authController.renderLoginPage);
// Authentication
router.post("/auth", authController.authenticate);
// Logout
router.get("/logOut", authController.logout);

module.exports = router;
