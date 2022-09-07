const router = require('express').Router();
const db = require('../db');
const collectionsName = require('../utils/constants').collections;

router.get('/list', (req, resp) => {
    db.findMultipleItemsAsAnArray({ }, collectionsName.post, (err, result) => {
        resp.render('list.ejs', { posts: result }); 
    });
});

router.get('/list/:number', (req, resp) => {
    db.findOne({ _id: parseInt(req.params.number) }, collectionsName.post, (err, result) => {
        resp.render('detail.ejs', { dat: result });
    });
});

module.exports = router;