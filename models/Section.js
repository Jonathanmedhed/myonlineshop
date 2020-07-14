const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
	img: {
		type: String,
	},
	title: {
		type: String,
	},
	position: {
		type: Number,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
	},
	reverse: {
		type: Boolean,
	},
	shop: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'shop',
	},
	text: {
		type: String,
	},
	type: {
		type: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
});
module.exports = User = mongoose.model('section', SectionSchema);
