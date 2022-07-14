const Make = require('../models/makeSchema');
const { isLoggedIn } = require('../middlewares/authTokens')
const getMakes = async (req, res) => {
    const makes = await Make.find({});
    res.render('makes/index', { makes});
}

const newMake = (req, res) => {
    res.render('makes/new',{isLoggedIn:isLoggedIn()});
}

const postMake = async (req, res) => {
    console.log(req.body);
    const { name, model1, model2, model3, model4 } = req.body;
    const make = new Make({
        name: name,
        models: [model1, model2, model3, model4]
    });
    await make.save();
    res.redirect('/makes');
}

const getOneMake = async (req, res) => {
    const { id } = req.params;
    const make = await Make.findById(id);
    res.render('makes/show', { make })
}

const editMakeForm = async (req, res) => {
    const { id } = req.params;
    const make = await Make.findById(id);
    res.render('makes/edit', { make })
}

const editMakeRequest = async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { name, model1, model2, model3, model4 } = req.body;
    const make = await Make.findByIdAndUpdate(id, {
        name: name,
        models: [model1, model2, model3, model4]
    }, { runValidators: true, new: true });
    res.redirect(`/makes/${make._id}`)
}

const deleteMake = async (req, res) => {
    const { id } = req.params;
    await Make.findByIdAndDelete(id);
    res.redirect('/makes');
}

const makesData = async (req, res) => {
    const makes = await Make.find({});
    res.send(makes);
}

module.exports = {
    getMakes,
    newMake,
    postMake,
    getOneMake,
    editMakeForm,
    editMakeRequest,
    deleteMake,
    makesData
}