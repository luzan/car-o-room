const crypto = require('crypto');
let isLoggedIn = false;
module.exports = {
    authTokens: {},
    generateAuthToken: () => {
        return crypto.randomBytes(30).toString('hex');
    },
    requireAuth : (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    },
    isLoggedIn: () => {
        return isLoggedIn;
    },
    changeLoggedInTrue: () =>{
        isLoggedIn= true;
    },
    changeLoggedInFalse: () =>{
        isLoggedIn= false;
    }
}