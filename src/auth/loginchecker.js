const hasLoggedIn = (req, resp, next) => {
    if (req.user) {
        next();
    } else {
        resp.redirect('/login');
    }
}

module.exports = hasLoggedIn;