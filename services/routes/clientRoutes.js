const express = require('express');
const router = express.Router();

// Importing controllers
const ClientController = require('../controller/clientController.js');

// Routes for Client Profile
router.post(' /client-profiles', ClientController.createClientProfile);
router.get('/client-profiles', ClientController.getAllClientProfiles);
router.get('/client-profiles/:profileId', ClientController.getClientProfileById);
router.put('/client-profiles/:profileId', ClientController.updateClientProfile);
router.delete('/client-profiles/:profileId', ClientController.deleteClientProfile);

module.exports = router;