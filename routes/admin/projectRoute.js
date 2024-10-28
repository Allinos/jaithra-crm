const express = require('express');
const api = express.Router();
const pmNormalAPI = require('../../controllers/pm.normal.crud')

//-------normal project employee --------

api.get('/delete-project/:id', pmNormalAPI.DeleteNormalProjectData)
api.get('/employee/:dealId/:catId', pmNormalAPI.getEmployListPerProject)
api.get('/get-employee', pmNormalAPI.getEmployListToaddOrRemove)
api.post('/add-employee-to-project', pmNormalAPI.addEmployeeToProject)
api.delete('/removeempnp', pmNormalAPI.removeEmployeeToProject)

//-------normal project subtask --------
api.post('/addsubtaskto-nproject', pmNormalAPI.addNewSubTaskToProject)
api.put('/update-subtask-status', pmNormalAPI.updateSubtaskStatus)
api.delete('/delete-subtask', pmNormalAPI.deleteSubtask)

//-------normal project task --------
// api.post('/addtaskto-nproject', pmNormalAPI.addNewSubTaskToProject)
api.put('/update-task-status', pmNormalAPI.updatetaskStatus)
api.put('/update-task-deadline', pmNormalAPI.updatetaskDeadline)
api.delete('/delete-task', pmNormalAPI.deleteTask)
api.get('/ngetProjectStatus', pmNormalAPI.getProjectsStaus)
api.get('/nIsProjectPaid', pmNormalAPI.getCheckCompletedUnpaid)







module.exports = api