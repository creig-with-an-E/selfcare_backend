const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},

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
            streetName: String,
            streetNumber: Number,
            province: String,
            postalCode: String,
            country: String
        }

    },
    images:{
        imageName:String    // this store the name of the image. directory path will be static
    },
    bio:{type: String},
    rating:{type:Number,default:3},
    dob: Date  //date of birth as opposed to age


});


module.exports = mongoose.model('User', userSchema);


