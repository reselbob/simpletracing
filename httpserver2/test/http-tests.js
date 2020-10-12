const supertest = require('supertest');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const {server} = require('../index');


describe('HTTP Tests: ', () => {
    after(async () => {
        await server.close();
        console.log('HTTP 2 Testing Complete');
    });


    it('can POST to HTTP Server', async () => {
        const data =  'bubbles'
        const obj = {data};
        //Go get all the lists
       const res =  await supertest(server)
            .post('/')
            .set('Accept', 'application/json')
            .send(obj)
            .expect(200);
        const result = JSON.parse(res.text);
        expect(result).to.be.an('array');
        result.forEach( item => {
            expect(item).to.equal(data);
        })
    });

});