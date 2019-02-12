const express = require('express');
const app = express();
const mongoose = require('mongoose');


const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://johndoe:mcqxLUR6xzPe45e@ds247690.mlab.com:47690/selfcaredb',
    { useNewUrlParser: true }
    );



app.use('/users', userRoutes);






module.exports = app;

