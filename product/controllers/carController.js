
const Car = require('../models/carSchema');
const Make = require('../models/makeSchema');
const multer  = require('multer')
const fs = require('fs');
const path = require('path');
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

const filterCars = async (req, res) => {
    let { status, price, make, model, distance, order } = req.query;
    let query = {};
    let cars = {};

    if (status != null) status != 'newandused' ? query.status = status : null;
    if (price != null) price != 'all' ? (parseInt(price) > 50000) ? query.price = { $gt: parseInt(price) } : query.price = { $lt: parseInt(price) } : null;
    if (make != null) make != 'all' ? query.make = make : null;
    if (model != null) model != 'all' ? query.model = model : null;
    if (distance != null) distance != 'all' ? (parseInt(distance) > 100000) ? query.distance = { $gt: parseInt(distance) } : query.distance = { $lt: parseInt(distance) } : null;
    if (order != null) order == 'asc' ? cars = await Car.find(query).sort({ price: 1 }) : cars = await Car.find(query).sort({ price: -1 });
        else cars = await Car.find(query);

    let html = getArticleHTML(cars);

    res.send({ html })
}

function getArticleHTML(cars) {
    console.log(cars);
    let html = '';
    for (let car of cars) {
        console.log('loop');
        html += `<article>
        <div
            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
                <strong
                    class="d-inline-block mb-2 ${car.status === 'Used' ? 'text-primary' : 'text-success'}">
                    ${car.status}
                </strong>
                <h4 class="fw-bold mb-0">
                ${car.title}
                </h4>
                <h6 class="fw-bold mb-0">
                    ${car.make} - ${car.model}
                </h6>
                <div class="mb-3 text-muted">
                ${car.distance} mi. <i class="fa-solid fa-location-dot"></i> ${car.zipCode}
                </div>
                <h3 class="mb-2">$ ${car.price}</h3>
                <p class="card-text mb-auto">
                ${car.sellersNote}
                </p>
                <form class=" my-2 my-lg-0" method="post"
                    action="/cars/${car._id}?_method=DELETE">
                    <a href="/cars/${car._id}/edit" class="btn btn-outline-primary">Edit</a>
                    &nbsp;
                    <button class="btn btn-outline-danger" type="submit">Delete</button>
                </form>
            </div>

            <div class="col-auto d-none d-lg-block">
                <img src="${car.imageUrl != null ? car.imageUrl : '/img/thumbnail.jpg'}" class=""
                    alt="" width="400" height="400">
            </div>
        </div>
    </article>`
    }
    return html;
}

const getCars = async (req, res) => {
    const cars = await Car.find();
    const makes = await Make.find({});

    res.render('cars/index', { cars, makes })
}

const getCarById = async(req, res) => {
    const { id } = req.params;
    const car = await Car.findById(id);
    const makes = await Make.find({});
    res.render('cars/single', {car, makes})
}

const newCarForm = async (req, res) => {
    const makes = await Make.find({});
    
    res.render('cars/new', { makes });
}

const postNewCar = async (req, res) => {
    
    const { title, status, year, distance, price, zipCode, make, model, bodyStyle, sellersNote } = req.body;
    let imageUrl = '';
    if(req.file.originalname) {
        imageUrl = '/uploads/' + req.file.filename;
    }
    const car = new Car({
        title: title,
        status: status,
        year: parseInt(year),
        make: make,
        distance: parseInt(distance),
        model: model,
        price: parseInt(price),
        zipCode: parseInt(zipCode),
        bodyStyle: bodyStyle,
        sellersNote: sellersNote,
        imageUrl: imageUrl
    })
    await car.save();
    res.redirect('/cars')
}

const editCarForm = async (req, res) => {
    const { id } = req.params;
    const makes = await Make.find({});
    const car = await Car.findById(id);
    console.log(car);
    res.render('cars/edit', { car, makes })
}

const editCarRequest = async (req, res) => {
    const { id } = req.params;
    const { title, status, year, distance, price, zipCode, make, model, bodyStyle, sellersNote } = req.body;
    const car = await Car.findByIdAndUpdate(id, {
        title: title,
        status: status,
        year: parseInt(year),
        make: make,
        distance: distance,
        model: model,
        price: parseInt(price),
        zipCode: parseInt(zipCode),
        bodyStyle: bodyStyle,
        sellersNote: sellersNote
    })
    res.redirect('/cars');
}

const deleteCar = async (req, res) => {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    await unlinkAsync(path.join(__dirname, '..', 'public',deletedCar.imageUrl));
    res.redirect('/cars');
}


module.exports = {
    getCars,
    getCarById,
    filterCars,
    newCarForm,
    postNewCar,
    editCarForm,
    editCarRequest,
    deleteCar
};