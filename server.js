const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('connected 8080...');
});

app.use('/public', express.static('public'));

app.use('/', require('./src/routes/auth'));
app.use('/', require('./src/routes/home'));
app.use('/', require('./src/routes/write'));
app.use('/', require('./src/routes/list'));
app.use('/', require('./src/routes/delete'));
app.use('/', require('./src/routes/mypage'));
app.use('/', require('./src/routes/sendmail'));
app.use('/', require('./src/routes/error'));
app.use('/', require('./src/routes/checkchange'));
app.use('/', require('./src/routes/edit.js'));