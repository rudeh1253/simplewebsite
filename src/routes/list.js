const router = require('express').Router();
const db = require('../db');
const collectionsName = require('../utils/constants').collections;

router.get('/list', (req, resp) => {
    db.findMultipleItemsAsAnArray({ }, collectionsName.post, (err, result) => {
        result.loggedIn = req.user != undefined;
        resp.render('list.ejs', { data: result }); 
    });
});

router.get('/list/:number', (req, resp) => {
    db.findOne({ _id: parseInt(req.params.number) }, collectionsName.post, (err, result) => {
        result.loggedIn = req.user != undefined;
        resp.render('detail.ejs', { data: result });
    });
});

module.exports = router;