const Car = require('../models/carSchema');
const Inquiry = require('../models/inquirySchema');
const moment = require('moment');
const { isLoggedIn } = require('../middlewares/authTokens');
const getInquiries = async (req, res) => {
    const inquiries = await Inquiry.find().populate("forCar");

    res.render('inquiry/list', {inquiries, moment: moment, isLoggedIn: isLoggedIn()});
}

const postInquiry = async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        phone,
        subject,
        comments,
        hasTradeIn,
        carId
    } = req.body;
    let forCar = await Car.findById(carId);
    const inquiry = new Inquiry({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        subject: subject,
        comments: comments,
        hasTradeIn: hasTradeIn === "on" ? true: false,
        forCar: forCar
    })
    await inquiry.save();
    res.json({message: "Inquiry registered"})
}

module.exports = {
    getInquiries,
    postInquiry
}