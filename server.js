var express = require("express");
var app = express();

var server = require("http").createServer(app);

var io = require("socket.io").listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);

app.get("/", (req, res) => {

    console.log("server running..........");


  res.sendFile(__dirname + "/index.html");
});

io.sockets.on('connection' ,(socket)=>{
    //console.log(socket)
    connections.push(socket);
console.log('connected  : %s sockets connected',connections.length);



socket.on('disconnect' ,(data)=>{


    //if(!socket.username) return ;
    users.splice(users.indexOf(socket.user),1)
updateUsernames();

    connections.splice(connections.indexOf(socket),1)
    console.log('disconnected : %s sockets connected' ,connections.length);

})


//send message
socket.on('send message',(data)=>{
console.log(data)
    io.sockets.emit('new message',{msg:data}  );
   // $message.val('');
})


socket.on('new user'  ,(data , callback)=>{
    callback(true);
console.log('in server '+data)
    socket.user=data;

    users.push(socket.user);

    updateUsernames();
})



function  updateUsernames(){
io.sockets.emit('get users'  , users)

}

})