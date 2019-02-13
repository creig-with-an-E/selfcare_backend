const mongoose = require('mongoose');

const proUserSchema = mongoose.Schema({
    /*
    *
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

module.exports = mongoose.model('proUser', proUserSchema);