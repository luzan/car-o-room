const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
    comments: {
        type: String,
    },
    hasTradeIn: {
        type: Boolean,
        default: false
    },
    forCar: {type: mongoose.Schema.Types.ObjectId, ref: 'Car'}, 
}, {timestamps: true})


const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;