const express = require('express');
const { Binary } = require('mongodb');
const { dbName } = require('./constants');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('connected 8080...');
    // exp();
});

app.use('/public', express.static('public'));

app.use('/', require('./routes/home'));
app.use('/', require('./routes/write'));
app.use('/', require('./routes/list'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/delete'));
app.use('/', require('./routes/mypage'));

// function exp() {
//     const crypto = require('crypto');
//     const salt = crypto.randomBytes(256).toString('base64');
//     const password = 'ab1t1aaais!@#';

//     // const db = require('./db');
//     const mongoClient = require('mongodb').MongoClient;
//     const dbUrl = process.env.DB_URL;
//     var db = null;
//     mongoClient.connect(dbUrl, (error, client) => {
//         db = client.db(dbName);

//         console.log('connected to MongoDB');

//         crypto.pbkdf2(password, salt, 320000, 32, 'sha256', (err, derivedPassword1) => {
//             // const passwordForDB = derivedPassword1.toString('base64');
//             // console.log(passwordForDB);
//             // console.log(derivedPassword1.toString('base64'));
//             db.collection('login').insertOne({ name: 'b', pw: derivedPassword1, salt: salt }, (err, result) => {
//                 db.collection('login').findOne({ name: 'b' }, (err, result2) => {
//                     db.collection('login').deleteOne({ name: 'b' }, 'login', (err, result3) => {
//                         crypto.pbkdf2(password, result2.salt, 320000, 32, 'sha256', (err, derivedPassword2) => {
//                             console.log(result2.pw.toString('base64'));
//                             console.log(derivedPassword2.toString('base64'));
//                             if (result2.pw.toString('base64') == derivedPassword2.toString('base64')) {
//                                 console.log('a');
//                             } else {
//                                 console.log('b');
//                             }
//                         });
//                     });
//                 });
//             });
//         });
//     });
// }