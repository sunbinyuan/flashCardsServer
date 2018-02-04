var app = require('../server.js');

exports.create = app.passport.authenticate('register', {
        successRedirect: '/subject',
        failureRedirect: '/user/register'
    }
);

exports.authenticate = app.passport.authenticate('login', {
        successRedirect: '/subject',
        failureRedirect: '/user/login'
});

exports.register = function(req, res) {
	res.render('register');
};

exports.login = function(req, res ) {
	res.render('login');
};

exports.logout = function(req, res) {
	req.session == null;
	res.redirect('/');

}