const express = require("express");
const contractController = require("../controller/ContractController");

const router = express.Router();

router.post("/contracts", contractController.createContract); // Create a new contract
router.get("/contracts", contractController.getAllContracts); // Get all contracts
router.get("/contracts/:contractId", contractController.getContractById); // Get contract by ID
router.put("/contracts/:contractId", contractController.updateContractStatus); // Update contract status
router.delete("/contracts/:contractId", contractController.deleteContract); // Delete contract

module.exports = router;
