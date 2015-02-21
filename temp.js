var dbGen = require('./db');

var db = new dbGen(':memory:');

db.mkTables();
db.addUser({name: 'bob', password: 'pass', email: 'richardscollin@gatech.edu'},
    function(err) {
        if (err) {
            console.log(err);
        }
    });


