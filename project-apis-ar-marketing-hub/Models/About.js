const mongoose = require("mongoose");
//passportLocalMongoose = require("passport-local-mongoose");

const aboutSchema = new mongoose.Schema({
    title: String,
    Image1:  String,
    Image2:  String,
    text1: String,
    text2: String,
})

module.exports =  mongoose.model("About", aboutSchema);