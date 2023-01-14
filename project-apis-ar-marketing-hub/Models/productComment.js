const mongoose = require("mongoose");

const prodCommentSchema = new mongoose.Schema({
    text : String,
    author :{
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
        },
        email : String,
    },
    
    product : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
        },
        Product_Name : String,
    },
    
    date : {type : Date, default : Date.now()},
});

//const prodComment = 
module.exports = mongoose.model("prodComment", prodCommentSchema);
//module.exports = prodComment;