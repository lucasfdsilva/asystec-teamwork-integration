const express = require('express');

const ProjectController = require('./controllers/ProjectController');

const routes = express.Router();

routes.post('/newproject/:projectId/:customerName/:projectName', ProjectController.newProjectSetup);

module.exports=routes;