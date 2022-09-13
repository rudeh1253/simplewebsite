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

const administrator = 'admin1413081364012';

exports.administrator = administrator;

const errorTypes = {
    notExistenceOfPost: 'notExistenceOfPost'
};

exports.errorTypes = errorTypes;

const errorMessages = {
    notExistenceOfPost: '요청된 포스트가 없습니다.'
};

exports.errorMessages = errorMessages;