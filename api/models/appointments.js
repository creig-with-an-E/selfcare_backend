const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointments = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    professionalId: {type:String,required:true},
    userId: {type:String,required:true},
    date:{type:String, required:true},
    time:{type:String, required:true}
});

module.exports = mongoose.model('Appointments', Appointments)