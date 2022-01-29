const linked_list = require('yallist')
const Message = require('./message')
const {nanoid, random} = require('nanoid')

class Room{
    constructor(name){
        this.name = name;
        this.id = nanoid(8);
        this.messages = new linked_list.create();
    }

    
}

const rooms_list = [];
for(let i = 0; i < 20; i += 1){
    rooms_list.push(new Room(nanoid(3)));
    while(Math.random() > 0.1){
        rooms_list[rooms_list.length - 1].messages.push(new Message(nanoid(2)));
    }

}

module.exports = rooms_list