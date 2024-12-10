const express = require('express');
const api = express.Router();
const NormalAPI = require('../../controllers/api.crud')



api.get('/get-image/:id', NormalAPI.GetImagesByID)

api.post('/clients', NormalAPI.AddClient)
api.put('/clients/update/:id', NormalAPI.UpdateClientsByID)
api.delete('/clients/delete/:id', NormalAPI.DeleteClientsByID)

api.post('/owners', NormalAPI.AddOwner)
api.put('/owners/update/:id', NormalAPI.UpdateOwnersByID)
api.delete('/owners/delete/:id', NormalAPI.DeleteOwnersByID)

// api.get('/get-employee', NormalAPI.getEmployListToaddOrRemove)
// api.post('/add-employee-to-project', NormalAPI.addEmployeeToProject)
// api.delete('/removeempnp', NormalAPI.removeEmployeeToProject)








module.exports = api


 