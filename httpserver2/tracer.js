'use strict';

const opentelemetry = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

//const jaegerHostName = process.env.JAEGER_HOST_NAME || 'jaeger';

module.exports = (serviceName) => {
  const provider = new NodeTracerProvider();

  const options = {
    serviceName: serviceName
  }

  console.log(options);
  const  exporter = new JaegerExporter(options);
 

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  return opentelemetry.trace.getTracer(`${serviceName}Tracer`);
};