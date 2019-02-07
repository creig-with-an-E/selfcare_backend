//server created
const http = require('https');
const app = require('./app');

//assign port
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);