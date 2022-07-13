//Import the mongoose module
const mongoose = require('mongoose');
// import model
const Car = require('../models/carSchema')
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/cars';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MongoDB Connected!");
})
.catch((err) => {
    console.log("MongoDB Connection Error!!");
    console.log(err);
});

const carsSeed = [
    {
        title: 'Used 2021 Tesla Model Y Long Range',
        status: 'Used',
        year: 2021,
        make: 'Tesla',
        distance: 13954,
        model: 'Model Y',
        price: 71995,
        zipCode: '52557',
        bodyStyle: 'Sedan',
        imageUrl: 'https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1634205604/autoexpress/2021/10/Tesla%20Model%20Y%202021-4.jpg',
        sellersNote: 'Great dependable vehicle with all the wanted accessories! Leather interior with heated front seats, power driver and passenger seats, dual moonroof, premium sound system, back-up camera, luggage rack, power lift gate and so much more.'
    },
    {
        title: 'Used 2020 Audi All road',
        status: 'Used',
        year: 2020,
        make: 'Audi',
        distance: 12397,
        model: 'All road',
        price: 23899,
        zipCode: '52557',
        bodyStyle: 'SUV',
        imageUrl: 'https://www.quattrodaily.com/wp-content/uploads/2020/07/C5-Audi-Allroad-1-1360x1008.jpg',
        sellersNote: 'Great dependable vehicle with all the wanted accessories! Leather interior with heated front seats, power driver and passenger seats, dual moonroof, premium sound system, back-up camera, luggage rack, power lift gate and so much more.'
    },
    {
        title: 'Used 2020 BMW Z4 M Base (A8)',
        status: 'Used',
        year: 2020,
        make: 'BMW',
        distance: 11663,
        model: 'Z4 M',
        price: 67832,
        zipCode: '52557',
        bodyStyle: 'Coupe',
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2020-bmw-z4-m40i-105-1568895913.jpg?crop=0.606xw:0.683xh;0.170xw,0.252xh&resize=640:*',
        sellersNote: 'Great dependable vehicle with all the wanted accessories! Leather interior with heated front seats, power driver and passenger seats, dual moonroof, premium sound system, back-up camera, luggage rack, power lift gate and so much more.'
    },
    {
        title: '2022 Audi e-tron Premium Plus',
        status: 'New',
        year: 2022,
        make: 'Audi',
        distance: 1,
        model: 'E-tron',
        price: 80630,
        zipCode: '52557',
        bodyStyle: 'SUV',
        imageUrl: 'https://www.autotrader.com/wp-content/uploads/2021/05/2021-audi-e-tron-premium-front-left-side-e1639075042759.jpg',
        sellersNote: 'Great dependable vehicle with all the wanted accessories! Leather interior with heated front seats, power driver and passenger seats, dual moonroof, premium sound system, back-up camera, luggage rack, power lift gate and so much more.'
    },

]

Car.insertMany(carsSeed)
.then((res) => console.log(res))
.catch((err) => console.log(err));