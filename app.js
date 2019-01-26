const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



app.listen(port,()=>{console.log(`server started. port: ${port}`)});

//test route
app.post('/',(req, res)=>{console.log(req.body.email)});

