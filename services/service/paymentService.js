// Importing the Payment model from the specified path to interact with payment data in the database
const Payment = require('../model/paymentModel.js');

// Logging the Payment model to the console for debugging purposes
console.log('Payment Model:', Payment);

// Function to create a new payment
// Parameters:
// - data: An object containing payment details (e.g., amount, method, etc.)
const createPayment = async (data) => {
  // Logging the incoming data for debugging
  console.log('Data is :', data);
  
  // Creating a new instance of the Payment model with the provided data
  const payment = new Payment(data);
  
  // Logging the created payment instance for debugging
  console.log('Payment Model*****:', payment);
  
  // Saving the payment instance to the database and returning the result
  return await payment.save();
};

// Logging the Payment model again for debugging purposes
console.log('Payment Model:', Payment);

// Function to retrieve all payments from the database
const getAllPayments = async () => {
  // Fetching and returning all payment records from the database
  return await Payment.find();
};

// Function to retrieve a specific payment by its ID
// Parameters:
// - id: The unique identifier of the payment to be retrieved
const getPaymentById = async (id) => {
  // Finding and returning the payment record that matches the provided ID
  return await Payment.findById(id);
};

// Function to update the status of a payment
// Parameters:
// - id: The unique identifier of the payment to be updated
// - data: An object containing the updated payment status and other details
const updatePaymentStatus = async (id, data) => {
  // Finding the payment by ID and updating it with the new data, returning the updated record
  return await Payment.findByIdAndUpdate(id, data, { new: true });
};

// Exporting the functions for use in other parts of the application
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
}
