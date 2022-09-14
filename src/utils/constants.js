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

const errorType = {
    postNotExists: 'postNotExists',
    notAuthorized: 'notAuthorized',
    unknownError: 'unknownError'
};

const errorMessage = {
    postNotExists: '요청한 포스트가 없습니다',
    notAuthorized: '권한이 없습니다',
    unknownError: '원인을 알 수 없는 오류가 발생했습니다.'
};

exports.errorType = errorType;
exports.errorMessage = errorMessage;

const adminAccount = "admin138y18fqef";

exports.adminAccount = adminAccount;