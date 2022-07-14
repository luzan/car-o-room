const mongoose = require('mongoose');

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    models: [{
        type: String
    }]
})


const Make = mongoose.model('Make', makeSchema);

module.exports = Make;