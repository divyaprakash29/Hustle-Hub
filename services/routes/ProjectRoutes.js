const express = require("express");
const projectController = require('../controller/ProjectController.js');
const router = express.Router();

router.get('/projects', projectController.getAllProjects);
router.post('/projects', projectController.createProject);
router.get('/projects/:projectId', projectController.getProjectById);
router.get('/projects/client/:clientId', projectController.getProjectByClientId);
router.put('/projects/:projectId', projectController.updateProjectDetail);
router.delete('/projects/:projectId', projectController.deleteProject);

module.exports = router;
