const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	active: {
		type: Boolean,
		default: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	email: {
		type: String,
		required: true,
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
	id_document: {
		type: String,
		default: null,
	},
	location: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	pic: {
		type: String,
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'product',
		},
	],
	products_bought: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'product',
			},
			date: {
				type: Date,
				default: Date.now,
			},
			quantity: {
				type: Number,
			},
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
			quantity: {
				type: Number,
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
	shops_followed: [
		{
			shop: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'shop',
			},
			name: {
				type: String,
				required: true,
			},
			pic_logo: {
				type: String,
			},
		},
	],
	shops_owned: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'shop',
		},
	],
	social: {
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
	},
	transactions_purchase: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'transaction',
		},
	],
	transactions_sale: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'transaction',
		},
	],
	type: {
		type: String,
		required: true,
		default: 'user',
	},
});
module.exports = User = mongoose.model('user', UserSchema);
