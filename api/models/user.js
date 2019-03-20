const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // this will be a composite object containing the both first and last name
    name:{
        first:String,
        last:String
    },

    account:{
        userName:String,
        password:String,
    },
    contact:{
        email: {
            type:String,
            required:true
        },
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
    dob: Date  //date of birth as opposed to age


});


module.exports = mongoose.model('User', userSchema);


