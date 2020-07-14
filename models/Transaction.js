const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
	approved: {
		type: Boolean,
		default: false,
	},
	buyer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	buyer_name: {
		type: String,
	},
	buyer_pic: {
		type: String,
		default: '../../img/default-profile.png',
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	delivered: {
		type: Boolean,
		default: false,
	},
	in_transit: {
		type: Boolean,
		default: true,
	},
	paid: {
		type: Boolean,
		default: false,
	},
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'product',
			},
			name: {
				type: String,
			},
			quantity: {
				type: Number,
			},
			pics: [
				{
					type: String,
				},
			],
			price: {
				type: Number,
			},
		},
	],
	ready_f_delivery: {
		type: Boolean,
		default: false,
	},
	ready_f_pickup: {
		type: Boolean,
		default: false,
	},
	shop: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'shop',
	},
	shop_name: {
		type: String,
	},
	shop_logo: {
		type: String,
		default: '../../img/default-profile.png',
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	seller_name: {
		type: String,
	},
	seller_pic: {
		type: String,
		default: '../../img/default-profile.png',
	},
	tax: {
		type: Number,
		default: 0,
	},
	total: {
		type: Number,
		default: 0,
	},
});
module.exports = User = mongoose.model('transaction', TransactionSchema);
