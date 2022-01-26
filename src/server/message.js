class Message{
    constructor(text){
        const d = new Date();
        this.send_date = d.getTime();

        this.text = text;
    }

    toString(){
        return this.text;
    }
}

module.exports = Message;