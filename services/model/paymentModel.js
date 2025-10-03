/* This file defines three Mongoose schemas for a payment system, reviews, and client profiles, 
and creates corresponding models for each schema to interact with MongoDB. */

//Defining a Schema
const moment = require('moment');
const mongoose = require('mongoose');

//Defining of data
// Payment Schema
const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], required: true },
  paidAt: { type: String, default:moment(new Date()).format("MM-DD-YYYY,hh:mm A")}
});
   
//Export the Model. Every Model created here will create a collection in MongoDB server
module.exports = mongoose.model('Payment', PaymentSchema);

