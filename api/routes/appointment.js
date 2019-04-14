'use strict'

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Appointment = require("../models/appointments");
const Professional = require("../models/professional")
const User = require("./../models/user");

//Email Helper Function
const EmailHelper = require("../HelperFunctions/SendMessage")

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

router.post("/sendEmail",(req,res,next)=>{
    const EmailHelperObj = new EmailHelper()
    EmailHelperObj.sendNewAccountEmail(req.body.sendTo).then((result)=>{
        return result
    }).then((result)=>{
        res.status(200).json({message:'sent'})
    }).catch((err)=>{return err}).catch((err)=>res.status(500).json({message:'failed to send'}))
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
    console.log(req.body);
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

router.post("/findByUser",(req,res)=>{
  Appointment.find({userId:req.body.userId})
    .populate('professionalId')
    .then(result=>{
       res.status(200).json(result)
    }).catch(error=>{
        res.status(500).json({message:"failed to get results",
                              error:error
                            })
    })
});

router.post("/findByProfessional",(req,res)=>{
  //returns appointments for professional
  //properties to return passed as the second prop in find
  Appointment.find({professionalId:req.body.professionalId})
   .populate('userId')
   .then(result=>{
      res.status(200).json(result)
    }).catch(error=>{
        res.status(500).json({
          message:"error occured",
          error:error
        })
    })
})

router.post("*",(req,res)=>{
    res.status(404).json({message:"endPoint not Found"})
})

router.get("*",(req,res)=>{
    res.status(404).json({message:"endPoint not Found"})
})

module.exports = router;