/*
contains all the socket listeners and events
*/

const socketio = require('socket.io');
const User = require('./../models/user');
const Message = require('./../models/message');
const mongoose = require('mongoose');

const mobileSockets = {};   //stores the socket to user reference
    let count = 0;

module.exports.listen = function(app){
    io = socketio.listen(app);
    count++;    //updating the list of users
    io.on("connection",(socket)=>{
        socket.on('newUser',credentials=>{
        //keeping track of users and their socket id 
          console.log('new User ',credentials.userId)
          const userId = credentials.userId;
          mobileSockets[userId] = socket.id;
          socket.emit('userCreated',{userId:userId})
          socket.broadcast.emit('newUser',userId)
        })  

        socket.on('getPrevMessages',(data)=>{
            //get prior messages
            // Conversations.findOrCreate
            Message.find({userId:data.userId})
            .then((res)=>{
                console.log(res)
                socket.emit("getPrevMessages",{messages:res.data})
            })
            .catch((err)=>console.log(err))
        });

        socket.on('message',(data)=>{
           //purpose:saves message to Db
           //params: data ={message,receiver,sender}
           //return: emits incoming event to sender and receiver  
           const message_model = new Message({
              _id: new mongoose.Types.ObjectId(),
              message:data.message,
              professionalId:data.receiver,
              userId:data.sender
           })
           message_model.save()
           .then((result)=>{
            console.log(`MESSAGE-> ${data.message}`)
            socket.emit("incomingMessage",{message:data.message});
            const receiverSocketId = mobileSockets[data.receiver];
            socket.to(receiverSocketId).emit('incomingMessage',{message:data.message})
           })
           .catch((err)=>{
            console.log(err)
        });
        })

        socket.on("disconnecting",()=>{
            count--;
            io.sockets.emit("initialize",{userId:count,connectedUsers:count})
        })
    });


    return io
};