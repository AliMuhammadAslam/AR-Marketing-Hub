const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.model')
const About = require('../Models/About')
const { authSchema } = require('../helpers/validation_schema')
const { loginAuth } = require('../helpers/login_validation')
const { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../helpers/jwt_helper')
const { create } = require('../Models/User.model')
const Product = require('../Models/product')
const Event = require("../Models/event")
const parser = require('../app')

router.post('/register', async(req, res, next) => {
    try {
        //const {email, password} = req.body
        //if (!email || !password) throw createError.BadRequest()
        const result = await authSchema.validateAsync(req.body)

        const doesExist = await User.findOne({email: result.email})
        if (doesExist) throw createError.Conflict(`${result.email} has already been registered`)

        // const user = await User.create({
        //     name,
        //     email,
        //     password,
        //   });

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)

        res.json({ name:user.name, email:user.email, accessToken, refreshToken})

    } catch (error) {
        if(error.isJoi == true) error.status = 422
        console.log(error.message)
        next(error)
    }
})

router.post('/login', async(req, res, next) => {
    try {
        const result = await loginAuth.validateAsync(req.body)
        const user = await User.findOne({ email: result.email })
        if (!user) throw createError.NotFound('User not registered')

        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch) throw createError.Unauthorized('Username or Password Not Valid')

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)

        res.json({id:user._id, name: user.name, email:user.email, accessToken, refreshToken, isAdmin:user.isAdmin, contact:user.contact, address:user.address})

    } catch (error) {
        if (error.isJoi == true) return next(createError.BadRequest("Inavalid Username or Password"))
        next(error)
    }
})

router.post('/refresh-token', async(req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)

        res.send({acessToken: accessToken, refreshToken: refToken})
    } catch (error) {
        next(error)
    }
})

router.delete('/logout', async(req, res, next) => {
    res.send('logout route')
})

// router.post = ('/about', async(req, res, next) => {
//     try {
//        //console.log(product_id);
//        const about = await About.find(this.all);
//        res.json(//"user/productDetails", 
//        {about:about});
//     } catch (error) {
//        next (error);
//     }
//  })
 


// Importing controller
const productController = require('../Controller/Product');

router.get('/products', productController.getProducts);

/*router.get('/products', verifyAccessToken, async (req, res, next) => {
    const result = await authSchema.validateAsync(req.body)
    res = productController.getProducts
    res.send

})*/

const aboutController = require('../Controller/About')
router.get('/about', aboutController.getAbout);
router.post('/addAbout', aboutController.postAddAbout)

const homeController = require('../Controller/Home')
router.get('/home', homeController.getHome);
router.post('/addHome', homeController.postAddHome)

router.post("/find_product/:filter", productController.findProducts);

router.get("/product_details/:product_id", productController.getProductDetails);

router.post("/add_product", productController.postAddNewProduct);

router.post("/update_product/:product_id", productController.postUpdateProduct);

router.get("/delete_product/:product_id", productController.getDeleteProduct);

// Importing controller
const eventController = require('../Controller/Event');
const req = require('express/lib/request')
router.get('/events', eventController.getEvents) 

router.post("/find_event/:event_name", eventController.findEvents);

router.get("/event_details/:event_id", eventController.getEventDetails);

router.post("/add_event", eventController.postAddNewEvent);

router.post("/update_event/:event_id", eventController.postUpdateEvent);

router.get("/delete_event/:event_id", eventController.getDeleteEvent);
router.post("/add_ticket", eventController.postAddNewTicket);


// importing controller
const userController = require('../Controller/User');
router.post("/product_details/:user_id/:product_id/comment", userController.postNewProdComment);

router.post("/event_details/:user_id/:event_id/comment", userController.postNewEventComment);

// router.post("/edit_Profile", eventController.updateProfile)
router.post("/update_profile/:user_id", userController.postUpdateUserInfo);

module.exports = router;