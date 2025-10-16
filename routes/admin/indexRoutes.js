const express = require("express");
const router = express.Router();
const mainController = require("../../controllers/_index.controller");

// ----index pages-----

router.get("/dashboard", mainController.indexDeshboard);
router.get("/invoice", mainController.invoice);
router.get("/form", mainController.invoice_Add_Form);
router.post("/form", mainController.insertInvoice);
router.get("/clients", mainController.clientsPage);
router.get("/leads", mainController.leadsPage);
router.get("/user-manager", mainController.userPage);


// router.get("/queries", mainController.ownersPage);


module.exports = router;
