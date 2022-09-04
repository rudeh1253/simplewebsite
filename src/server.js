const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('connected 8080...');
});

app.use('/public', express.static('public'));

app.get('/', require('./home'));
app.use('/', require('./write'));
app.use('/', require('./list'));
app.use('/', require('./account'));
app.use('/', require('./delete'));