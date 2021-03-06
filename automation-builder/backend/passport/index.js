import User from '../models/user';
const passport = require('passport')
const LocalStrategy = require('./localStrategy')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	User.findOne(
		{ _id: id },
		'username',
		(err, user) => {
			done(null, user)
		}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport