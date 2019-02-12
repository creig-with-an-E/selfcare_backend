const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        name: String,
        first: String,
        last: String
    },

    contact: {
        email: String,
        address: String
    },
    age: {
        type: Number,
        min: 0
    }


});

module.exports = mongoose.model('User', userSchema);