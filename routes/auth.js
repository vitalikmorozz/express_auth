const bcrypt = require('bcrypt');
const router = require('express').Router();

const UsersService = require('../service/UsersFakeService');
const { authorizeUser } = require('../middleware/userMiddleware');

router
	.route('/login')
	.get((req, res) => {
		res.render('user/login');
	})
	.post(async (req, res) => {
		const userToLogin = { username: req.body.username, password: req.body.password };
		const user = await UsersService.getUserByUsername(req.body.username);

		if (user === null) res.status(400).send();
		// Compare passwords
		try {
			if (bcrypt.compareSync(userToLogin.password, user.password)) {
				req.session.user = user;

				res.status(200).redirect('/');
			} else res.status(403).redirect('/login');
		} catch (err) {
			res.status(500).render('serverError');
		}
	});

router
	.route('/register')
	.get((req, res) => {
		res.render('user/register');
	})
	.post(async (req, res) => {
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const user = { username: req.body.username, password: hashedPassword };

			await UsersService.createUser(user);

			req.flash('info', 'You are successfully registered. Now you can log in');
			res.status(201).redirect('/login');
		} catch (err) {
			res.status(500).send();
		}
	});

router.route('/logout').post(authorizeUser, (req, res) => {
	req.session.user = null;

	req.flash('info', 'You successfully logged out');
	res.redirect('/');
});

module.exports = router;
