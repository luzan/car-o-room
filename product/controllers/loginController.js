const UserModel = require("../models/userSchema")
const { authTokens, generateAuthToken, isLoggedIn,changeLoggedInFalse } = require('../middlewares/authTokens')

const loginIndex = (req, res) => {
    res.render('index', {hide : true,isLoggedIn:isLoggedIn()});
}

const registerIndex = (req, res) => {
    res.render('register', {hide : true});
}

const registerPost = async (req, res) => {
    const { username, password } = req.body;
    const user = new UserModel({
        username: username,
        password: password
    });
    await user.save();
    res.redirect('/');
}

const logout = (req, res) => {
    res.clearCookie('AuthToken');
    changeLoggedInFalse();
    res.redirect('/')
}


module.exports = {
    loginIndex,
    loginUser: function (username, password, callback) {
        UserModel.findOne({ username: username }).exec(function (error, user) {
            if (error) {
                callback({ error: true })
            } else if (!user) {
                callback({ error: true })
            } else {
                user.comparePassword(password, function (matchError, isMatch) {
                    if (matchError) {
                        callback({ error: true })
                    } else if (!isMatch) {
                        callback({ error: true })
                    } else {
                        callback({ success: true })
                    }
                })
            }
        })
    },
    registerIndex,
    registerPost,
    logout
}