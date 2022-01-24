class Room{
    constructor(name, id){
        this.name = name;
        this.id = id;
    }
}

const rooms_list = [new Room('a name','an id'), new Room('another name', 'another id')];

module.exports = rooms_list