const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	active: {
		type: Boolean,
		default: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	description: {
		type: String,
	},
	feedback: [
		{
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
					user_pic: {
						type: String,
					},
					user_name: {
						type: String,
					},
				},
			],
			date: {
				type: Date,
				default: Date.now,
			},
			reports: [
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
		},
	],
	name: {
		type: String,
		required: true,
	},
	pics: [
		{
			type: String,
		},
	],
	price: {
		type: Number,
		default: 0,
	},
	quantity: {
		type: Number,
		default: 0,
	},
	quantity_sold: [
		{
			buyer: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
			quantity: {
				type: Number,
				default: 0,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	reports: [
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
	sections: [
		{
			section: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'section',
			},
		},
	],
	shop: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'shop',
	},
	social: {
		amazon: {
			type: String,
		},
		twitter: {
			type: String,
		},
		facebook: {
			type: String,
		},
		instagram: {
			type: String,
		},
	},
	tags: [
		{
			type: String,
			required: true,
		},
	],
	type: {
		type: String,
		required: true,
		default: 'product',
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	visits: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
});
module.exports = User = mongoose.model('product', ProductSchema);
