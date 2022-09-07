const db = require("../db");
const { collections } = require("../utils/constants");

function check(formData, resp, next) {
    const aboutFormat = verifyFormat(formData);
    const aboutAuth = isAuthenticated(formData);
    checkDuplicate(formData, (verifiedData) => {
        if (aboutFormat.validId
                && aboutFormat.validPw
                && aboutAuth.validEmail
                && !verifiedData.id
                && !verifiedData.email) {
            next();
        } else {
            resp.redirect('/signup');// TODO
        }
    });
};

/**
 * Check if the form submitted by an user in the step of sign-up only contains
 * valid for the account principle.
 * 
 * ID: length >= 5 and consists of alphabets or digits. This can't contain space.
 * PW: length >= 8 and must include both charaters and digits.
 * Email: Authenticated.
 * 
 * @param {object} formData to verify. It has to contains all of the data of the form.
 * @returns an object whose each element consists of a pair of key and value where
 *          a key is name of data to be verified and a value is a boolean which is true
 *          in case that the data is valid, otherwise false.
 */
function verifyFormat(formData) {
    const isValidID = formData.id.length >= 5
        && new RegExp('[^a-zA-Z0-9]').exec(formData.id) == null;
    const isValidPW = formData.pw.length >= 8
        && new RegExp('[a-zA-Z]').exec(formData.pw) != null
        && new RegExp('[0-9]').exec(formData.pw) != null;
    return {
        validId: isValidID,
        validPw: isValidPW,
    };
}

/**
 * Check if the email has been authenticated.
 * 
 * @param {*} formData to verify. It has to contains all of the data of the form.
 * @returns an object whose each element consists of a pair of key and value where
 *          a key is name of data to be verified and a value is a boolean which is true
 *          in case that the data is valid, otherwise false.
 */
function isAuthenticated(formData) {
    const isValidEmail = formData.isEmailAuthenticated == 'true';
    return {
        validEmail: isValidEmail
    };
}

/**
 * Check if the data which should be unique are already contained in the database.
 * Must be unique: ID, Email
 * 
 * @param {object} formData to verify. It contains all of the data of the form.
 * @param {function} callback callback method to be executed in case request to the database.
 * @retunrs an object whose each element consists of a pair of key and value where
 *          a key is name of data to be checked and a value is a boolean which is true
 *          in case that the data is revealed that there's any duplicate, otherwise false.
 */
async function checkDuplicate(formData, callback) {
    const inputId = formData.id;
    const inputEmail = formData.email;

    db.findOne({ id: inputId }, collections.login, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            if (result == null) {
                db.findOne({ email: inputEmail }, collections.login, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        let verifiedData;
                        if (result == null) {
                            verifiedData = {
                                id: false,
                                email: false
                            }
                        } else {
                            verifiedData = {
                                id: false,
                                email: true
                            }
                        }
                        callback(verifiedData);
                    }
                });
            } else {
                const verifiedData = {
                    id: inputId == result.id,
                    email: inputEmail == result.email
                }
                callback(verifiedData);
            }
        }
    });
}

const checkMiddleware = (req, resp, next) => {
    check(req.body, resp, next);
}

module.exports = checkMiddleware;