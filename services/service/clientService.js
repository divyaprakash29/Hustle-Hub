const ClientProfile = require('../model/clientModel.js')

/**
 * Creates a new client profile.
 * @param {Object} clientProfileData - The data for the new client profile, which should include necessary fields like name, email, etc.
 * @returns {Promise<Object>} - Returns a promise that resolves to the saved client profile object.
 */
const createClientProfile = async (clientProfileData) => {
  const cp = new ClientProfile(clientProfileData);
  return await cp.save();
};

/**
 * Retrieves all client profiles from the database.
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of client profile objects.
 */
const getAllClientProfiles = async () => {
  return await ClientProfile.find();
};

/**
 * Retrieves a client profile by its ID.
 * @param {String} id - The ID of the client profile to retrieve.
 * @returns {Promise<Object|null>} - Returns a promise that resolves to the client profile object if found, or null if not found.
 */
const getClientProfileById = async (id) => {
  return await ClientProfile.findById(id);
};

/**
 * Updates an existing client profile.
 * @param {String} id - The ID of the client profile to update.
 * @param {Object} data - The data to update the client profile with, which can include fields like name, email, etc.
 * @returns {Promise<Object|null>} - Returns a promise that resolves to the updated client profile object, or null if not found.
 */
const updateClientProfile = async (id, data) => {
  return await ClientProfile.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Deletes a client profile by its ID.
 * @param {String} id - The ID of the client profile to delete.
 * @returns {Promise<Object|null>} - Returns a promise that resolves to the deleted client profile object, or null if not found.
 */
const deleteClientProfile = async (id) => {
  return await ClientProfile.findByIdAndDelete(id);
};

module.exports = { 
    createClientProfile,
    getAllClientProfiles,
    getClientProfileById,
    updateClientProfile,
    deleteClientProfile
  }
  