const mongoose = require('mongoose');

const Appointments = new mongoose.Schema({
    professionalId: {type:String, index:true, unique:true},
    bookings: [{
          date: String,  //date will be stored as a string
          times:[{
                  userId:String, //userId of individual making appointment
                  time:String    //appointment Time
                }] 
        }]
    /*this is a schema less model used as the model structure will
     be complex requiring multiple compound objects
    */
});

module.exports = mongoose.model('Appointments',Appointments)