const { errorMessages } = require('../utils/constants');

const app = require('express').Router();

app.get('/error', (req, resp) => {
    const params = {
        loggedIn: req.user != undefined,
        errorMessage: errorMessages[req.query.errorType]
    };
    console.log(params);
    resp.render('error-page.ejs', { data: params });
});

module.exports = app;