//socket handlers
//all socket logic is separated from the server
const socketio = require('socket.io');
const User = require('./../models/user');

const mobileSockets = {};
    let count = 0;
module.exports.listen = function(app){
    

    io = socketio.listen(app);
    
    io.on("connection",(socket)=>{
        socket.on('newUser',credentials=>{
          const {firstName,password} = credentials;

            mobileSockets[firstName] = socket.id;
            socket.emit('userCreated',{user:firstName})
            socket.broadcast.emit('newUser',firstName)
        })    

        socket.on('chat',users=>{
            //get prior messages
            // Conversations.findOrCreate

        });

        socket.on('message',(data)=>{
           //save message to DB
           console.log(mobileSockets);
           socket.emit("incomingMessage",data.text);
           const receiverSocketId = mobileSockets[data.receiver];
           socket.to(receiverSocketId).emit('incomingMessage',data.text)})

        socket.on("new_message",(data)=>{
            console.log(data);
            socket.emit("new_message",data)
        });

        socket.on("disconnecting",()=>{
            count--;
            io.sockets.emit("initialize",{userId:count,connectedUsers:count})
        })
    });


    return io
};