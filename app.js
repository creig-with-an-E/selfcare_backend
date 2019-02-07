const express = require('express');
const app = express();


const userRoutes = require('./api/routes/users');

app.use('/users', userRoutes);






module.exports = app;

