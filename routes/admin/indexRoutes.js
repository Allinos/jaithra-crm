const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/_index.controller')

// ----index pages-----

router.get('/dashboard', mainController.indexDeshboard)
router.get('/form', mainController.PropertiesForm)
router.post('/form', mainController.insertProp );
router.get('/clients', mainController.clientsPage)
router.get('/owners', mainController.ownersPage)



// router.get('/user-manager', mainController.userManager)
// router.get('/settings', mainController.settings)
// router.get('/finance/expenses', mainController.expense )



module.exports = router;