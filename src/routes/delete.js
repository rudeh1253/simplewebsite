const router = require('express').Router();
const db = require('../db');
const { collections, adminAccount } = require('../utils/constants');

router.delete('/delete/:number', (req, resp) => {
    // db.deleteOne(req.body, collectionsName.post);
    const query = {
        _id: parseInt(req.params.number)
    };
    db.findOne(query, collections.post, (err, result) => {
        if (req.user != undefined && req.user != null) {
            if (result.author == req.user.id || req.user.id == adminAccount) {
                db.deleteOne(query, collections.post, (err, result) => {
                    resp.status(200).send({ message: 'succeeded' });
                });
            } else {
                resp.status(200).send({ message: 'not_author' });
            }
        } else {
            resp.status(200).send({ message: 'not_author' });
        }
    });
});

module.exports = router;