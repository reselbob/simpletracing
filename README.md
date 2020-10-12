# simpletracing

The purpose of this project to provide an example application that demonstrates the basics of OpenTelemetry. The project provides an example for creating a simple trace with spans among HTTP requests between two servers.

The demonstration project is made up of two HTTP servers, HTTP SERVER 1 and HTTP SERVER 2. HTTP SERVER 1 creates a random string that gets passed down stream as an HTTP `POST` request to HTTP SERVER 2. HTTP SERVER 2 repeats the randon string and pass the result back as a response to HTTP SERVER 1.

The string is repeated according to the HTTP SERVER 2 environment variable, `REPEATER_REPEATS`. If the environment variable `REPEATER_REPEATS` is **not** set, the server process, the number of repeats will be `3`, the default value as defined [here](./httpserver2/readme.md).

## Working with Tracing

This example application uses OpenTelemetry to implement tracing. Also, the application uses the [`Jaeger all-in-one`](https://www.jaegertracing.io/docs/1.19/getting-started/#all-in-one) executable to collect the trace informatoin.

The application uses OpenTelementy's default request/response tracing. In addition, the application implements custom `spans` to report the contents of the various HTTP requests and responses instigates by HTTP SERVER 1 and HTTP SERVER 2.

Once the application is up and running, you can view the Jeager UI on port `16686`.

If you are not running the application under Docker Compose, make sure that the Jaeger executable is running as a Docker container. To run Jaeger as a Docker container, invoke the following command:

```bash
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 14250:14250 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.19

```


# Getting the demonstration up and running

If you are not on Katacoda go here:

`https://katacoda.com/courses/ubuntu/playground`

Get the code from GitHub:

`git clone https://github.com/reselbob/simpletracing.git`

`cd simpletracing/`


# Running Under Docker Compose
This application run under Docker Compose.

To get the application up and running under Docker Compose execute the following command from the project's root directory:

`docker-compose up`

To stop the application and remove the docker images created according to the Docker Compose [file](./docker-compose.yaml) execute the following command:

`docker-compose down --rmi all`

You can view the example Docker-Compose that ships with the code [here](./docker-compose.yaml).


