const { hasLoggedIn } = require('../auth/loginchecker');
const db = require('../db');
const { collections, errorType, adminAccount } = require('../utils/constants');

const app = require('express').Router();

app.get('/edit/:number', hasLoggedIn, (req, resp) => {
    db.findOne({ _id: parseInt(req.params.number) }, collections.post, (err, result) => {
        if (err) {
            console.error(err);
        } else if (result == null) {
            resp.redirect('/error?errorType=' + errorType.postNotExists);
        } else {
            if (req.user != undefined && req.user != null) {
                if (result.author == req.user.id || req.user.id == adminAccount) {
                    const params = { data: result };
                    params.data.mode = 'edit';
                    resp.render('write.ejs', params);
                } else {
                    resp.redirect('/error?errorType=' + errorType.notAuthorized);
                }
            } else {
                resp.redirect('/error?errorType=' + errorType.notAuthorized);
            }
        }
    });
});

app.put('/edit/:number', (req, resp) => {
    console.log(JSON.stringify(req.query));

    const lastModified = new Date(Date.now());
    const to = {
        title: req.query.title,
        description: req.query.description,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        done: req.query.done == 'true',
        lastModified: lastModified.getFullYear() + '-'
            + ((lastModified.getMonth() + 1) / 10 + 0.01).toString().replace('.', '').substring(0, 2) + '-'
            + (lastModified.getDate() / 10 + 0.01).toString().replace('.', '').substring(0, 2)+ 'T'
            + (lastModified.getHours() / 10 + 0.01).toString().replace('.', '').substring(0, 2) + ':'
            + (lastModified.getMinutes() / 10 + 0.01).toString().replace('.', '').substring(0, 2) + ':'
            + (lastModified.getSeconds() / 10 + 0.01).toString().replace('.', '').substring(0, 2)
    }
    db.updateOne({ _id: parseInt(req.params.number) }, to, true, collections.post, (err, result) => {
        if (err) {
            resp.status(500).send({ message: 'fail' });
            console.error(err);
        } else {
            resp.status(200).send({ message: 'succeeded' })
        }
    });
})

module.exports = app;