'use strict';

const tracer = require('./tracer')('RandomWordsRepeater');
// eslint-disable-next-line import/order

// call the packages we need
const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.RANDOM_WORD_REPEATER_PORT || 3001;

const router = express.Router();

app.use('/', router);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  if(err)res.status(500).send(err.message);
})

router.post('/', function (req, resp) {
  let span = tracer.startSpan('RandomWordsRepeaterPOST');
  span.setAttribute('RequestData', req.body.data);
  span.addEvent('POST processing START');
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(req.body.data)
  }
  span.addEvent('POST processing END');
  span.setAttribute('ResponseData', arr);
  span.end();
  resp.json(arr);
  resp.end();

});

const server = app.listen(port);

console.log(`HttpServer 2 is started on port ${port}`);

module.exports = {server}
