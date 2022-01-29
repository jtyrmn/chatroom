const express = require('express');
const router = express.Router();

const rooms_list = require('../../room');

router.get('/', (req, res) => {
    //send the names of all the rooms as well as their ids
    res.json(rooms_list.map(room => {return {name: room.name, id: room.id}}));
});

router.get('/:id', (req, res) => {
    const room = rooms_list.find(element => element.id == req.params.id);
    res.json({name: room.name, id: room.id, messages: room.messages.toArray()});
});

router.post('/', (req, res) => {
    console.log(req.body.name);
    res.send(req.body);
});
module.exports = router;