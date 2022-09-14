const { renderWithWhetherLogin } = require('../auth/loginchecker');
const db = require('../db');
const { collections } = require('../utils/constants');

const app = require('express').Router();

app.get('/', (req, resp) => {
    const data = {
        data: {
            loggedIn: req.user != undefined
        }
    };
    if (data.data.loggedIn) {
        data.data.todayTODO = [ ];
        data.data.tomorrowTODO = [ ];
        db.findMultipleItemsAsAnArray({ author: req.user.id }, collections.post, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                const today = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                for (let i = 0; i < result.length; i++) {
                    const sDate = new Date(result[i].startDate);
                    if (today.getFullYear() == sDate.getFullYear()
                            && today.getMonth() == sDate.getMonth()
                            && today.getDate() == sDate.getDate()) {
                        data.data.todayTODO.push(result[i]);
                    } else if (tomorrow.getFullYear() == sDate.getFullYear()
                            && tomorrow.getMonth() == sDate.getMonth()
                            && tomorrow.getDate() == sDate.getDate()) {
                        data.data.tomorrowTODO.push(result[i]);
                    }
                }
                resp.render('home.ejs', data);
            }
        });
    } else {
        resp.render('home.ejs', data);
    }
});

module.exports = app;