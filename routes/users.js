const bcrypt = require('bcrypt');
const router = require('express').Router();

const UsersService = require('../service/UsersFakeService');

router.get('/', async (req, res) => {
	const users = await UsersService.getUsers();
	res.status(200).json(users);
});

router
	.route('/login')
	.get((req, res) => {
		res.render('users/login');
	})
	.post(async (req, res) => {
		const userToLogin = { username: req.body.username, password: req.body.password };
		const user = await UsersService.getUserByUsername(req.body.username);
		if (user === null) res.status(400).send();
		try {
			if (bcrypt.compareSync(userToLogin.password, user.password)) res.status(200).redirect('/');
			else res.status(403).redirect('/users/login');
		} catch (err) {
			res.status(500).send();
		}
	});

router
	.route('/register')
	.get((req, res) => {
		res.render('users/register');
	})
	.post(async (req, res) => {
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const user = { username: req.body.username, password: hashedPassword };
			await UsersService.createUser(user);
			res.status(201).redirect('/users/login');
		} catch (err) {
			res.status(500).send();
		}
	});

module.exports = router;
