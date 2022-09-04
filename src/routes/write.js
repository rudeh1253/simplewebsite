const db = require('../db');
const collections = require('../constants').collections;

const app = require('express').Router();

app.get('/write', (req, resp) => {
    resp.render('write.ejs');
});

app.post('/write', async (req, resp) => {
    db.findOne({ name: 'count' }, collections.postCount, (err, result) => {
        const reqData = {
            _id: result.count + 1,
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };
        db.insertOne(reqData, collections.post);
        db.updateOne({ name: 'count' }, { count: 1 }, false, collections.postCount);
    });

    resp.redirect('/write');
});

module.exports = app;