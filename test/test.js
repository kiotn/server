var supertest = require('supertest');
require('should');

var app = require('../app');

describe('CHECK API', function () {
    it('get a user', function (done) {
        supertest(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                res.status.should.equal(200);
                done();
            });
    });

    it('post a user', function (done) {
        var userObj = {
            email: "richardscollin@gatech.edu",
            name: 'collin',
            password: "hunter2"
        };
        supertest(app)
            .post('/users')
            .send(userObj)
            .expect(200, JSON.stringify(userObj))
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    //res.status.should.equal(200);
                    done();
                }
            });
    });
});

