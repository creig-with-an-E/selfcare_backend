const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Appointment = require("../models/appointments");
const Professional = require("../models/professional")
const User = require("./../models/user");


// router.post('/createAppointment',(req,res)=>{
//     Professional.findById(req.body.professionalId)
//         .then((document)=>{
//             document['bookings'].push({name:'creig',time:'3-3:30pm'})
//             document.save((res)=>console.log("saved"))
//             res.status(200).json({document})
//         }).catch(error=>{
//             res.status(500).json({errorMessage:'an error occurred'})
//         })
// })

router.post("/",(req,res)=>{
    console.log("hitting route")
    //handles customer appointment creation
    const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId(),
        professionalId: req.body.professionalId,
        userId: req.body.userId,
        date: req.body.date,
        time: req.body.time
    })
    //find customer
    appointment.save()
     .then(success => {
         Professional.findById(req.body.professionalId)
            .then((professional)=>{
                console.log(professional)
                if(professional){
                    professional.bookings.push(appointment._id)
                    professional.save()
                      .then((result)=>res.json(success))
                      .catch((error)=>res.status(500).json({message:"error to professional"}))
                }else{
                    res.status(500).json({message:"professional not found"})
                }
            }).catch((error)=>res.status(500).json({error:error}))
     }).catch(reject => {
        "use strict";
        res.status(500).json(reject)
    })
});


module.exports = router;