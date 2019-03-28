const mongoose = require('mongoose');

const Appointments = new mongoose.Schema({
    professionalId: {type:String, index:true, unique:true},
    bookings: Object
    /*this is a schema less model used as the model structure will
     be complex requiring multiple compound objects
    */
});

module.exports = mongoose.model('Appointments',Appointments)