const app = require('express').Router();

app.get('/', (req, resp) => {
    resp.render('index.ejs');
});

module.exports = app;