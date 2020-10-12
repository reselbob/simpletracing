# HTTP SERVER 2The purpose of this application is to repeat a string passed to the server via an HTTP `POST` verb against the server root, `/`.
## Environment Variables`REPEATER_PORT` defaults to `3001``REPEATER_REPEATS` defaults to `3`## Installation`npm install``node index.js`

## `curl` Example

```
curl -X POST -H "Content-Type: application/json" \
    -d '{"data": "This is cool"}' \
    localhost:3001
```

**Response*:**

`["This is cool","This is cool","This is cool"]`