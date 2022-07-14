//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['New', 'Used']
    },
    year: {
        type: Number,
        enum: [2016, 2017, 2018, 2019, 2020, 2021, 2022],
        default: 2019
    },
    make: {
        type: String,
        required: true
    },
    distance: { type: Number, default: 1 },
    model: {
        type: String,
        required: true
    },
    price: Number,
    zipCode: Number,
    imageUrl: { type: String, default: null },
    bodyStyle: String,
    sellersNote: String
});

// Compile model from schema
const Car = mongoose.model('Car', CarSchema);

module.exports = Car;