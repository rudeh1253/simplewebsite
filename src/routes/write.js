const db = require('../db');
const { hasLoggedIn } = require('../auth/loginchecker');
const collections = require('../utils/constants').collections;

const app = require('express').Router();

app.get('/write', hasLoggedIn, (req, resp) => {
    const data = {
        data: {
            loggedIn: req.user != undefined
        }
    };
    resp.render('write.ejs', data);
});

app.post('/write', (req, resp) => {
    db.findOne({ name: 'count' }, collections.postCount, (err, result) => {
        const reqData = {
            _id: result.count + 1,
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            author: req.user.id
        };
        db.insertOne(reqData, collections.post);
        db.updateOne({ name: 'count' }, { count: 1 }, false, collections.postCount);
    });

    resp.redirect('/write');
});

module.exports = app;