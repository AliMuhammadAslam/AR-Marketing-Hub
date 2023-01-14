const mongoose = require("mongoose");

const eventCommentSchema = new mongoose.Schema({
    text : String,
    author :{
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
        },
        email : String,
    },
    
    event : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Event",
        },
        Event_Name : String,
    },
    
    date : {type : Date, default : Date.now()},
});


module.exports = mongoose.model("eventComment", eventCommentSchema);