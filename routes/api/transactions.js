const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Product = require('../../models/Product');
const Shop = require('../../models/Shop');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

/*******************************************************************************************************
 *  GET REQUESTS
 *******************************************************************************************************/

// @route   GET api/transaction/bought
// @desc    return request user's transactions (buy)
// @access  Private
router.get('/bought', auth, async (req, res) => {
	try {
		const transactions = await Transaction.find({
			buyer: req.user.id,
		});
		if (!transactions) {
			return res.status(400).json({ msg: 'No transactions found for this user' });
		}
		res.json(transactions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/transaction/sold
// @desc    return request user's transactions (sold)
// @access  Private
router.get('/sold', auth, async (req, res) => {
	try {
		const transactions = await Transaction.find({
			seller: req.user.id,
		});
		if (!transactions) {
			return res.status(400).json({ msg: 'No transactions found for this user' });
		}
		res.json(transactions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/transaction/id
// @desc    return transaction by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			return res.status(400).json({ msg: 'No transaction found' });
		}
		res.json(transaction);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*******************************************************************************************************
 *  POST REQUESTS
 *******************************************************************************************************/

// @route  POST api/transactions/shop_id/selled_id/buyer_id
// @desc   Create Transaction
// @access Private
router.post('/purchase/:shop_id', auth, async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.shop_id);

		if (!shop) {
			return res.status(400).json({ msg: 'Shop Not found' });
		}

		const { products, tax, total } = req.body;

		//Build Product Object
		const transactionFields = {};

		if (tax) transactionFields.tax = Math.round(tax * 100) / 100;
		if (total) transactionFields.total = Math.round(total * 100) / 100;

		// Get seller and asign it to transaction
		const seller = await User.findById(shop.user);
		transactionFields.seller = seller;
		transactionFields.seller_name = seller.name;
		transactionFields.seller_pic = seller.pic;

		// Get seller and asign it to transaction
		const buyer = await User.findById(req.user.id);
		transactionFields.buyer = buyer;
		transactionFields.buyer_name = buyer.name;
		transactionFields.buyer_pic = buyer.pic;

		// Set shop and asign it to transaction
		transactionFields.shop = shop;
		transactionFields.shop_name = shop.name;
		transactionFields.shop_logo = shop.pic_logo;

		// Set product list inside transaction
		let productsInfo = [];
		if (products) {
			products.forEach(async (product) => {
				let productsFields = {};
				productsFields.product = product;
				productsFields.name = product.name;
				productsFields.quantity = product.quantity;
				productsFields.pics = product.pics;
				productsFields.price = product.price;
				productsInfo.push(productsFields);
				// Update product's quantity sold
				let productObject = await Product.findById(product._id);
				let quantitySold = productObject.quantity_sold;
				// New quantity sold object
				let quantity_soldFields = {};
				quantity_soldFields.buyer = buyer;
				quantity_soldFields.quantity = product.quantity;
				// Update product
				quantitySold.push(quantity_soldFields);
				// qty sold
				productObject.quantity_sold = quantitySold;
				// qty left
				productObject.quantity = productObject.quantity - product.quantity;
				// If quantity is < 1 deactivate product
				if (productObject.quantity < 1) {
					productObject.active = false;
				}
				await productObject.save();
			});
		}
		transactionFields.products = productsInfo;

		const transaction = new Transaction(transactionFields);
		// Asign transaction to user
		// Asign transaction to shop
		if (buyer.transactions) {
			buyer.transactions.unshift(transaction);
		} else {
			buyer.transactions = [transaction];
		}
		// Asign transaction to shop
		if (shop.transactions) {
			shop.transactions.unshift(transaction);
		} else {
			shop.transactions = [transaction];
		}
		await shop.save();
		await transaction.save();
		await buyer.save();
		res.json(transaction);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/transactions/edit/:id
// @desc   Edit Transaction
// @access Private
router.post('/:id', auth, async (req, res) => {
	const transaction = await Transaction.findById(req.params.id);
	if (!transaction) {
		return res.status(404).json({ msg: 'Transaction not found' });
	}

	const { approved, buyer, delivered, paid, products, ready_f_delivery, ready_f_pickup, tax, total } = req.body;

	//Build Product Object
	const transactionFields = {};

	if (approved || approved === false) transactionFields.approved = approved;
	if (buyer) transactionFields.buyer = buyer;
	if (delivered || delivered === false) transactionFields.delivered = delivered;
	if (paid || paid === false) transactionFields.paid = paid;
	if (products) transactionFields.products = products;
	if (ready_f_delivery || ready_f_delivery === false) transactionFields.ready_f_delivery = ready_f_delivery;
	if (ready_f_pickup || ready_f_pickup === false) transactionFields.ready_f_pickup = ready_f_pickup;
	if (tax) transactionFields.tax = tax;
	if (total) transactionFields.total = total;

	try {
		const transaction = await Transaction.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: transactionFields },
			{ new: true }
		);
		await transaction.save();
		// Get updated transactions
		const transactions = await Transaction.find({
			seller: req.user.id,
		});
		res.json(transactions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/transactions/trans_id/product_id
// @desc   Add product to transaction
// @access Private
router.post('/:trans_id/:product_id', auth, async (req, res) => {
	const transaction = await Transaction.findById(req.params.trans_id);
	if (!transaction) {
		return res.status(404).json({ msg: 'Transaction not found' });
	}
	const product = await Product.findById(req.params.product_id);
	if (!product) {
		return res.status(404).json({ msg: 'Product not found' });
	}

	const { quantity } = req.body;

	try {
		product.quantity = quantity;
		transaction.products.unshift(product);
		await transaction.save();
		res.json(transaction);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*******************************************************************************************************
 *  DELETE REQUESTS
 *******************************************************************************************************/

// @route   DELETE api/transaction/:id
// @desc    Delete a transaction from an user
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			return res.status(404).json({ msg: 'Transaction not found' });
		}

		// Remove transaction from users
		let buyer = await User.findById(transaction.buyer);
		let seller = await User.findById(transaction.seller);
		let shop = await Shop.findById(transaction.shop);

		buyer.transactions_purchase.remove(transaction);
		seller.transactions_sale.remove(transaction);
		shop.transactions.remove(transaction);

		await buyer.save();
		await seller.save();
		await shop.save();
		await transaction.remove();

		// Get updated transactions
		const transactions = await Transaction.find({
			seller: req.user.id,
		});
		res.json(transactions);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Transaction not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/transaction/shop/:id
// @desc    Delete a transaction from a shop
// @access  Private
router.delete('/shop/:id', auth, async (req, res) => {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			return res.status(404).json({ msg: 'Transaction not found' });
		}

		// Remove transaction from users
		let buyer = await User.findById(transaction.buyer);
		let seller = await User.findById(transaction.seller);
		let shop = await Shop.findById(transaction.shop);

		buyer.transactions_purchase.remove(transaction);
		seller.transactions_sale.remove(transaction);
		shop.transactions.remove(transaction);

		await buyer.save();
		await seller.save();
		await shop.save();
		await transaction.remove();

		// Get updated transactions
		const transactions = await Transaction.find({
			shop: shop._id,
		});
		res.json(transactions);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Transaction not found' });
		}
		res.status(500).send('Server Error');
	}
});

module.exports = router;
