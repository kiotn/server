var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

function createDB(filename, cb) {
  var db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE |
      sqlite3.OPEN_CREATE, cb);

  function mkTables(cb) {
    db.run('CREATE TABLE IF NOT EXISTS User ' +
        '(username TEXT, email TEXT, password TEXT, PRIMARY KEY (username))',
        mkFriendshipTable);
    function mkFriendshipTable(err) {
      if (err) {
        cb(err);
      } else {
        db.run('CREATE TABLE IF NOT EXISTS Friendship ' +
            '(a TEXT, b TEXT, rating INTEGER DEFAULT 0, ' +
              'FOREIGN KEY(a) REFERENCES User(username), FOREIGN KEY(b)' +
              'REFERENCES User(username), PRIMARY KEY (a,b))',
            function () {
              if (err) {
                cb(err);
              } else {
                cb(); //success by calling cb with no params
              }
            });
      }
    }
  }

  /* in callback function this.lastID is last id*/
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

  function removeUser(username, cb) {
    if (username === "") {
      cb(new Error('Empty name is not allowed.'));
    }
    db.run('DELETE FROM User WHERE username = ?', username, cb);
  }

  /*
   * The callback passed into this funtion will be called.
   *
   */
  function getUser(username, cb) {
    if (username === "") {
      cb(new Error('Empty name is not allowed.'));
    }
    db.get('SELECT username, email FROM User WHERE username = ?', username, function(err, row) {
      if(err) {
        cb(err);
      } else {
        var user;
        if (row && row.username && row.email) {
          user = {name: row.username, email: row.email};
        }
        cb(null, user);
      }
    });
  }

  var functions = {
    addUser: addUser,
    getUser: getUser,
    removeUser: removeUser,
    mkTables: mkTables
  };
  return functions;
};

exports = module.exports = createDB;
