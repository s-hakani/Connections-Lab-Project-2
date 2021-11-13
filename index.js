//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

//Listen for individual clients/users to connect
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //Listen for a message named 'msg' from this client
    socket.on('msg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('msg', data);

        //Send a response to all other clients, not including this one
        // socket.broadcast.emit('msg', data);

        //Send a response to just this client
        // socket.emit('msg', data);
    });


    socket.on('typing', function() {
        console.log("Got the typing message");
        socket.broadcast.emit("typeMsg");
    })

    // This part needs some work: Add the socket emit here and on in sketch.js

    socket.on('pressed', () => {
        console.log("Mouse is pressed");
    })

    socket.on('dragged', () => {
        console.log("Mouse is dragged");
    })

    socket.on('draw', () => {
        console.log("Mouse is released");
    })


    
    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});