const linked_list = require('yallist')
const Message = require('./message')
const {nanoid} = require('nanoid')

class Room{
    constructor(name, id){
        this.name = name;
        this.id = nanoid(6);
        this.messages = new linked_list.create();
    }

    
}

const rooms_list = [new Room('a name'), new Room('another name')];
rooms_list[1].messages.push(new Message("hello this is first message"));
rooms_list[1].messages.push(new Message("hello this is second message"));

module.exports = rooms_list