// PaymentController.js
const Service = require('../service/paymentService.js');

// Create Payment
// This function handles the creation of a new payment.
const createPayment = async (req, res) => {
  try {
    // Extract payment data from the request body
    // Call the service to create a payment with the provided data
    const payment = await Service.createPayment(req.body);
    // Respond with the created payment and a 201 status code indicating success
    res.status(201).json(payment);
  } catch (error) {
    // If an error occurs, respond with a 400 status code and the error message
    res.status(400).json({ error: error.message });
  }
};

// Get All Payments
// This function retrieves all payments from the database.
const getAllPayments = async (req, res) => {
  try {
    // Call the service to get all payments
    const payments = await Service.getAllPayments();
    // Respond with the list of payments and a 200 status code indicating success
    res.status(200).json(payments);
  } catch (error) {
    // If an error occurs, respond with a 500 status code indicating a server error
    res.status(500).json({ error: error.message });
  }
};

// Get Payment by ID
// This function retrieves a specific payment by its ID.
const getPaymentById = async (req, res) => {
  try {
    // Extract the payment ID from the request parameters
    const payment = await Service.getPaymentById(req.params._id);

    // Check if the payment was found
    if (!payment) {
      // If not found, respond with a 404 status code and an error message
      return res.status(404).json({ error: 'Payment not found' });
    }
    // Respond with the found payment and a 200 status code indicating success
    res.status(200).json(payment);
  } catch (error) {
    // If an error occurs, respond with a 400 status code and the error message
    res.status(400).json({ error: error.message });
  }
};

// Update Payment Status
// This function updates the status of a specific payment.
const updatePaymentStatus = async (req, res) => {
  try {
    // Extract the payment ID from the request parameters and the new status from the request body
    const payment = await Service.updatePaymentStatus(req.params._id, req.body);

    // Check if the payment was found
    if (!payment) {
      // If not found, respond with a 404 status code and an error message
      return res.status(404).json({ error: 'Payment not found' });
    }
    // Respond with the updated payment and a 200 status code indicating success
    res.status(200).json(payment);
  } catch (error) {
    // If an error occurs, respond with a 400 status code and the error message
    res.status(400).json({ error: error.message });
  }
};

// Export the functions to be used in other parts of the application
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
}
