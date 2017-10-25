var express = require('express');
var router = express.Router();
var database = require('../database')

router.get('/', function(req, res) {
    database.Head.findOne({}, function(err, resp) {
        res.send(resp);
    });
});

router.get('/year', function(req, res) {
    database.Year.find({}, function(err, resp) {
        res.send(resp);
    });
});

module.exports = router;
