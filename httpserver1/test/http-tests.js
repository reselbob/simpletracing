const supertest = require('supertest');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const {server} = require('../index');


describe('HTTP Tests: ', () => {
    after(async () => {
        await server.close();
        console.log('HTTP 1 Testing Complete');
    });

    it('Can GET against server', async () => {
         const response = await supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200);
         console.log(response.body);
    });

});