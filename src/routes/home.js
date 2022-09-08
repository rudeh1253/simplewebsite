const { renderWithWhetherLogin } = require('../auth/loginchecker');

const app = require('express').Router();

app.get('/', (req, resp) => {
    const data = {
        data: {
            loggedIn: req.user != undefined
        }
    };
    resp.render('home.ejs', data);
});

module.exports = app;