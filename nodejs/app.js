const express = require('express');
const app = express();
const port = 3000;

app.listen(port,()=>{console.log(`server started. port: ${port}`)});

//test route
app.get('/',(req, res)=>{res.send('Hello SelfCare')});

