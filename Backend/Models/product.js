const mongoose = require("mongoose");
//const productComment = require("./productComment");
passportLocalMongoose = require("passport-local-mongoose");

const productSchema = new mongoose.Schema({
   Product_ID : Number,
   Product_Name : String,
   Description : String,
   Link : String,
   Image : String, 
   prodComment : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "prodComment",
    }],
});

//const Product = mongoose.model('user', UserSchema)
module.exports =  mongoose.model("Product", productSchema);