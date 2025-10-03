const express = require('express');
const router = express.Router();

// Importing controllers
const PaymentController = require('../controller/paymentController.js');

// Routes for Payment
router.post('/payments', PaymentController.createPayment);
router.get('/payments', PaymentController.getAllPayments);
router.get('/payments/:_id', PaymentController.getPaymentById);
router.put('/payments/:_id', PaymentController.updatePaymentStatus);

module.exports = router;