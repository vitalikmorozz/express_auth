const router = require('express').Router();

const UsersService = require('../service/UserService');
const { authorizedUser, hasRole } = require('../config/auth');

router.get('/list', hasRole('ADMIN'), async (req, res) => {
	const users = await UsersService.find({});
	res.status(200).render('user/usersList', { users });
});

router.route('/dashboard').get(authorizedUser, (req, res) => {
	res.render('user/dashboard');
});

module.exports = router;
