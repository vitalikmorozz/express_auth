const router = require('express').Router();

const UsersService = require('../service/UsersFakeService');
const { authorizeUser } = require('../middleware/userMiddleware');

router.get('/list', async (req, res) => {
	const users = await UsersService.getUsers();
	res.status(200).json(users);
});

router.route('/dashboard').get(authorizeUser, (req, res) => {
	res.render('user/dashboard');
});

module.exports = router;
