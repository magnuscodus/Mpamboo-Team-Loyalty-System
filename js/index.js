require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

app.get('/auth', (req, res) => {
    res.redirect(
        `https://open.trovo.live/page/login.html?client_id=${process.env.TROVO_CLIENT_ID}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}&redirect_uri=${process.env.REDIRECT_URI}`,
    );
});

app.get('/oauth-callback', ({
    query: {
        code
    }
}, res) => {
    const body = {
        client_id: process.env.TROVO_CLIENT_ID,
        response_type: process.env.RESPONSE_TYPE,
        scope: process.env.SCOPE,
        redirect_uri: process.env.REDIRECT_URI,
        state: process.env.STATE,
        code,
    };
    const opts = {
        headers: {
            accept: 'application/json'
        }
    };
    axios
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data.access_token)
        .then((token) => {
            // eslint-disable-next-line no-console
            console.log('My token:', token);

            res.redirect(`/?token=${token}`);
        })
        .catch((err) => res.status(500).json({
            err: err.message
        }));
});

app.listen(5500);
// eslint-disable-next-line no-console
console.log('App listening on port 5500');