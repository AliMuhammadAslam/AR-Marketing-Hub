const Joi = require('@hapi/joi')

const loginAuth = Joi.object({
    email: Joi.string().email().lowercase().required(), 
    password: Joi.string().min(8).required(),
})

module.exports = {
    loginAuth
}