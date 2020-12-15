var express = require('express');
var router = express.Router();
var Data = require('../models/chatdata')

// get chat
router.get('/', function(req, res, next) {
  Data.find({}, (err, doks) => {
    res.status(200).json(doks)
  })
});

// add chat
router.post('/', function (req, res, next) {
  const { id, name, chats} = req.body;
  Data.create({id, name, chats}, function(err, doks) {
    res.status(201).json(doks);
  })
});

// delete chat
router.delete('/:id', function (req, res, next) {
  Data.findOneAndRemove({id: Number(req.params.id)}, function(err, doks){
    res.status(201).json(doks)
  })
});

module.exports = router;
