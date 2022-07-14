//Import the mongoose module
const mongoose = require('mongoose');
// import model
const Make = require('../models/makeSchema')
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/cars';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error!!");
        console.log(err);
    });

const makeSeed = [
    {
        name: 'Tesla',
        models: [
            'Model S',
            'Model X',
            'Model Y',
            'Roadster'
        ]
    },
    {
        name: 'Audi',
        models: [
            'TT-RS',
            'TTS',
            'All road',
            'E-tron',
            'E-tron GT'
        ]
    },

    {
        name: 'BMW',
        models: [
            'Z4 M',
            'I4 Gran Coupe',
            'I8',
            'IX'
        ]
    },

    {
        name: 'Honda',
        models: [
            'Accord',
            'Accord Hybrid',
            'Civic',
            'HR-V'
        ]
    }
];

Make.insertMany(makeSeed)
.then((res) => console.log(res))
.catch((err) => console.log(err));