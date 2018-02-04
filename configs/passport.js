var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;
	passport.use('register', new LocalStrategy (
	{
			
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true // allows us to pass back the entire request to the callback

	},

	function(req, email, password, done) {
		var generateHash = function(password) {
			return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
		}

		User.findOne({
			where: {
				email: email
			}
		})
			.then(function(user) {
				if (user) {
					return done(null, false, {message: 'That email is already taken'})
				} else {
					var data = {
						email: email,
						password: generateHash(password),
						firstname: req.body.firstname, 
						lastname: req.body.lastname,
					}

					User.create(data).then(function(newUser, created) {
						if(!newUser) {
							return done(null, false, {message: 'There was an error creating your account'});
						} else {
							return done(null, newUser);
						}
					})

				}
			});

	}

	));

	passport.use('login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,

	},

	function(req, email, password, done) {
		var User = user;

        var isValidPassword = function(userpass, password) {
 
            return bCrypt.compareSync(password, userpass);
 
        }

		User.findOne({
			where: {
				email: email
			}
		})
			.then(function(loginUser) {
				if (loginUser) {
					if (isValidPassword(loginUser.password, password)) {
						var userinfo = loginUser.get();
						return done(null, userinfo);
					}
				}

				return done(null, false, {
                    message: 'Email does not exist or incorrect password'
                });

			})
	}));

	//serialize
	passport.serializeUser(function(user, done) {
	 
	    done(null, user.id);
	 
	});

	// deserialize user 
	passport.deserializeUser(function(id, done) {
	 
	    User.findById(id).then(function(user) {
	 
	        if (user) {
	 
	            done(null, user.get());
	 
	        } else {
	 
	            done(user.errors, null);
	 
	        }
	 
	    });
	 
	});

}

