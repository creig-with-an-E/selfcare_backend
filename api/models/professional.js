const mongoose = require('mongoose');


const professionalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
    account:{
        userName:String,
        password:String,
    },
    contact:{
        email: {type:String, required:true},
        phone: Number, 
        address: {
            type: String,
            streetName: String,
            streetNumber: Number,
            province: String,
            postalCode: String,
            country: String
        }

    },
    location: {
        //this stores the geolocation which is used to determine closest professional to user
        type:{type:String},
        coordinates:[]
    },
    images:{
        imageName:String    // this store the name of the image. directory path will be static
    },
    bio:{type: String},
    rating:{type:Number,default:3},
    dob: Date,  //date of birth as opposed to age
    bookings:[] //stores references to appointment
});

professionalSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('professional', professionalSchema);