const express = require('express');
const router = express.Router();
const User = require('../models/user');// We will need this to instantiate a user from the user.js model
const mongoose = require('mongoose');


//This route is a post request that creates and stores a new user to the database.
router.post('/',(req, res, next) => {
    const user = new User({
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
    user.save();
    res.status(200).json({message:"complete"})
});



module.exports = router;