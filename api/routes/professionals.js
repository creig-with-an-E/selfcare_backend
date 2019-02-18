const express = require('express');
const router = express.Router();
const Professional = require('../models/professional');
const mongoose = require('mongoose');


//This route uses a post request that creates and stores a new professional user to the database.
router.post('/',(req,res) => {
    const professional = new Professional({

        //Here we are referencing the properties of the professional user model
        _id: new mongoose.Types.ObjectId(),
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        account:{
            userName:req.body.userName,
            password:req.body.password
        },
        contact: {
            phone: request.body.phone,
            email: req.body.email,
            address: req.body.address
        },
        dob: req.body.dob,   //this is the reference to date of birth
        bio: req.body.bio
    });
    professional.save();
    res.status(200).json(professional);



});

//This route uses a GET request that will fetch all Professional users.
router.get('/',(req,res,next) => {
    Professional.find()
        .select()
        .exec()
        .then(proUsers => {
            //proUsers is already javascript object, 
            res.status(200).json(proUsers);    //returns array of profUsers objects back to client. 
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});





module.exports = router;