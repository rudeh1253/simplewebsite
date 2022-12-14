const app = require('express').Router();
const db = require('../db');
const collections = require('../utils/constants').collections;
const crypto = require('crypto');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const { pbkdf2Iteration, pbkdf2Len } = require('../utils/constants');
const check = require('../auth/accountformchecker');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const notLoggedIn = (req, resp, next) => {
    if (!req.user) {
        next();
    } else {
        resp.redirect('/');
    }
}

app.get('/login', notLoggedIn, (req, resp) => {
    const data = {
        data: {
            loggedIn: req.user != undefined
        }
    };
    resp.render('login.ejs', data);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/fail'
}));

app.get('/signup', notLoggedIn, (req, resp) => {
    const data = {
        data: {
            loggedIn: req.user != undefined,
            errorElements: req.query
        }
    };
    resp.render('signup.ejs', data);
});

app.post('/signup', check, (req, resp, next) => {
    const salt = crypto.randomBytes(128).toString('base64');
    crypto.pbkdf2(req.body.pw, salt, pbkdf2Iteration, pbkdf2Len, 'sha256', (err, derivedPassword) => {
        if (err) {
            return next(err);
        }
        const accountData = {
            id: req.body.id,
            pw: derivedPassword,
            salt: salt,
            email: req.body.email
        };
        db.insertOne(accountData, collections.login, (err, result) => {
            if (err) {
                return next(err);
            } else {
                resp.redirect('/'); // TODO Redirect the user to a page of success of sign-up.
            }
        });
    });
});

app.get('/logout', (req, resp, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        } else {
            resp.redirect('/');
        }
    });
});

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false
}, (inputId, inputPw, done) => {
    db.findOne({ id: inputId }, collections.login, (err, result) => {
        if (err) {
            return done(err);
        }
        if (!result) {
            return done(null, false, { message: 'Does not exist such ID' });
        }

        // When storing an encrypted password into MongoDB, it converts the Buffer instance into a Binary instance.
        // So in order to compare the encrypted password in the database with the generated key using the input password,
        // it is needed to convert them such that they are compatible with each other.
        crypto.pbkdf2(inputPw, result.salt, pbkdf2Iteration, pbkdf2Len, 'sha256', (err, hashedPassword) => {
            if (err) {
                return done(err);
            }
            if (result.pw.toString('base64') != hashedPassword.toString('base64')) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, result);
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((inputId, done) => {
    db.findOne({ id: inputId }, collections.login, (err, result) => {
        done(null, result);
    });
});

module.exports = app;