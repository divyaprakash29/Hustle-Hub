// Review Schema
//Defining a Schema
const moment = require('moment');
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comments: {
      type: String,
      required: true,
      trim: true 
    },
    freelancerId: {
      type: String,
      required: false,
    },
    clientId: {
      type: String,
      required: false,
    },
    postedAt: {
      type: String, 
      default:moment(new Date()).format("MM-DD-YYYY,hh:mm A")
    }
   } ); 

   module.exports = mongoose.model('Review', ReviewSchema);