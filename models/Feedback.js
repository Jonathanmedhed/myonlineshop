const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: true,
	},
	responses: [
		{
			comment: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
	},
	reported: [
		{
			comment: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
			reason: {
				type: String,
			},
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
	shop: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'shop',
	},
	stars: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	user_pic: {
		type: String,
	},
	user_name: {
		type: String,
	},
	user_receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	product_receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
	},
	shop_receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'shop',
	},
});
module.exports = User = mongoose.model('feedback', FeedbackSchema);
