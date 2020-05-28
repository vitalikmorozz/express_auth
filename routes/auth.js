const bcrypt = require('bcrypt');
const router = require('express').Router();
const passport = require('passport');

const UserService = require('../service/UserService');
const { authorizedUser, unauthorizedUser, hasRole } = require('../config/auth');

router
	.route('/login')
	.get(unauthorizedUser, (req, res) => {
		res.render('auth/login');
	})
	.post(unauthorizedUser, (req, res, next) => {
		passport.authenticate('local', {
			successRedirect: '/user/dashboard',
			failureRedirect: '/login',
			failureFlash: true,
		})(req, res, next);
	});

router
	.route('/register')
	.get(unauthorizedUser, (req, res) => {
		res.render('auth/register');
	})
	.post(unauthorizedUser, async (req, res) => {
		try {
			// Check if passwords are matching
			if (req.body.password !== req.body.passwordRepeat) {
				req.flash('error', 'Passwords did not match');
				res.redirect('/register');
			}

			// Check if username already used
			if (await UserService.findByUsername(req.body.username)) {
				req.flash('error', 'User with that username already exists');
				res.redirect('/register');
			}

			// Hash password, give role and save to database
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const user = { username: req.body.username, password: hashedPassword };
			user.roles = ['USER'];

			await UserService.save(user);

			req.flash('info', 'You are successfully registered. Now you can log in');
			res.status(201).redirect('/login');
		} catch (err) {
			console.log(err);
			res.status(500).render('serverError');
		}
	});

router.route('/logout').post(authorizedUser, (req, res) => {
	req.logout();

	req.flash('info', 'You successfully logged out');
	res.redirect('/');
});

module.exports = router;
