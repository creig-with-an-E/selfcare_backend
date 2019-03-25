const express = require('express');
const router = express.Router();
const User = require('../models/user');// We will need this to instantiate a user from the user.js model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//This route is a post request that creates and stores a new user to the database.
// router.post('/',(req, res, next) => {
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         name: {
//             first: req.body.firstName,
//             last: req.body.lastName
//         },
//
//         contact: {
//             email: req.body.email,
//             address: req.body.address
//         },
//         age: req.body.age
//     });
//     user.save();
//     res.status(200).json({message:"complete"})
// });

//This route uses a post request that creates and stores a new user to the database.

router.post('/signup',(req,res,next) => {
    User.find({
        contact:
            {
                email: req.body.email
            }
    })
        .exec()
        .then(user => {
            if(user.length >= 1){
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
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),

                            firstName:req.body.firstName,
                            lastName:req.body.lastName
                            ,
                            contact:{
                                email: req.body.email
                            },
                            account:{password: hash}
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
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
    User.find(
        {
            contact: {
                email:req.body.email
            }
        })
        .exec()
        .then(user =>{
            if(user.length < 1){
                return res.status(400).json({
                    message: 'Authentication failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].account.password, (err, result)=> {
                if(err){
                    return res.status(401).json({
                        message: 'Password Error'
                    });
                 }
                if(result){
                    const token = jwt.sign({
                            email:user[0].contact.email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Authentication successful',
                        token: token,
                        _id:user[0]._id
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
                error:err
            });
        });
});

//This route is a GET request that fetches all users
router.get('/',(req,res)=>{
    User.find()
        .select()
        .exec()
        .then(users => {

            res.status(200).json(users);    //returns array of user objects back to client.
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId',(req,res,next) => {
    User.remove({_id: req.params.userId})
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

router.get('/findById',(req,res,next) => {
    const id = req.body._id;
    User.findById(id)
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
                        url: 'http://localhost:3000/users/'
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

//This route uses a GET request that will fetch all users by name.
router.get('/findByName',(req,res,next) => {
    User.find()
        .select()
        .where('name.first',req.body.name)
        .exec()
        .then(users => {

            res.status(200).json(users);    //returns array of user objects back to client.
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/updateUser', (req,res) => {
    console.log(req.body.data);
    User.findByIdAndUpdate(req.body.id, req.body.data, (error,res) => {
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

//fall routers that handles unknown routes
router.get('*',(req,res)=>{
    res.status(404).json({error:"router error"})
});

router.post('/*',(req,res)=>res.status(404).json({error:"router error"}));

module.exports = router;