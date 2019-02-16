const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        first: String,
        last: String
    },

    contact: {
        email: String,
        address: String
    },
    age: {type: Number, min: 0}


});

module.exports = mongoose.model('User', userSchema);

//user2.name.first = 'paul'
//user2.firstname= 'paul'
