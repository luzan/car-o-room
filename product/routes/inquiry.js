const express = require('express');
const {  
    getInquiries,
    postInquiry,
    } = require('../controllers/inquiryController');
const router = express.Router();
const { authTokens, requireAuth } = require('../middlewares/authTokens')


router.get('/', getInquiries);
router.post('/', postInquiry);

module.exports = router;