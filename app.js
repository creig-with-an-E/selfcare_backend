const express = require('express');
const app = express();
const path = require('path')
const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log(`server started. port: ${port}`)});

//test route
app.get('/',(req, res)=>{res.send('<h1>Self Care the app</h1><p>This is a response from the backend (node.js)running from heroku.com </p>')});

