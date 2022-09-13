const router = require('express').Router();
const db = require('../db');
const { errorTypes, collections } = require('../utils/constants');

router.get('/list', (req, resp) => {
    db.findMultipleItemsAsAnArray({ }, collections.post, (err, result) => {
        result.loggedIn = req.user != undefined;
        resp.render('list.ejs', { data: result }); 
    });
});

router.get('/list/:number', (req, resp) => {
    db.findOne({ _id: parseInt(req.params.number) }, collections.post, (err, result) => {
        if (result == null) {
            resp.redirect('/error?errorType=' + errorTypes.notExistenceOfPost);
        } else {
            result.loggedIn = req.user != undefined;
            resp.render('detail.ejs', { data: result });
        }
    });
});

module.exports = router;