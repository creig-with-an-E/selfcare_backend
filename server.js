//server created
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

//socket.io listening to the server
//all socket logic extracted
const io = require("./api/sockets/socket").listen(server);

//assign port
const port = process.env.PORT || 3000;

server.listen(port);

