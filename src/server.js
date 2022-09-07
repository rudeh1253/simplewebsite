const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('connected 8080...');
});

app.use('/public', express.static('public'));

app.use('/', require('./routes/home'));
app.use('/', require('./routes/write'));
app.use('/', require('./routes/list'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/delete'));
app.use('/', require('./routes/mypage'));
app.use('/', require('./routes/sendmail'));