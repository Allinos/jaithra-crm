const express = require('express');
const api = express.Router();
const pmNormalAPI = require('../../controllers/api.crud')

//-------normal project employee --------

api.get('/delete-project/:id', pmNormalAPI.DeleteNormalProjectData)
api.get('/employee/:dealId/:catId', pmNormalAPI.getEmployListPerProject)
api.get('/get-employee', pmNormalAPI.getEmployListToaddOrRemove)
api.post('/add-employee-to-project', pmNormalAPI.addEmployeeToProject)
api.delete('/removeempnp', pmNormalAPI.removeEmployeeToProject)








module.exports = api


 