const express = require('express') 
var bodyParser = require('body-parser')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const { verifyAccessToken } = require('./helpers/jwt_helper')
const { authSchema } = require('./helpers/validation_schema')
var cors = require('cors')

const AuthRoute = require('./Routes/Auth.route')
const User = require('./Models/User.model')
const ProductRoute = require('./Routes/Product')
const Product = require('./Models/product')
const Event = require('./Models/event')
const About = require('./Models/About')
const Home = require('./Models/home')
const prodComment = require('./Models/productComment')
const eventComment = require('./Models/eventComment')
const { $ } = require('@hapi/joi/lib/base')
const productController = require('./Controller/Product');
const eventController = require('./Controller/Event');
const aboutController = require('./Controller/About');
const homeController = require('./Controller/Home');

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(cors()) 


app.get('/', verifyAccessToken, async (req, res, next) => {
    const result = await authSchema.validateAsync(req.body)
    res.send(`Hello ${result.email}`)

})

app.use('/auth', AuthRoute)

app.use(async (req, res, next) => {
    next(createError.NotFound())
})


app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`) 
})

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /api/users gets JSON bodies
//app.post('/auth/find_product', jsonParser, productController.findProducts);
    // create user in req.body