const express = require('express');
const router = express.Router();
const Professional = require('../models/professional');
const mongoose = require('mongoose');


//This route is a post request that creates and stores a new professional user to the database.
router.post('/',(req,res) => {
    const professional = new Professional({

        //Here we are referencing the properties of the professional user model
        _id: new mongoose.Types.ObjectId(),
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        contact: {
            email: req.body.email,
            address: req.body.address
        },
        age: req.body.age
    });
    professional.save();
    res.status(200).json(professional);



});





module.exports = router;