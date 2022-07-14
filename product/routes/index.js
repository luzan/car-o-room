const express = require('express');
const { loginIndex, loginUser, registerIndex, registerPost, logout } = require('../controllers/loginController');
const router = express.Router();
const { authTokens, generateAuthToken, changeLoggedInTrue } = require('../middlewares/authTokens')


router.get('/', loginIndex);
router.post('/', (req, res)=> {
    const { username, password, remember } = req.body;
    loginUser(username, password, (resp) => {
        if (resp.success === true) {
            const minute = process.env.MAXSESSION * 60 * 1000;
            const authToken = generateAuthToken();
            authTokens[authToken] = username;
            changeLoggedInTrue();
            remember? res.cookie('AuthToken', authToken, { maxAge: minute }) : res.cookie('AuthToken', authToken);
            res.redirect('/cars');
        } else {
            res.render('index', {hide : true});
        }
    })
});
router.get('/register', registerIndex);
router.post('/register', registerPost);
router.get('/logout', logout);

module.exports = router;