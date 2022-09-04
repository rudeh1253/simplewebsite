const dbName = require('./constants').dbName;

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
        this.mongoClient.connect(this.dbUrl, (error, client) => {
            if (error) {
                console.log(error);
                return;
            }

            this.db = client.db(dbName);

            console.log('connected to MongoDb');
        });
    }

    /**
     * Insert an item into the collection you have specified.
     * 
     * @param {object} item an object to insert into the collection. It should follow the specification of the collection.
     * @param {string} collection where you want to put your item.
     * @param {*} clientCallback which is executed if it is successful to insert it. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     * @returns result of query to db
     */
    insertOne(item, collection, clientCallback) {
        let returnVal;
        this.db.collection(collection).insertOne(item, (err, result) => {
            returnVal = callback(err, result, clientCallback);
        });
        return returnVal;
    }

    /**
     * Insert multiple items into the collection you have specified.
     * 
     * @param {[]} items an array of objects to insert into the collection. It should follow the specification of the collection.
     * @param {string} collection where you want to put your items.
     * @param {*} clientCallback which is executed if it is successful to insert them. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     * @returns result of query to db
     */
    insertMultipleItems(items, collection, clientCallback) {
        let returnVal;
        this.db.collection(collection).insertMany(items, (err, result) => {
            returnVal = callback(err, result, clientCallback);
        });
        return returnVal;
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
     * @returns result of query to db
     */
    findOne(query, collection, clientCallback) {
        let returnVal;
        this.db.collection(collection).findOne(query, (err, result) => {
            returnVal = callback(err, result, clientCallback);
        });
        return returnVal;
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
     * @returns result of query to db
     */
    findMultipleItemsAsAnArray(query, collection, clientCallback) {
        let returnVal;
        this.db.collection(collection).find(query).toArray((err, result) => {
            returnVal = callback(err, result, clientCallback);
        });
        return returnVal;
    }

    /**
     * Delete an item.
     * 
     * @param {object} query a pair (or pairs) of key and value that the item being removed contains.
     * @param {string} collection where the item to be deleted is contained.
     * @param {*} clientCallback which is executed if it is successful to delete it. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     * @return result of query to db
     */
    deleteOne(query, collection, clientCallback) {
        let returnVal;
        this.db.collection(collection).deleteOne(query, (err, result) => {
            returnVal = callback(err, result, clientCallback);
        });
        return returnVal;
    }

    /**
     * Delete multiple items from the collection.
     * 
     * @param {*} query a pair (or pairs) of key and value which the objects to delete from the collection contain.
     *                  It should follow the specification of the collection.
     * @param {*} collection where the items to be deleted is contained.
     * @param {*} callback which is executed if it is successful to delete them. You can set this parameter as undefined or null,
     *                     if you don't want a callback method to be executed.
     * @returns result of query to db
     */
    deleteMulipleItems(query, collection, callback) {
        let returnVal;
        this.db.collection(collection).deleteMany(query, (err, result) => {
            returnVal = callback(err, result, clientCallback);
        });
        return returnVal;
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
     * @return result of query to db
     */
    updateOne(query, to, method, collection, clientCallback) {
        let returnVal;

        if (method) {
            this.db.collection(collection).updateOne(query, { $set: to }, (err, result) => {
                returnVal = callback(err, result, clientCallback);
            });
        } else {
            this.db.collection(collection).updateOne(query, { $inc: to }, (err, result) => {
                returnVal = callback(err, result, clientCallback);
            });
        }
        return returnVal;
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
     * @return result of query to db
     */
    updateMultipleItems(query, to, method, collection, clientCallback) {
        let returnVal;
        if (method) {
            this.db.collection(collection).updateMany(query, { $set: to }, (err, result) => {
                returnVal = callback(err, result, clientCallback);
            });
        } else {
            this.db.collection(collection).updateMany(query, { $inc: to }, (err, result) => {
                returnVal = callback(err, result, clientCallback);
            });
        }
        return returnVal;
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
        return result;
    }
}

db = new DB();
db.init();

module.exports = db;