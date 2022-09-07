const dbName = require('./utils/constants').dbName;

require('dotenv').config();

var db;

/**
 * Class of support for manipulating DB.
 * Only one Database is accessible
 */
class DB {
    /**
     * Constructor.
     */
    constructor() {
        this.mongoClient = require('mongodb').MongoClient;
        this.dbUrl = process.env.DB_URL;
        this.db = null;
    }

    /**
     * Initialize this DB.
     */
    init() {
        const p = new Promise((resolve, reject) => {
            this.mongoClient.connect(this.dbUrl, (error, client) => {
                if (error) {
                    reject(error);
                } else {
                    this.db = client.db(dbName);
                    resolve('connected to MongoDB');
                }
            });
        });
        p.then(msg => console.log(msg)).catch(err => console.error(err));
    }

    /**
     * Insert an item into the collection you have specified.
     * 
     * @param {object} item an object to insert into the collection. It should follow the specification of the collection.
     * @param {string} collection where you want to put your item.
     * @param {*} clientCallback which is executed if it is successful to insert it. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     */
    insertOne(item, collection, clientCallback) {
        this.db.collection(collection).insertOne(item, (err, result) => {
            callback(err, result, clientCallback);
        });
    }

    /**
     * Insert multiple items into the collection you have specified.
     * 
     * @param {[]} items an array of objects to insert into the collection. It should follow the specification of the collection.
     * @param {string} collection where you want to put your items.
     * @param {*} clientCallback which is executed if it is successful to insert them. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     */
    insertMultipleItems(items, collection, clientCallback) {
        this.db.collection(collection).insertMany(items, (err, result) => {
            callback(err, result, clientCallback);
        });
    }

    /**
     * Find and return an object you are finding. If it was successful to find you want,
     * the callback function is executed. If the callback function wasn't set(i.e., callback == null or callback == undefined),
     * any callback function is not executed.
     * 
     * @param {object} query a pair (or pairs) of key and value that the itclientCallbackem you're finding contains.
     * @param {string} collection where you are finding the item from
     * @param {*} clientCallback which is executed if it is successful to find it. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     */
    findOne(query, collection, clientCallback) {
        this.db.collection(collection).findOne(query, (err, result) => {
            callback(err, result, clientCallback);
        });
    }

    /**
     * Find objects you are finding and return an array containing them. If it was successful to find them,
     * the callback function is executed. If the callback function wasn't set(i.e., callback == null or callback == undefined),
     * any callback function is not executed.
     * 
     * @param {*} query a pair (or pairs) of key and value that the items you're finding contain.
     * @param {string} collection where you are finding from
     * @param {*} clientCallback which is executed if it is successful to find it. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     */
    findMultipleItemsAsAnArray(query, collection, clientCallback) {
        this.db.collection(collection).find(query).toArray((err, result) => {
            callback(err, result, clientCallback);
        });
    }

    /**
     * Delete an item.
     * 
     * @param {object} query a pair (or pairs) of key and value that the item being removed contains.
     * @param {string} collection where the item to be deleted is contained.
     * @param {*} clientCallback which is executed if it is successful to delete it. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     */
    deleteOne(query, collection, clientCallback) {
        this.db.collection(collection).deleteOne(query, (err, result) => {
            callback(err, result, clientCallback);
        });
    }

    /**
     * Delete multiple items from the collection.
     * 
     * @param {*} query a pair (or pairs) of key and value which the objects to delete from the collection contain.
     *                  It should follow the specification of the collection.
     * @param {*} collection where the items to be deleted is contained.
     * @param {*} callback which is executed if it is successful to delete them. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     */
    deleteMulipleItems(query, collection, callback) {
        this.db.collection(collection).deleteMany(query, (err, result) => {
            callback(err, result, clientCallback);
        });
    }

    /**
     * Update an item.
     * 
     * @param {object} query a pair (or pairs) of key and value which the object to update in the collection contains.
     *                  It should follow the specification of the collection.
     * @param {object} to if set is true, the item is set with this value, otherwise the item increases as much as to
     * @param {boolean} method if true, $set operation, otherwise $inc operation
     * @param {*} collection where the item to be updated is contained.
     * @param {*} clientCallback which is executed if it is successful to update it. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     */
    updateOne(query, to, method, collection, clientCallback) {
        if (method) {
            this.db.collection(collection).updateOne(query, { $set: to }, (err, result) => {
                callback(err, result, clientCallback);
            });
        } else {
            this.db.collection(collection).updateOne(query, { $inc: to }, (err, result) => {
                callback(err, result, clientCallback);
            });
        }
    }

    /**
     * Update every item that meets the criteria of the query.
     * 
     * @param {object} query a pair (or pairs) of key and value which the object to update in the collection contains.
     *                  It should follow the specification of the collection.
     * @param {object} to if set is true, the item is set with this value, otherwise the item increases as much as to
     * @param {boolean} method if true, $set operation, otherwise $inc operation
     * @param {*} collection where the item to be updated is contained.
     * @param {*} clientCallback which is executed if it is successful to update it. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     */
    updateMultipleItems(query, to, method, collection, clientCallback) {
        if (method) {
            this.db.collection(collection).updateMany(query, { $set: to }, (err, result) => {
                callback(err, result, clientCallback);
            });
        } else {
            this.db.collection(collection).updateMany(query, { $inc: to }, (err, result) => {
                callback(err, result, clientCallback);
            });
        }
    }
}

function callback(err, result, clientCallback) {
    if (err) {
        console.log(err);
        throw err;
    } else {
        if (clientCallback != null && clientCallback != undefined) {
            clientCallback(err, result);
        }
    }
}

if (db == undefined || db == null) {
    db = new DB();
    db.init();
}

module.exports = db;