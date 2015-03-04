var express = require('express');
var router = express.Router();

var db = require('../db')('db/test.db');

var successObject = { status: 'success' };

/* Routes for User*/
router.get('/', function(req, res, next) {
    res.json(successObject);
});

router.post('/', function(req, res, next) {
    var user = {
        email: req.body.email,
        name:req.body.name,
        password: req.body.password
    };
    db.addUser(user, function(err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(successObject);
        }
    });
});

module.exports = router;
