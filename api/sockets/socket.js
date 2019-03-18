//socket handlers
//all socket logic is separated from the server
const socketio = require('socket.io');

module.exports.listen = function(app){
    io = socketio.listen(app);

    io.on("connection",(socket)=>{
        console.log("connected");

        socket.on("new_message",(data)=>{
            socket.emit("new_message",data)
        });
    });


    return io
};