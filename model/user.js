const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: [String],
		required: true,
		default: ['USER'],
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
