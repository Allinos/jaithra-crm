const express = require("express");
const api = express.Router();
const NormalAPI = require("../../controllers/api.crud");

api.get("/invoice/delete/:id", NormalAPI.InvoiceDelete);
api.post("/invoice/update/:id", NormalAPI.InvoiceUpdate);
api.put("/invoice/update_status/:id", NormalAPI.UpdatePaymentInvoiceStatus);


api.post("/clients", NormalAPI.AddClient);
api.post("/clients/update/:id", NormalAPI.UpdateClientsByID);
api.delete("/clients/delete/:id", NormalAPI.DeleteClientsByID);
api.put("/clients/update/status/:id", NormalAPI.StatusOfClientsByID);
api.put("/clients/update/date/:id", NormalAPI.DateofClientsByID);

api.post('/client/payments', NormalAPI.AddClientPayment);
api.get('/client/payments', NormalAPI.GetAllClientPayments);
api.get('/client/payments/:id', NormalAPI.GetClientPaymentById);
api.put('/client/payments/:id', NormalAPI.UpdateClientPayment);
api.delete('/client/payments/:id', NormalAPI.DeleteClientPayment);

api.post("/leads", NormalAPI.AddLead);
api.post("/leads/update/:id", NormalAPI.UpdateLeadsByID);
api.delete("/leads/delete/:id", NormalAPI.DeleteLeadsByID);
api.put("/leads/update/status/:id", NormalAPI.StatusOfLeadsByID);
api.put("/leads/update/date/:id", NormalAPI.DateofLeadsByID);

api.post('/user-manager/add', NormalAPI.addUser);
api.get('/user-manager/get/:id', NormalAPI.getOneUser);
api.put('/user-manager/update/:id', NormalAPI.updateUser);
api.put('/user-manager/update/pwd/:id', NormalAPI.changePwdUser);
api.delete('/user-manager/delete/:id', NormalAPI.deleteUser);

module.exports = api;
