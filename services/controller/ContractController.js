const contractService = require("../service/ContractService");

const createContract = async (req, res) => {
    try {
        const contractData = req.body;
        const newContract = await contractService.createContract(contractData);
        res.status(201).json(newContract);
    } catch (err) {
        res.status(400).json({ error: "Invalid data", message: err.message });
    }
};

const getAllContracts = async (req, res) => {
    try {
        const contracts = await contractService.getAllContracts();
        res.status(200).json(contracts);
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
};

const getContractById = async (req, res) => {
    try {
        const { contractId } = req.params;
        const contract = await contractService.getContractById(contractId);
        if (!contract) {
            return res
                .status(404)
                .json({ error: "Contract not found", message: "The specified contract ID does not exist." });
        }
        res.status(200).json(contract);
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
};

const updateContractStatus = async (req, res) => {
    try {
        const { contractId } = req.params;
        const { status } = req.body;
        if (!["completed", "canceled"].includes(status)) {
            return res.status(400).json({ error: "Invalid status", message: "Status must be 'completed' or 'canceled'." });
        }
        const updatedContract = await contractService.updateContractStatus(contractId, status);
        if (!updatedContract) {
            return res
                .status(404)
                .json({ error: "Contract not found", message: "The specified contract ID does not exist." });
        }
        res.status(200).json(updatedContract);
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
};

const deleteContract = async (req, res) => {
    try {
        const { contractId } = req.params;
        const deletedContract = await contractService.deleteContract(contractId);
        if (!deletedContract) {
            return res
                .status(404)
                .json({ error: "Contract not found", message: "The specified contract ID does not exist." });
        }
        res.status(200).json({ message: `Contract with ID ${contractId} has been successfully deleted.` });
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
};

module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContractStatus,
    deleteContract,
};
