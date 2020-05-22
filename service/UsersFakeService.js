let users = [];

const getUsers = async () => {
	return users;
};

const getUserByUsername = async (username) => {
	const user = users.find((user) => user.username === username);
	return user;
};

const createUser = async (user) => {
	users.push(user);
	return user;
};

module.exports = {
	getUsers,
	getUserByUsername,
	createUser,
};
