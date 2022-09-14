const db = require('../db');
const { collections } = require('../utils/constants');

const app = require('express').Router();

app.put('/checkchange/:number', (req, resp) => {
    db.updateOne({ _id: parseInt(req.params.number) }, { done: req.query.to == 'true' }, true, collections.post, (err, result) => {
        console.log(result);
        if (err) {
            resp.status(500).send({ message: 'fail' });
        } else {
            resp.status(200).send({ message: 'succeeded' });
        }
    });
});

module.exports = app;