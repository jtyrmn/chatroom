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