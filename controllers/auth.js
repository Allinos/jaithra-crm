const express = require("express");
const route = express.Router();
const { errorHandler } = require("../utils/errorHandler");
const databaseCon = require("../config/db.config");
const { createHmac } = require("crypto");

route.get("/", (req, res) => {
  if (req.session.isLoggedIn == true) {
    res.redirect(`/admin/dashboard?from=0&to=1`);
  } else {
    res.redirect(`/admin/login`);
  }
});
route.get("/login", (req, res) => {
  if (req.session.isLoggedIn == true) {
    res.redirect(`/admin`);
  } else {
    res.status(200).render("../views/admin/login.ejs");
  }
});

route.post("/auth", async (req, res) => {
  let Email = req.body.Email.trim();
  let queryUpdateTime = `UPDATE users SET lastLoginAt = CONVERT_TZ(NOW(),\'+00:00\',\'+05:30\') WHERE email='${Email}';`;
  if (Email && req.body.Password) {
    try {
      const hash = createHmac("sha256", "zxcvbnmsdasgdrf")
        .update(req.body.Password)
        .digest("hex");
      const query = `SELECT email, password,role FROM users WHERE email = ?`;
      const [rows] = await databaseCon.query(query, [Email]);
      if (rows.length > 0) {
        if (Email === rows[0].email && hash === rows[0].password) {
          req.session.isLoggedIn = true;
          req.session.email_id = Email;
          req.session.role = rows[0].role;
          req.session.cookie.expires = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          );
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
          res.redirect(`/admin`);
          databaseCon.query(queryUpdateTime, [rows[0].email], (err) => {
            if (err) throw new errorHandler(404, err);
          });
        } else {
          return res.status(503).render("../views/unauthorize.ejs");
        }
      } else {
        return res.redirect(`/admin/login`);
      }
    } catch (error) {
      console.error(error);
    }
  }
});

route.get("/logOut", async (req, res) => {
  let queryUpdateTime = `UPDATE users SET lastLogoutAt = CONVERT_TZ(NOW(),\'+00:00\',\'+05:30\') WHERE email='${req.session.email_id}'`;
  databaseCon.query(queryUpdateTime,[], (err) => { if (err) throw new errorHandler(404, err); })  
  req.session.destroy();
  res.redirect(`/admin/login`);
});

module.exports = route;
