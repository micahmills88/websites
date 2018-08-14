import User from '../models/user';
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
        console.log(username);
		User.findOne({ user_name: username}, (err, res) => {
			if(err) return done(err);
			
			//verify user via activedirectory
			return done(null, res);
		});
	}
)

module.exports = strategy;