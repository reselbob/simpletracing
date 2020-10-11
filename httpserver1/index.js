'use strict';

const tracer = require('./tracer')('RandomWordGenUpper');
const rp = require('request-promise-native');
const faker = require('faker');

const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.RANDOM_WORD_GEN_UPPER_PORT || 3000;
const repeaterHost = process.env.REPEATER_HOST || 'localhost';
const repeaterPort = process.env.REPEATER_PORT || 3001;

console.log(`Repeater host and port is ${repeaterHost}:${repeaterPort}`)

const router = express.Router();

app.use('/', router);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    if(err)res.status(500).send(err.message);
})

router.get('/', async function (req, resp) {
    let span = tracer.startSpan('RandomWordGenUpperGET');
    span.addEvent('GETprocessingSTART');

    const data = faker.lorem.words(5).toUpperCase();
    span.setAttribute('DataPostedToRepeater', data);

    const options = {
        method: 'POST',
        uri: `http://${repeaterHost}:${repeaterPort}`,
        body: {data},
        json: true // Automatically stringifies the body to JSON
    };

    const resultData = await rp(options);
    span.addEvent('POSTprocessing END');
    span.setAttribute('ResponseData', resultData);
    span.end();
    resp.json( resultData);
    resp.end();

});

const server = app.listen(port);

console.log(`HttpServer 1 is started on port ${port}`);

module.exports = {server}
