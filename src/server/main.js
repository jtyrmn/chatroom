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
})

app.use(express.static(path.join(__dirname, '../client')));
app.use('/rooms', require('./routes/api/rooms'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

io.on('connection', (socket) => {
    console.log(`${socket.id} connected to server`);

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected from server`);
    });
});

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});