const mongoose = require("mongoose");
//passportLocalMongoose = require("passport-local-mongoose");

const eventSchema = new mongoose.Schema({
   Event_ID : Number,
   Event_Name : String,
   Description : String,
   Image : String,
   Location: String,
   //Image : String,
   User_ID : Number, 
   eventComments : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "eventComment",
    }],
    Ticket_Price : Number,
    Delivery_Charge : Number

    
});


module.exports =  mongoose.model("Event", eventSchema);