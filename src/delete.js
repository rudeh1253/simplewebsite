const router = require('express').Router();
const db = require('./db');
const collectionsName = require('./constants').collections;

router.delete('/delete/:number', (req, resp) => {
    // db.deleteOne(req.body, collectionsName.post);
    const query = {
        _id: parseInt(req.params.number)
    };
    db.deleteOne(query, collectionsName.post);
    resp.status(200).send({ message: 'succeeded' });
});

module.exports = router;