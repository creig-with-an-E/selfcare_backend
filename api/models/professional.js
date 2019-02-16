const mongoose = require('mongoose');

const professionalSchema = mongoose.Schema({
    /*
    *This is the professional's schema which consists of id, name, contact, and age
    * */

    _id: mongoose.Schema.Types.ObjectId,
    name:{
        first: String,
        last: String
    },
    contact:{
    email: String,
        phone: Number,
        address: String
},
    age: {
        type: Number,
        min: 0
    }



});

module.exports = mongoose.model('professional', professionalSchema);