const router = require('express').Router();
const db = require('../db');
const { collections, errorType } = require('../utils/constants');

router.get('/list', (req, resp) => {
    let dbQuery = { };
    if (req.query.title != undefined) {
        dbQuery.title = new RegExp(req.query.title);
    } else if (req.query.author != undefined) {
        dbQuery.author = new RegExp(req.query.author);
    }
    db.findMultipleItemsAsAnArray(dbQuery, collections.post, (err, result) => {
        result.loggedIn = req.user != undefined;
        resp.render('list.ejs', { data: result }); 
    });
});

router.get('/list/:number', (req, resp) => {
    db.findOne({ _id: parseInt(req.params.number) }, collections.post, (err, result) => {
        if (result == null) {
            resp.redirect('/error?errorType=' + errorType.postNotExists);
        } else {
            result.loggedIn = req.user != undefined;
            resp.render('detail.ejs', { data: result });
        }
    });
});

module.exports = router;