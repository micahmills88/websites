import User from '../models/user';
const LocalStrategy = require('passport-local').Strategy;

//declare activedirectory stuff right here
// var ActiveDirectory = require('activedirectory');
// var ad = new ActiveDirectory({ url: 'ldap://dc.domain.com',
//     baseDN: 'dc=domain,dc=com',
//     username: 'username@domain.com',
//     password: 'password'
// });

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
        console.log(username);
		User.findOne({ user_name: username}, (err, res) => {
			if(err) return done(err);
			//verify user via activedirectory above
			// ad.authenticate(username, password, function(err, isAuthenticated) {
			// 	if(err) return done(err, null);
			// 	if(isAuthenticated) {
			// 		return done(null, {
			// 			username: username
			// 		});
			// 	}
			// 	else {
			// 		return done(null, false);
			// 	}
			// });


			return done(null, res);
		});
	}
)

module.exports = strategy;