const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(), 
    password: Joi.string().min(8).required(),
    isAdmin: Joi.boolean().required(),
})

module.exports = {
    authSchema
}