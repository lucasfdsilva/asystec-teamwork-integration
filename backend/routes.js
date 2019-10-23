const express = require('express');

const ProjectController = require('./controllers/ProjectController');

const routes = express.Router();

routes.get('/newproject/:projectId/:customerName/:projectName', ProjectController.createNewProject);

module.exports=routes;