const db = require('../db');
const { hasLoggedIn } = require('../auth/loginchecker');
const collections = require('../utils/constants').collections;

const app = require('express').Router();

app.get('/write', hasLoggedIn, (req, resp) => {
    const today = new Date(Date.now())
    const todayFormat = today.getFullYear() + '-'
        + ((today.getMonth() + 1) / 10 + 0.01).toString().replace('.', '').substring(0, 2) + '-'
        + (today.getDate() / 10 + 0.01).toString().replace('.', '').substring(0, 2);
    const data = {
        data: {
            loggedIn: req.user != undefined,
            mode: 'write',
            title: '',
            description: '',
            startDate: todayFormat,
            endDate: todayFormat,
            done: false
        }
    };
    resp.render('write.ejs', data);
});

app.post('/write', (req, resp) => {
    db.findOne({ name: 'count' }, collections.postCount, (err, result) => {
        const lastModified = new Date(Date.now());
        const reqData = {
            _id: result.count + 1,
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            done: req.body.done != null,
            author: req.user.id,
            lastModified: lastModified.getFullYear() + '-'
                + ((lastModified.getMonth() + 1) / 10 + 0.01).toString().replace('.', '').substring(0, 2) + '-'
                + (lastModified.getDate() / 10 + 0.01).toString().replace('.', '').substring(0, 2)+ 'T'
                + (lastModified.getHours() / 10 + 0.01).toString().replace('.', '').substring(0, 2) + ':'
                + (lastModified.getMinutes() / 10 + 0.01).toString().replace('.', '').substring(0, 2) + ':'
                + (lastModified.getSeconds() / 10 + 0.01).toString().replace('.', '').substring(0, 2)
        };
        db.insertOne(reqData, collections.post);
        db.updateOne({ name: 'count' }, { count: 1 }, false, collections.postCount);
    });

    resp.redirect('/write');
});

module.exports = app;