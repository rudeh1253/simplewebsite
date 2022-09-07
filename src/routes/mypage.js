const app = require('express').Router();
const collections = require('../utils/constants').collections;
const db = require('../db');
const hasLoggedIn = require('../auth/loginchecker');

app.get('/mypage', hasLoggedIn, (req, resp) => {
    console.log('mypage: ', req.user);
    db.findOne({ id: req.user.id }, collections.login, (err, result) => {
        resp.render('mypage.ejs', { data: result });
    });
});


module.exports = app;