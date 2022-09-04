const app = require('express').Router();
const db = require('../db');
const hasLoggedIn = require('./auth').hasLoggedIn;

app.get('/mypage', hasLoggedIn, (req, resp) => {
    console.log('mypage: ', req.user);
    resp.render('mypage.ejs', {});
})

module.exports = app;