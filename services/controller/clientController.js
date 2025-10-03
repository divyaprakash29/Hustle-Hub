const Service = require('../service/reviewService.js');

// Create ClientProfile
// This function handles the creation of a new client profile
const createClientProfile = async (req, res) => {
  try {
    // Calls the service to create a client profile with the data from the request body
    const cp = await Service.createClientProfile(req.body);
    // Responds with a 201 status and the created client profile
    res.status(201).json(cp);
  } catch (error) {
    // If an error occurs, responds with a 400 status and the error message
    res.status(400).json({ error: error.message });
  }
};

// Get All ClientProfiles
// This function retrieves all client profiles
const getAllClientProfiles = async (req, res) => {
  try {
    // Calls the service to get all client profiles
    const cps = await Service.getAllClientProfiles();
    // Responds with a 200 status and the list of client profiles
    res.status(200).json(cps);
  } catch (error) {
    // If an error occurs, responds with a 500 status and the error message
    res.status(500).json({ error: error.message });
  }
};

// Get Client by ID
// This function retrieves a specific client profile by its ID
const getClientProfileById = async (req, res) => {
  try {
    // Calls the service to get a client profile by ID from the request parameters
    const cp = await Service.getClientProfileById(req.params.profileId);
    // If no client profile is found, responds with a 404 status and an error message
    if (!cp) return res.status(404).json({ error: 'Client Profile not found' });
    // Responds with a 200 status and the found client profile
    res.status(200).json(cp);
  } catch (error) {
    // If an error occurs, responds with a 400 status and the error message
    res.status(400).json({ error: error.message });
  }
};

// Update Client Profile
// This function updates an existing client profile
const updateClientProfile = async (req, res) => {
  try {
    // Calls the service to update the client profile with the given ID and new data
    const cp = await Service.updateClientProfile(req.params.profileId, req.body);
    // If no client profile is found, responds with a 404 status and an error message
    if (!cp) return res.status(404).json({ error: 'Client Profile not found' });
    // Responds with a 200 status and the updated client profile
    res.status(200).json(cp);
  } catch (error) {
    // If an error occurs, responds with a 400 status and the error message
    res.status(400).json({ error: error.message });
  }
};

// Delete ClientProfile
// This function deletes a client profile by its ID
const deleteClientProfile = async (req, res) => {
  try {
    // Calls the service to delete the client profile with the given ID
    const cp = await Service.deleteClientProfile(req.params.profileId);
    // If no client profile is found, responds with a 404 status and an error message
    if (!cp) return res.status(404).json({ error: 'Client Profile not found' });
    // Responds with a 200 status and a success message
    res.status(200).json("Client Profile deleted");
  } catch (error) {
    // If an error occurs, responds with a 400 status and the error message
    res.status(400).json({ error: error.message });
  }
};

// Exporting the functions to be used in other parts of the application
module.exports = {
  createClientProfile,
  getAllClientProfiles,
  getClientProfileById,
  updateClientProfile,
  deleteClientProfile
}
