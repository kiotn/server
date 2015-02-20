var supertest = require('supertest');
require('should');

var app = require('../app');

describe('CHECK API', function () {
    it('GET /', function (done) {
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
});

