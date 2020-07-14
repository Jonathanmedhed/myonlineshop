const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
	active: {
		type: Boolean,
		default: true,
	},
	address: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	email: {
		type: String,
		unique: true,
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
	followers: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
			name: {
				type: String,
				required: true,
			},
			pic: {
				type: String,
			},
		},
	],
	intro: {
		type: String,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	pic_logo: {
		type: String,
	},
	pic_jumbo: {
		type: String,
	},
	pics: [
		{
			type: String,
		},
	],
	product_categories: [
		{
			type: String,
		},
	],
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'product',
		},
	],
	products_sold: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'product',
			},
			date: {
				type: Date,
				default: Date.now,
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
	social: {
		email: {
			type: String,
		},
		facebook: {
			type: String,
		},
		instagram: {
			type: String,
		},
		linkedin: {
			type: String,
		},
		phone: {
			type: String,
		},
		twitter: {
			type: String,
		},
		youtube: {
			type: String,
		},
	},
	tags: [
		{
			type: String,
			required: true,
		},
	],
	transactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'transaction',
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
module.exports = User = mongoose.model('shop', ShopSchema);
