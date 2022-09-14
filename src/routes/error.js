const { errorMessage } = require('../utils/constants');

const app = require('express').Router();

app.get('/error', (req, resp) => {
    const params = {
        loggedIn: req.user != undefined,
        errorMessage: errorMessage[req.query.errorType]
    };
    resp.render('error-page.ejs', { data: params });
});

module.exports = app;