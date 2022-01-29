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

function display_room_list() {
    http = new XMLHttpRequest();
    http.onload = function(){
        room_list = JSON.parse(this.responseText);
        text = '<table>';
        for (room of room_list){
            text += `<tr><td>${room.name}</td><td>${room.id}</td><td><button onclick="display_room('${room.id}')">join</button></td></tr>`;
        }
        document.getElementById('room_list').innerHTML = text + '</table>';
    }
    http.open('GET', '/rooms');
    http.send();
}

function send_message() {
    http = new XMLHttpRequest();
    http.onload = function(){
        console.log(this.responseText);
    }
    http.open('POST', '/rooms');
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify({name: 'hello ther it works yayayyayayay'}));
}

//runs when page loads
display_room_list();