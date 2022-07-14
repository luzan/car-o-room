const express = require('express');
const {  
    getCars,
    getCarById,
    filterCars,
    newCarForm,
    postNewCar,
    editCarForm,
    editCarRequest,
    deleteCar } = require('../controllers/carController');
const router = express.Router();
const { authTokens, requireAuth } = require('../middlewares/authTokens')
const path = require('path');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..','public', 'uploads/'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extension = file.originalname.split('.')[1];
      cb(null, file.fieldname + '-' + uniqueSuffix+ '.' + extension)
    }
  })
  
const upload = multer({ storage: storage })

router.get('/', getCars);
router.get('/:id', getCarById);
router.get('/filter', filterCars);
router.get('/new', requireAuth, newCarForm);
router.post('/', requireAuth, upload.single('image'), postNewCar);
router.get('/:id/edit', requireAuth, editCarForm);
router.put('/:id', requireAuth, editCarRequest);
router.delete('/:id', requireAuth, deleteCar)

module.exports = router;