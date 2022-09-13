const router = require('express').Router();
const db = require('../db');
const { administrator, collections } = require('../utils/constants');

router.delete('/delete/:number', (req, resp) => {
    // db.deleteOne(req.body, collectionsName.post);
    const query = {
        _id: parseInt(req.params.number)
    };
    console.log(collections);
    db.findOne(query, collections.post, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            if (req.user != undefined) {
                if (req.user.id == result.author || req.user.id == administrator) {
                    db.deleteOne(query, collections.post);
                    resp.status(200).send({ message: 'succeeded' });
                } else {
                    resp.status(200).send({ message: 'not_author' });
                }
            } else {
                resp.status(200).send({ message: 'not_author' });
            }
        }
    });
});

module.exports = router;