'use strict';

const tracer = require('./tracer')('RandomWordGenUpper');
// eslint-disable-next-line import/order
const http = require('http');
const faker = require('faker');
const port = process.env.RANDOM_WORD_GEN_UPPER_PORT || 3000;
/** Starts a HTTP server that receives requests on sample server port. */
function startServer(port) {
  // Creates a server
  const server = http.createServer(handleRequest);
  // Starts the server
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Node HTTP listening on ${port}`);
  });
}

/** A function which handles requests and send response. */
function handleRequest(request, response) {
  const currentSpan = tracer.getCurrentSpan();
  // display traceid in the terminal
  console.log(`traceid: ${currentSpan.context().traceId}`);
  const span = tracer.startSpan('handleRequest', {
    parent: currentSpan,
    kind: 1, // server
    attributes: { key: 'value' },
  });
  // Annotate our span to capture metadata about the operation
  span.addEvent('invoking handleRequest');
  span.addEvent("message", "Hi There");
  span.end();
  try {
    const body = [];
    request.on('error', (err) => console.log(err));
    request.on('data', (chunk) => body.push(chunk));
    request.on('end', () => {
      // deliberately sleeping to mock some action.
      setTimeout(() => {
        const str = faker.lorem.words(5).toUpperCase();
        response.end(str);
      }, 1000);
    });
  } catch (err) {
    console.error(err);
    span.end();
  }
}

startServer(port);
