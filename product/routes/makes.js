const express = require('express');
const {  
    getMakes,
    newMake,
    postMake,
    getOneMake,
    editMakeForm,
    editMakeRequest,
    deleteMake,
    makesData } = require('../controllers/makeController');
const router = express.Router();
const { authTokens, requireAuth } = require('../middlewares/authTokens')


router.get('/', requireAuth, getMakes);
router.get('/data', requireAuth, makesData);
router.get('/new', requireAuth, newMake);
router.post('/', requireAuth, postMake);
router.get('/:id', requireAuth, getOneMake);
router.get('/:id/edit', requireAuth, editMakeForm);
router.put('/:id', requireAuth, editMakeRequest);
router.delete('/:id', requireAuth, deleteMake)

module.exports = router;