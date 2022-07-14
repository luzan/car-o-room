# Project for SWE 425

This project is for submission of final project for SWE 425 and is developed using NodeJS, ExpressJS, EJS, Mongoose

[Project Description](../documentation/Problem%20Statement.docx)

## ToDos
- [x] Identify Problem Statement
- [x] Complete Preliminary UML Documentation
- [x] Setup Express app
- [x] Create folder structure for MVC
- [x] Create and setup server.js
- [x] Create Views
    - [X] create partial layouts
    - [x] implement bootstrap
    - [x] create individual layouts for cars
    - [x] create individual layouts for inquiries
    - [x] create individual layouts for makes
    - [x] create individual layouts for login and registration
- [x] Create Controllers
- [x] Setup project for using Mongoose
    - [x] Create Models
    - [x] Write Schemas for User
    - [x] Write Schemas for Inquiry
    - [x] Write Schemas for Cars
    - [x] Seed Car data
    - [x] Write Schemas for makes
    - [x] Seed Make data
- [x] Add filter with
  - [x] New and Used
  - [x] Model
  - [x] Price
  - [x] Make
  - [x] Distance
- [x] Add Sort by price
- [x] Implement Authentication 
- [x] Implement Remember Me feature during Login
- [x] Add image upload feature when adding cars

## Project folder Structure
```
.
└── Project/
    ├── controllers/
    │   ├── carController.js
    │   ├── inquiryController.js
    │   ├── loginController.js
    │   └── makeController.js
    ├── middlewares/
    │   └── authTokens.js
    ├── models/
    │   ├── carSchema.js
    │   ├── inquirySchema.js
    │   ├── makeSchema.js
    │   └── userSchama.js
    ├── node_modules/
    │   └── ...
    ├── public/
    │   ├── img/
    │   └── uploads/
    ├── routes/
    │   ├── cars.js
    │   ├── index.js
    │   ├── inquiry.js
    │   └── makes.js
    ├── seeds/
    │   ├── carSeeds.js
    │   └── makeSeeds.js
    ├── views/
    │   ├── cars/
    │   │   ├── edit.ejs
    │   │   ├── index.ejs
    │   │   └── new.ejs
    │   ├── inquiry/
    │   │   ├── list.ejs
    │   ├── makes/
    │   │   ├── edit.ejs
    │   │   ├── index.ejs
    │   │   ├── new.ejs
    │   │   └── show.ejs
    │   ├── partials/
    │   │   ├── footer.ejs
    │   │   ├── head.ejs
    │   │   ├── header.ejs
    │   │   └── select.ejs
    │   ├── index.ejs
    │   └── register.ejs
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── readme.me
    └── server.js
```

## RESTful APIS ***for login and register***

| Name     |   Path    | Verb  |                          Purpose |
| :------- | :-------: | :---: | -------------------------------: |
| Index    |     /     |  GET  |               Display Login Page |
| Login    |     /     | POST  |               Login post Request |
| Create   | /register |  GET  |        Display registration page |
| Register | /register | POST  |          Register user on server |
| Logout   |  /logout  |  GET  | Logout user from the application |

## RESTful APIS ***for cars***

| Name       |      Path      |  Verb  |                          Purpose |
| :--------- | :------------: | :----: | -------------------------------: |
| Index      |     /cars      |  GET   |                 Display all cars |
| New        |   /cars/new    |  GET   |           From to create new car |
| Create     |     /cars      |  POST  |         Create new car on server |
| Show(skip) |   /cars/:id    |  GET   |     Details for one specific car |
| Edit       | /cars/:id/edit |  GET   |        From to edit specific car |
| Update     |   /cars/:id    | PATCH  |    Update specific car on server |
| Destroy    |   /cars/:id    | DELETE |    Delete specific car on server |
| Filter     |  /cars/filter  |  Get   | Filter cars data based on inputs |

## RESTful APIS ***for makes***

| Name    |      Path       |  Verb  |                           Purpose |
| :------ | :-------------: | :----: | --------------------------------: |
| Index   |     /makes      |  GET   |                 Display all makes |
| New     |   /makes/new    |  GET   |           From to create new make |
| Create  |     /makes      |  POST  |         Create new make on server |
| Show    |   /makes/:id    |  GET   |     Details for one specific make |
| Edit    | /makes/:id/edit |  GET   |        From to edit specific make |
| Update  |   /makes/:id    | PATCH  |    Update specific make on server |
| Destroy |   /makes/:id    | DELETE |    Delete specific make on server |
| Filter  |  /makes/filter  |  Get   | Filter makes data based on inputs |


## Major features

### Using Filter

Created a query based on what's selected from the Filters form. Cars are fetched using that query from Car model. 

You may see sorting order done in the same controller it is because to sort the data that are already filtered using the filter.

```javascript
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

```

### Authentication 

Created different middleware to generate AuthToken, AuthToken is stored in the cookies.

```javascript
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
            res.render('index', {
                message: 'Please login to continue',
                messageClass: 'alert-danger'
            });
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
```

When storing AuthToken in the cookies, if user has selected remember me then expiring time of AuthToken is set to 2 minutes (which is custom and can me modified as required, e.g. for a day). And if user didn't check remember me then AuthToken is set to expire after the session is over (or browser is closed).

```javascript
const minute = process.env.MAXSESSION * 60 * 1000;
const authToken = generateAuthToken();
authTokens[authToken] = username;
remember? res.cookie('AuthToken', authToken, { maxAge: minute }) : res.cookie('AuthToken', authToken);
```
