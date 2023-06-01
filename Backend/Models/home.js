const mongoose = require("mongoose");
//passportLocalMongoose = require("passport-local-mongoose");

const homeSchema = new mongoose.Schema({
    Image:  String,
    text: String,
})

module.exports =  mongoose.model("Home", homeSchema);