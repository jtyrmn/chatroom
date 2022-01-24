const express = require('express');
const router = express.Router();

const rooms_list = require('../room');

router.get('/', (req, res) => {
    res.json(rooms_list);
});

module.exports = router;