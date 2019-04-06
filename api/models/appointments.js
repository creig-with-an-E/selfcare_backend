const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointments = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    professionalId: {type: Schema.Types.ObjectId,ref:"professional"},
    userId: {type: Schema.Types.ObjectId,ref:"User"},
    date:{type:String, required:true},
    time:{type:String, required:true}
});

module.exports = mongoose.model('Appointments', Appointments)