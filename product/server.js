const express = require('express');
const app = express();
const methodOverride = require('method-override');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

require("dotenv").config();
//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = process.env.MONGOURL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error!!");
        console.log(err);
    });

const { authTokens } = require('./middlewares/authTokens')

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use((req, res, next) => {
    const authToken = req.cookies?.AuthToken ? req.cookies.AuthToken : null;
    if(authToken === undefined) {
        console.log('no such cookie')
    }
    req.user = authTokens[authToken];
    next();
});

// settings for views
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile)

//// route
// Login Routes as index
app.use('/', require('./routes/index'))
app.use('/cars', require('./routes/cars'))
app.use('/makes', require('./routes/makes'))
app.use('/inquiry', require('./routes/inquiry'))

// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('App running on ' + process.env.PORT) });
