var fs = require('fs');
var sqlite3 = require('sqlite3').verbose(),
    TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;

function createDB(filename) {
    var db = new TransactionDatabase(
        new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)
    );

    function mkTables() {
        db.run('CREATE TABLE User (username TEXT, email TEXT, password TEXT, PRIMARY KEY (username))');
        db.run('CREATE TABLE Friendship (a TEXT, b TEXT, rating INTEGER DEFAULT 0, FOREIGN KEY(a) REFERENCES User(username), FOREIGN KEY(b) REFERENCES User(username), PRIMARY KEY (a,b))');
    }

    function addUser(user, cb) {
        if (!user.name || !user.email || !user.password) {
            if (cb) {
                cb({error: 'invalid number of parameters to user'});
            } else {
                throw new Error('invalid number of parameters to user');
            }
        } else {
            var stmt = db.prepare('INSERT INTO User (username, email, password) Values (?, ?, ?)');
            stmt.run(user.name, user.email, user.password, cb);//should make a wrapper function for cb
        }
    }

    var functions = {
        addUser: addUser,
        mkTables: mkTables
    };
    return functions;
};

exports = module.exports = createDB;
