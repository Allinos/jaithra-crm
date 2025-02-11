const express = require("express");
const api = express.Router();
const NormalAPI = require("../../controllers/api.crud");

api.get("/get-image/:id", NormalAPI.GetImagesByID);
api.get("/prop/delete/:id", NormalAPI.PropertieDelete);
api.post("/prop/update/:id", NormalAPI.PropertieUpdate);

api.post("/clients", NormalAPI.AddClient);
api.post("/clients/update/:id", NormalAPI.UpdateClientsByID);
api.delete("/clients/delete/:id", NormalAPI.DeleteClientsByID);
api.put("/clients/update/status/:id", NormalAPI.StatusOfClientsByID);
api.put("/clients/update/date/:id", NormalAPI.DateofClientsByID);

api.post("/owners", NormalAPI.AddOwner);
api.post("/owners/update/:id", NormalAPI.UpdateOwnersByID);
api.delete("/owners/delete/:id", NormalAPI.DeleteOwnersByID);

api.post('/user-manager/add', NormalAPI.addUser);
api.get('/user-manager/get/:id', NormalAPI.getOneUser);
api.put('/user-manager/update/:id', NormalAPI.updateUser);
api.put('/user-manager/update/pwd/:id', NormalAPI.changePwdUser);
api.delete('/user-manager/delete/:id', NormalAPI.deleteUser);

module.exports = api;
