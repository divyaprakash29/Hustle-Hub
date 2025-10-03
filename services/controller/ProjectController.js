const projectService = require("../service/ProjectService.js");
const mongoose = require('mongoose');
// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
};

// Get project details by ID
const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project details', error: err.message });
  }
};

// Get projects by clientId
const getProjectByClientId = async (req, res) => {
  try {
    const { clientId } = req.params; // Get clientId from the URL parameter

    // Validate if clientId is provided
    if (!clientId) {
      return res.status(400).json({ message: 'clientId is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ message: 'Invalid clientId format' });
    }
    console.log('clientId:', req.params.clientId);

    // Call the service function to get projects by clientId
    const projects = await projectService.getProjectByClientId(clientId);

    // Check if projects exist for the given clientId
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for the specified clientId' });
    }

    // Send the retrieved projects as response
    res.status(200).json(projects);

  } catch (err) {
    // Handle errors
    console.error('Error fetching projects by clientId:', err);
    res.status(500).json({ message: 'Error fetching projects by clientId', error: err.message });
  }
};

// Update project budget
const updateProjectDetail = async (req, res) => {
  try {
    const project = await projectService.updateProjectDetail(req.params.projectId, req.body);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project budget', error: err.message });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.projectId, req.body.reason);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  getProjectByClientId,
  updateProjectDetail,
  deleteProject,
};
