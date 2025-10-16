const { createHmac } = require("crypto");
const databaseCon = require("../config/db.config");
const { errorHandler } = require("../utils/errorHandler");

const hashPassword = (password) => {
  return createHmac("sha256", "zxcvbnmsdasgdrf").update(password).digest("hex");
};

exports.renderLoginPage = (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/admin");
  }
  res.status(200).render("../views/admin/login.ejs");
};

exports.authenticate = async (req, res) => {
  const Email = req.body.Email.trim();
  const Password = req.body.Password;
  const queryUpdateTime = `UPDATE users SET lastLoginAt = CONVERT_TZ(NOW(),'+00:00','+05:30') WHERE email=?`;

  if (!Email || !Password) {
    return res.redirect("/admin/login");
  }

  try {
    const hash = hashPassword(Password);
    const [rows] = await databaseCon.query(
      "SELECT email, password, role FROM users WHERE email = ?",
      [Email]
    );

    if (
      rows.length > 0 &&
      Email === rows[0].email &&
      hash === rows[0].password
    ) {
      req.session.isLoggedIn = true;
      req.session.email_id = Email;
      req.session.role = rows[0].role;
      req.session.cookie.expires = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      );
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;

      res.redirect("/admin");

      databaseCon.query(queryUpdateTime, [Email], (err) => {
        if (err) throw new errorHandler(404, err);
      });
    } else {
      return res.status(503).render("../views/unauthorize.ejs");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.logout = (req, res) => {
  const queryUpdateTime = `UPDATE users SET lastLogoutAt = CONVERT_TZ(NOW(),'+00:00','+05:30') WHERE email=?`;

  databaseCon.query(queryUpdateTime, [req.session.email_id], (err) => {
    if (err) throw new errorHandler(404, err);
  });

  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
};
