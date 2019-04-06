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

router.get('/',(req,res)=>{
  //gets all appointments
  Appointment.find()
    .populate('professional')
    .then((appointments)=>{
        res.status(200).json(appointments)
    }).catch(error=>{
        res.status(500).json({
           message:"error occured fetching appointment"
        })
    })
})


router.post("/",(req,res)=>{
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
                if(professional){
                    professional.bookings.push(appointment._id)
                    professional.save()
                      .catch((error)=>res.status(500).json({message:"error to professional"}))
                }else{
                    res.status(500).json({message:"professional not found"})
                }
            }).catch((error)=>res.status(500).json({error:error}))
     }).then(result =>{
        User.findById(req.body.userId)
          .then(user=>{
              if(user){
                  user['bookings'].push(appointment._id)
                  user.save()
                    .then(success=>{
                        res.status(200).json({message:"Appointment Booked"})
                    })
              }
          })
     })
     .catch(reject => {
        "use strict";
        res.status(500).json(reject)
    })
});

router.post("/findByProfessional",(req,res)=>{
  //returns appointments for professional
  //properties to return passed as the second prop in find
  Appointment.find({professionalId:req.body.professionalId})
   .populate('professionalId')
   .select('firstName')
   .then(result=>{
      res.status(200).json(result)
    }).catch(error=>{
        res.status(500).json({
          message:"error occured",
          error:error
        })
    })
})

module.exports = router;