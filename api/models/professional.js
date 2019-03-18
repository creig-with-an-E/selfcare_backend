const mongoose = require('mongoose');

const professionalSchema = mongoose.Schema({
    /*
    *This is the professional's schema which consists of id, name, contact, and age
    * */

    _id: mongoose.Schema.Types.ObjectId,
    name:{ // this will be a composite object containing the both first and last name
        first: {type:String, required:true},
        last: {type:String, required:true}
    },
    account:{
        userName:String,
        password:String,
    },
    contact:{
        email: {type:String, required:true},
        phone: Number, 
        address: String,
    },
    location: {
        type:{type:String},
        coordinates:[]
    },
    images:{
        imageName:String    // this store the name of the image. directory path will be static
    },
    bio:{type: String},
    rating:{type:Number,default:3},
    dob: Date,  //date of birth as opposed to age
    professionalType:{
        barber: String,
        beautician: String
    }

});

professionalSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('professional', professionalSchema);