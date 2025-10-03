const Contract = require("../model/Contract");

const createContract = async (contractData) => {
    const contract = new Contract(contractData);
    return await contract.save();
};

const getAllContracts = async () => {
    return await Contract.find();
};

const getContractById = async (contractId) => {
    return await Contract.findOne({ contractId });
};

const updateContractStatus = async (contractId, status) => {
    return await Contract.findOneAndUpdate({ contractId }, { status }, { new: true });
};

const deleteContract = async (contractId) => {
    return await Contract.findOneAndDelete({ contractId });
};

module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContractStatus,
    deleteContract,
};
