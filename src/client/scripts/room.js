const socket = io();
current_room = NaN;

socket.on('connect', () => {
    console.log('connected to server');
})

socket.on('disconnect', () => {
    console.log('disconnected from server');
})

socket.on('receive_message', (msg) => {
    console.log(`received message [${msg}]`);
    display_room(current_room);
});

function display_room(id) {
    http = new XMLHttpRequest();
    http.onload = function(){
        const messages = JSON.parse(this.responseText).messages;
        const text = messages.reduce((total, current)=>{
            const d = new Date(current.send_date);
            return total + d.toLocaleTimeString() + ': ' + current.text + '<br>'; 
        }, '');
        document.getElementById('room_chat').innerHTML = text;
    }
    http.open('GET', '/rooms/' + id);
    http.send();
}

function join_room(id) {
    current_room = id;
    socket.emit('join_room', id);
    display_room(id);
}

function display_room_list() {
    rooms = null;
    http = new XMLHttpRequest();
    http.onload = function(){
        room_list = JSON.parse(this.responseText);
        text = '<table>';
        for (room of room_list){
            text += `<tr><td>${room.name}</td><td>${room.id}</td><td><button onclick="join_room('${room.id}')">join</button></td></tr>`;
        }
        document.getElementById('room_list').innerHTML = text + '</table>';
    }
    http.open('GET', '/rooms');
    http.send();
}

function send_message(msg) {
    if(current_room != NaN){
        console.log('sneding message...');
        socket.emit('send_message', msg, current_room);
        display_room(current_room);
    }
}

display_room_list();