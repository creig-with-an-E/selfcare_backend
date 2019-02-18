const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const userRoutes = require('./api/routes/users');
const professionalRoutes = require('./api/routes/professionals');

/*This is where we connect to the mLab database, using this connection string*/
mongoose.connect('mongodb://johndoe:mcqxLUR6xzPe45e@ds247690.mlab.com:47690/selfcaredb',
    { useNewUrlParser: true }
    );

/*to use the default node.js promise implementation, instead of the mongoose version.
This will also remove the deprecation warning.*/
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/users', userRoutes);  //users route
app.use('/professionals', professionalRoutes);  //professional route






module.exports = app;


