# HTTP SERVER 1Creates a random word that get passed onto a downstream URL for repeating.# Environment Variables

## HTTP SERVER 1 `PORT``SERVER_ONE_PORT` defaults to `3000`

Change the value of `SEVER_ONE_PORT` when you want the application to run on a on a port other than the default.
## Downstream Environment Variables`REPEATER_HOST` defaults to `localhost`

`REPEATER_HOST` declares the location of the downstream server that repeats the string passed by HTTP SERVER 1. 

`REPEATER_PORT` defaults to `3001`

`REPEATER_HOST` declares the on which the downstream server runs.
## Installation`npm install``node index.js`

## `curl` Example

This example assumes that HTTP SERVER 1 is up and running on host, `localhost` on default port `3000`.

Also, the example assumes that the repeater HTTP SERVER 2 is up and running on host, `localhost` on default port `3001`.


```
curl localhost:3000
```

**Response*:**

`["CONSECTETUR UT UT QUO INVENTORE","CONSECTETUR UT UT QUO INVENTORE","CONSECTETUR UT UT QUO INVENTORE"]`