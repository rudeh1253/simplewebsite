const db = require('../db');
const collections = require('../utils/constants').collections;

const verifyFormat = require('./accountformchecker').verifyFormat;
const checkDuplicate = require('./accountformchecker').checkDuplicate;

// Test Strategy: Try every case possible. TODO: test stategy
// Test space:

// Test cases:
// 1. ()
test('verifyFormat', () => {
    const testCase1 = {
        id: 'november',
        pw: 'fjias!'
    };
    const result1 = verifyFormat(testCase1);
    expect(result1).toStrictEqual({ validId: true, validPw: false });

    const testCase2 = {
        id: 'gdo1255',
        pw: 'Fine123'
    };
    const result2 = verifyFormat(testCase2);
    expect(result2).toStrictEqual({ validId: true, validPw: false });

    const testCase3 = {
        id: 'pgd',
        pw: 'abcd1234!'
    };
    const result3 = verifyFormat(testCase3);
    expect(result3).toStrictEqual({ validId: false, validPw: true });

    // const testCase<> = {
    //     id: ,
    //     pw: ,
    //     email:
    // };
    // const result<> = check(testCase<>);
    // expect(result<>).toStrictEqual({ validId: , validPw: , validEmail:  });
});

// Test Cases:
//     - There does not exist any duplicate of them
//     - There exists a duplicate of id
//     - There exists a duplicate of email
//     - There exists duplicates of both
test('checkDuplicate', () => {
    const alreadyInDB = [
        {
            id: 'abcdef',
            email: 'abcdef@gmail.com'
        },
        {
            id: 'computer',
            email: 'calculator@khu.ac.kr'
        }
    ];

    const testCases = [
        {
            id: 'calculator',
            email: 'fedcba@gmail.com'
        },
        {
            id: 'abcdef',
            email: 'abcdef@gmail.com'
        },
        {
            id: 'computer',
            email: 'computer@khu.ac.kr'
        },
        {
            id: 'calculator',
            email: 'calculator@khu.ac.kr'
        }
    ];

    const expected = [
        {
            id: false,
            email: false
        },
        {
            id: true,
            email: true
        },
        {
            id: true,
            email: false
        },
        {
            id: false,
            email: true
        }
    ];
    

    const p = new Promise((resolve, reject) => {
        db.insertMultipleItems(alreadyInDB, collections.login, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(0);
            }
        });
    });

    p.then(times => {
        task(testCases, expected, times);
        db.deleteMulipleItems(alreadyInDB, collections.login);
    }).catch(err => {
        console.error(err);
    });
});

function task(testCases, expected, times) {
    if (times >= testCases) {
        return;
    }

    const result = checkDuplicate(testCases[times], (err, result) => {
        if (err) {
            console.error(err);
        } else{
            task(testCases, expected, times + 1);
        }
    });
    expected(result).toStrictEqual(expect[times]);
}