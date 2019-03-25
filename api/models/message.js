const mongoose = require('mongoose');

const Messages = new mongoose.Schema({
    //messages are stored outside of the user objects
    _id: mongoose.Schema.Types.ObjectId,
    message:String,
    professionalId:{type:String,required:true},
    userId:{type:String,required:true},
    readStatus:{type:Boolean, default:true}  //true if message has been read
    // timestamp: new Date()
});

module.exports = mongoose.model("Messages",Messages)