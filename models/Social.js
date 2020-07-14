const mongoose = require('mongoose');

const SocialSchema = new mongoose.Schema({
	facebook: {
		type: String,
	},
	email: {
		type: String,
	},
	instagram: {
		type: String,
	},
	linkedin: {
		type: String,
	},
	twitter: {
		type: String,
	},
	youtube: {
		type: String,
	},
});
module.exports = User = mongoose.model('social', SocialSchema);
