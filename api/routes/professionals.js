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
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        },
        dob: req.body.dob,   //this is the reference to date of birth
        bio: req.body.bio,
        professionalType: req.body.professionalType
    });
    professional.save((err)=>{
        if(err){
            res.status(400).json({error:"error occurred"})
        }
        res.status(200).json(professional);
    });



});

//This route uses a GET request that will fetch all Professional users.
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
        .select()
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

router.get('/findByAge', (req,res) => {
    Professional.find()
        .select()
        .where('age', req.body.dob)
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
    console.log('*******************',req.body.data);
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
})





module.exports = router;