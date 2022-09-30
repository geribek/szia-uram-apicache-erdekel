import express from 'express';
import apicache from 'apicache';
import axios from 'axios';

let app = express();
let cache = apicache.middleware;

// App configuration values
const port = 8000;
const defaultCacheDuration = "10 seconds";
const defaultHost = "https://postman-echo.com";

// Overriding cache duration if available in environment variables (e.g. Docker)
const cacheDuration = typeof process.env.cacheDuration === 'undefined' ? defaultCacheDuration : process.env.cacheDuration;
app.use(cache(cacheDuration));

app.get('/*', (req, res) => {
    console.debug('Processing the request. Cache was not triggered');
    if (req.hostname != "localhost") {
        res.status(401).send("For security reasons, MW only works on localhost.");
    }
    else {
        let requestHostname = req.get('x-request-hostname') == undefined ? defaultHost : req.get('x-request-hostname');
        if (requestHostname == 'undefined') {
            res.status(500).json({ error: "Hey Pajti, you need to pass the target API axiosRequestUrl in the requestHostname GET query axiosRequestUrl. Cheers!" });
        }
        else {
            let axiosRequestUrl = requestHostname + req.originalUrl;
            console.debug('Cache set to ' + cacheDuration + ' for url: ' + axiosRequestUrl + ' at ' + Date.now().toString());
            axios.get(axiosRequestUrl).then((resp) => { res.send(resp.data); }).catch((err)=>{res.status(500).json(err)});
        }
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});