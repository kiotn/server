var db = require('../db'),
    fs = require('fs'),
    assert = require('assert');

describe('Database Suite', function () {

    describe('Create DB:', function () {
        var dbFile = 'my-test.db';
        it('create an empty file', function (done) {
            db(dbFile, function(err) {
                if (err) done(err);
                assert(fs.lstatSync(dbFile).isFile());
                done();
            });
        });
        after(function(){
            fs.unlinkSync(dbFile);
        });
    });

    describe('', function () {
        var api;
        var dbFile = ':memory:';
        before(function(done){
            api = db(dbFile);
            api.mkTables(done);
        });
    });

    describe('User:', function () {
        var api;
        var dbFile = ':memory:';
        before(function(done){
            api = db(dbFile);
            api.mkTables(done);
        });

        it('Add a new user', function(done){
            api.addUser({name:'Collin',
                email: 'c@ni.com',
                password: 'hunter2',
            }, done);
        });

        it('Disallow adding repeated user', function(done){
            api.addUser({
                name:'Collin',
                email: 'c@ni.com',
                password: 'hunter2',
            }, function(err) {
                if (err) {
                    done();
                } else {
                    done(new Error('Allowed repeated user.'));
                }
            });
        });

        it('Disallow missing parameters', function(done){
            api.addUser({
                email: 'c@ni.com',
                password: 'hunter2',
            }, function(err) {
                if (err) {
                    done();
                } else {
                    done(new Error('Allowed missing parameters.'));
                }
            });
        });

        it('Retrieve a user in db', function(done){
            api.getUser('Collin', function(err, user){
                if (err) done(err);
                assert.equal(JSON.stringify({name: 'Collin', email: 'c@ni.com'}),
                        JSON.stringify(user));
                done();
            });
        });

        it('Retrieve a user not in db', function(done){
            api.getUser('Bob', function(err, user){
                if (err) done(err);
                assert.equal(undefined, user);
                done();
            });
        });

        it('Remove a user in db', function(done){
            api.removeUser('Collin', function(err) {
                if (err) done(err);

                api.getUser('Collin', function(err, user){
                    if (err) done(err);
                    assert.equal(undefined, user);
                    done();
                });
            });
        });

        it('Remove a user not in db', function(done){
            api.removeUser('Bob', function(err) {
                if (err) done(err);

                api.getUser('Bob', function(err, user){
                    if (err) done(err);
                    assert.equal(undefined, user);
                    done();
                });
            });
        });

    });
});
