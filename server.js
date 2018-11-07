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

    connections.splice(connections.indexOf(socket),1)
    console.log('disconnected : %s sockets connected' ,connections.length);

})

})