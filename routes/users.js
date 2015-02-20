var express = require('express');
var router = express.Router();

/* TODO make this in the right scope*/
var successObject = { status: 'success' };

/* Routes for User*/
router.get('/', function(req, res, next) {
    res.json(successObject);
});

router.post('/', function(req, res, next) {
    /*
    create-user({
        username: res.body.name,
        password: res.body.password,
        email: res.body.email
    }, function(err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(successObject);
        }
    });
    */
    res.json({
        username: res.body.name,
        password: res.body.password,
        email: res.body.email
    });
});

module.exports = router;
