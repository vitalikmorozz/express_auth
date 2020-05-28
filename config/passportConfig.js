const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UserService = require('../service/UserService');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
			try {
				// Check if user exists
				const user = await UserService.findByUsername(username);
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}

				// Compare passwords
				if (!bcrypt.compareSync(password, user.password)) return done(null, false, { message: 'Incorrect password.' });
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			let user = await UserService.findById(id);
			done(null, user);
		} catch (err) {
			done(err, null);
		}
	});
};
