const Project = require("../model/ProjectModel.js");

// Service to get all projects
const getAllProjects = async () => {
  return await Project.find();
};

// Service to create a new project
const createProject = async (projectData) => {
  const project = new Project(projectData);
  return await project.save();
};

// Service to get project details by ID
const getProjectById = async (projectId) => {
  return await Project.findById(projectId);
};

const getProjectByClientId = async (clientId) => {
  return await Project.find({ clientId });
};

// Service to update project budget
const updateProjectDetail = async (projectId, project) => {
  // Validate and sanitize data
  if (typeof project.budget !== 'Number') {
    project.budget = Number(project.budget);
  }

  // Ensure project.budget is valid
  if (isNaN(project.budget)) {
    throw new Error('Invalid budget value');
  }

  // Update the project
  return await Project.findByIdAndUpdate(
    projectId,
    project,
    { new: true, runValidators: true }
  );
};


// Service to delete a project
const deleteProject = async (projectId, reason) => {
  return await Project.findByIdAndDelete(projectId, { deletedAt: Date.now(), reason }, { new: true });
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  getProjectByClientId,
  updateProjectDetail,
  deleteProject
};
