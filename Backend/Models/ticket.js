const mongoose = require("mongoose");
//passportLocalMongoose = require("passport-local-mongoose");

const ticketSchema = new mongoose.Schema({
   Event_ID : Number,
   Event_Name : String,
   Description : String,
   Image : String,
   //Image : String,
   User_ID : Number, 
//    eventComments : [{
//        type : mongoose.Schema.Types.ObjectId,
//        ref : "eventComment",
//     }],
    Quantity: Number,
    Price: Number,
    Total: Number
});


module.exports =  mongoose.model("Ticket", ticketSchema);