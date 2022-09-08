const collections = {
    post: 'post',
    postCount: 'postCount',
    login: 'login',
    sessions: 'sessions'
};

exports.collections = collections;

const dbName = 'myapp';

exports.dbName = dbName;

const pbkdf2Iteration = 310000;

exports.pbkdf2Iteration = pbkdf2Iteration;

const pbkdf2Len = 32;

exports.pbkdf2Len = pbkdf2Len;