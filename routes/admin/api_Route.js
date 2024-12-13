const express = require('express');
const api = express.Router();
const NormalAPI = require('../../controllers/api.crud')



api.get('/get-image/:id', NormalAPI.GetImagesByID)
api.get('/prop/delete/:id', NormalAPI.PropertieDelete)
api.post('/prop/update/:id', NormalAPI.PropertieUpdate)

api.post('/clients', NormalAPI.AddClient)
api.post('/clients/update/:id', NormalAPI.UpdateClientsByID)
api.delete('/clients/delete/:id', NormalAPI.DeleteClientsByID)

api.post('/owners', NormalAPI.AddOwner)
api.post('/owners/update/:id', NormalAPI.UpdateOwnersByID)
api.delete('/owners/delete/:id', NormalAPI.DeleteOwnersByID)










module.exports = api


 