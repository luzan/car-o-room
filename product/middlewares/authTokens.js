const crypto = require('crypto');

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
    isLoggedIn: false
}