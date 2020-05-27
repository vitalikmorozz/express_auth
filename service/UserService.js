const User = require('../model/user');

async function save(user) {
	const newUser = new User(user);
	try {
		const result = await newUser.save();
		return result;
	} catch (err) {
		throw err;
	}
}

async function findOne(filter) {
	try {
		const result = await User.findOne(filter);
		return result;
	} catch (err) {
		throw err;
	}
}

async function find(filter) {
	try {
		const result = await User.find(filter);
		return result;
	} catch (err) {
		throw err;
	}
}

async function findByUsername(username) {
	try {
		const result = await User.findOne({ username });
		return result;
	} catch (err) {
		throw err;
	}
}

module.exports = {
	save,
	findOne,
	find,
	findByUsername,
};
