function display_room_list() {
    rooms = null;
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

display_room_list();