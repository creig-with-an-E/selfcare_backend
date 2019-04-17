"use strict"

const express = require('express');
const router = express.Router();
const Professional = require('../models/professional');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const EmailHelper = require('./../HelperFunctions/SendMessage');

//This route uses a post request that creates and stores a new professional user to the database.

router.post('/signup',(req,res,next) => {
    Professional.find({
        contact:
                {
                    email: req.body.email
                }
        })
        .exec()
        .then(professional => {
            if(professional.length >= 1){
                return res.status(409).json({
                    message: 'email exists'
                });
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new Professional({
                            _id: new mongoose.Types.ObjectId(),

                                firstName:req.body.firstName,
                                lastName:req.body.lastName
                            ,
                            contact:{
                                email: req.body.email},
                            account:{password: hash},
                            location: {
                                type:"Point",
                                coordinates:[req.body.longitude,req.body.latitude]
                            }
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    professionalId:user._id,
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error:err
                                });
                            });
                    }
                })

            }
        });
});

router.post('/login',(req,res,next) => {
    console.log(req.body);
    Professional.find(
        {
            contact: {
               email:req.body.email
            }
        })
        .exec()
        .then(professional =>{
            if(professional.length < 1){
                return res.status(401).json({

                    message: 'Authentication failed'
                });
            }
            bcrypt.compare(req.body.password, professional[0].account.password, (err, result)=> {
               if(err){
                   return res.status(401).json({
                       message: 'Authentication Failed'
                   });
               }
               if(result){
                   // const token = jwt.sign({
                   //     email:professional[0].contact.email,
                   //     professionalId: professional[0]._id
                   // },
                       // process.env.JWT_KEY,
                       // {
                       //     expiresIn: "1h"
                       // }
                       // );
                   return res.status(200).json({
                       message: 'Authentication successful',
                       // token: token,
                       professionalId:professional[0]._id
                   });
               }
               res.status(401).json({
                   message: 'Authentication failed'
               });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err,
                data:req.body
            });
        });
});

router.delete('/:userId',(req,res,next) => {
    Professional.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message:'user deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});


//This route uses a GET request that will fetch all Professional users by name.
router.get('/findByName',(req,res,next) => {
    Professional.find()
        .select()
        .where('name.first',req.body.name)
        .exec()
        .then(professionals => {
            //proUsers is already javascript object,
            res.status(200).json(professionals);    //returns array of professional user objects back to client.
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//This route will fetch all professional users by name


//This route will find all professional by their ID.
router.get('/findById',(req,res,next) => {
    const id = req.body._id;
    Professional.findById(id)
        .select()
        .populate("Appointment", "_id userId time date")
        .exec()
        .then(doc => {
            //testing that its coming from database
            console.log("from database", doc);
            if(doc){
                res.status(200).json({
                    professional: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/professionals/'
                    }
                });
            }else{
                res.status(404).json({message: 'No valid entry found from provided ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        })
});

router.get('/',(req,res)=>{
    Professional.find()
        .select('firstName lastName contact.email userName bio rating')
        .exec()
        .then(professionals => {
            //proUsers is already javascript object,
            res.status(200).json(professionals);    //returns array of professional user objects back to client.
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/findByProfessionalType', (req,res) => {
    Professional.find()
        .select()
        .where('professionalType', req.body.professionalType)
        .exec()
        .then(professionals => {
            //proUsers is already javascript object,
            res.status(200).json(professionals);    //returns array of professional user objects back to client.
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
router.post('/updateProfessional', (req,res) => {
    console.log(req.body.data);
    Professional.findByIdAndUpdate(req.body.id, req.body.data, (error,res) => {
        if (error){
            console.log(error)
        }
    }).then
    ((result) => {
        res.status(200).json({
            result
        });
    } ).catch( (error) => {
            res.status(400).json({
                error
            })
        }
    )
});

router.post('/findByLocation',(req,res)=>{

    const location = req.body.location;     //user location

    Professional.find({
        location:{
            $near:{
                $maxDistance:10000,      //max distance of 1km from user
                $geometry:{
                    type:"Point",
                    coordinates: location   //should be updated
                }
            }
        }
    }).then((results) => {
        res.status(200).json(results);
    }).catch((error)=>res.status(400).json({err:error}))
});

router.post('/contactUs',(req,res)=>{
    // below is the function signature
    //sendNewAccountEmail(sendTo,from, feedback, cc,subject)
    console.log("hitting route")
    const EmailHelperObj = new EmailHelper();
    const {to,cc,subject,feeback,from} = req.body;

    const email =Professional.findById(from)
        .select("contact.email")
        .then((result)=>{
            console.log(result)
        }).catch(error=>{
            console.log(error)
        })

    ;
    EmailHelperObj.sendNewAccountEmail(to, email.email, feeback, cc, subject).then((result)=>{
        console.log(result)
    }).then((response)=>{
        res.status(200).json({message:'sent',result:response})
    }).catch((err)=>{return err}).catch((err)=>res.status(500).json({message:'failed to send'}))

});


//fall routers that handles unknown routes
router.get('*',(req,res)=>{
    res.status(404).json({error:"router error"})
});

router.post('/*',(req,res)=>res.status(404).json({error:"router error"}));

module.exports = router;