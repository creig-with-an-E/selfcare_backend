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
        contact: {
            email: req.body.email,
            address: req.body.address
        },
        age: req.body.age
    });
    professional.save();
    res.status(200).json(professional);



});

//This route uses a GET request that will fetch all Professional users.
router.get('/',(req,res,next) => {
    Professional.find()
        .select()
        .exec()
        .then(docs => {
            const response = {
                users: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        contact: doc.contact,
                        age: doc.age,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/professionals/'
                        }
                    }
                })
            };
            res.status(200).json({response});
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});





module.exports = router;