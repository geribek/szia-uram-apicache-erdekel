# szia-uram-apicache-erdekel
This is a small middleware service designed to provide an API cache server run localhost as an intermediate between a client application and a limited end API.

# Usage (locally)
1. Check out the repository
1. Run `npm install` to install dependencies (later to be included in docker image)
1. Run `npm start` to run locally, or `docker-compose up` to run in a docker component
1. Instead of calling your API endpoint, call `http://localhost:8000/` with the target hostname included in the `x-request-hostname` header parameter, and the target path included in the API request path

# Usage example
To query `https://postman-echo.com/get?customParameter=sziauram`, you would need to initiate the following request:
```
curl --location --request GET 'localhost:8000/get?customParameter=sziauram' \
--header 'x-request-hostname: https://postman-echo.com'
```

# Configuration options
Currently, configuration is available in the `index.js` file. Not much, but at least it's there.
