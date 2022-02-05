const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
    const date = new Date();
    console.log(`${date.toUTCString()}: ${req.method} request from ${req.ip} requesting ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, '../client')));
app.use('/rooms', require('./routes/api/rooms'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

io.on('connection', (socket) => {
    console.log(`${socket.id} connected to server`);

    socket.on('send_message', (msg) => {
        console.log(`${socket.id}: ${msg}`)
        console.log(`relaying message to these rooms: ${Array.from(socket.rooms)}`);
        socket.to(Array.from(socket.rooms)).emit('receive_message', msg);
        //io.emit('receive_message', msg);
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected from server`);
    });

    socket.on('join_room', (id) => {
        socket.rooms.clear();
        socket.join(socket.id);
        socket.join(id);
        console.log(`${socket.id} joining room ${id}`);
    });
});

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});