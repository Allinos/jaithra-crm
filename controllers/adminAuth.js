const express = require("express");
const route = express.Router();
const { errorHandler } = require("../utils/errorHandler");
const databaseCon = require("../config/db.config");
const { createHmac } = require("crypto");

route.get("/", (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    res.redirect(`/admin/dashboard?from=0&to=1`);
  } else {
    res.redirect(`/admin/login`);
  }
});
route.get("/login", (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    res.redirect(`/admin`);
  } else {
    res.status(200).render("../views/admin/login.ejs");
  }
});

route.post("/auth", async (req, res) => {
  let Email = req.body.Email.trim();
  if (Email && req.body.Password) {
    try {
      const hash = createHmac("sha256", "secret")
        .update(req.body.Password)
        .digest("hex");
      const query = `SELECT email, password FROM adminauth WHERE email = ?`;
      const [rows] = await databaseCon.query(query, [Email]);
      if (rows.length > 0) {
        if (Email === rows[0].email && hash === rows[0].password) {
          req.session.isLoggedIn = true;
          req.session.email_id = Email;
          req.session.role = "admin";
          req.session.cookie.expires = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          );
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
          return res.redirect(`/admin`);
        } else {
          return res.status(503).send("Unauthorized");
        }
      } else {
        return res.redirect(`/admin/login`);
      }
    } catch (error) {
      console.error(error);
    }
  }
});

route.get("/logOut", (req, res) => {
  req.session.destroy();
  res.redirect(`/admin/login`);
});

module.exports = route;
