const http = require('http');
const initTracer = require('./tracer').initTracer;
const faker = require('faker');

const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

const tracer = initTracer('http_example');

const port = process.env.APP_PORT || 3000;
let parentSpanContext;

const handleRequest = async (request, response)  => {
    parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, request.headers)
    const span = tracer.startSpan('http_server', {
        childOf: parentSpanContext,
        tags: {[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER}
    });

    const dt = new Date().toString();
    span.log({
        'event': 'call_service',
        'value': 'simple_tracing',
        'date': dt
    });

    const obj = {message: `${faker.lorem.words(10)}`, created: new Date()}
    doNuttyStuffSync(span);
    await response.setHeader("Content-Type", "application/json");
    await response.writeHead(200);
    await response.end(JSON.stringify(obj));
    span.finish();
};

const doNuttyStuffSync = (parentSpan) =>{
    const span = tracer.startSpan('nutty_stuff', {
        childOf: parentSpan,
        tags: {[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER}
    });

    for(i=0;i<10;i++){
        const str = faker.lorem.words(5);
        console.log(str);
        span.setTag('nutty', i);
        span.log({'event': 'nutty_stuff', 'value': str});
    }

    span.finish();
}

const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`HTTP Server is listening on port ${port}`);
});


const shutdown = (signal) => {
    const span = tracer.startSpan('http_server', {
        childOf: parentSpanContext,
        tags: {[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER}
    });

    span.log({
        'event': 'shut_down',
        'value': 'simple_tracing'
    });

    if(!signal){
        console.log(`HTTP Server shutting down at ${new Date()}`);
    }else{
        console.log(`Signal ${signal} : HTTP Server shutting down at ${new Date()}`);
    }
    server.close(function () {
        process.exit(0);
    })
    span.finish();
};
process.on('SIGTERM', function () {
    shutdown('SIGTERM');
});

process.on('SIGINT', function () {
    shutdown('SIGINT');
});

module.exports = {server,shutdown};
