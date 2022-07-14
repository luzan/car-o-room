const crypto = require('crypto');
let isLoggedIn=false;
module.exports = {
    authTokens: {},
    generateAuthToken: () => {
      
        return crypto.randomBytes(30).toString('hex');
    },
    requireAuth : (req, res, next) => {
        
        if (req.user) {
            //isLoggedIn= true;
            next();
        } else {
            res.redirect('/');
        }
    },
    isLoggedIn: () => {
        return isLoggedIn;
    },
    changeLoggedInTrue: () =>{
        console.log(isLoggedIn +"ad");
        isLoggedIn= true;
    },
    changeLoggedInFalse: () =>{
        console.log(isLoggedIn +"ad");
        isLoggedIn= false;
    }


}