const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Feedback = require('../../models/Feedback');
const Product = require('../../models/Product');
const Section = require('../../models/Section');
const Transaction = require('../../models/Transaction');
const Shop = require('../../models/Shop');
const User = require('../../models/User');

/*******************************************************************************************************
 *  GET REQUESTS
 *******************************************************************************************************/

// @route   GET api/shops
// @desc    return request user's shops
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const shops = await Shop.find({
			user: req.user.id,
		});
		if (!shops) {
			return res.status(400).json({ msg: 'No shops found for this user' });
		}
		res.json(shops);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/shops/id
// @desc    Return shop using id
// @access  Private
router.get('/:id', async (req, res) => {
	try {
		let shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(400).json({ msg: 'Shop not found' });
		}
		// Get Products
		const products = await Product.find({
			shop: req.params.id,
		});
		shop.products = products;
		// Get Sections
		const sections = await Section.find({
			shop: req.params.id,
		});
		shop.sections = sections;
		// Get Transactions if shop owner
		const transactions = await Transaction.find({
			shop: req.params.id,
		});
		shop.transactions = transactions;
		res.json(shop);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/shops/name/:name
// @desc    Return shop using name
// @access  Private
router.get('/name/:name', async (req, res) => {
	try {
		let shop = await Shop.find({ name: req.params.name });

		if (!shop) {
			return res.status(400).json({ msg: 'Shop not found' });
		}
		// Get Products
		const products = await Product.find({
			shop: shop,
		});
		shop.products = products;
		// Get Sections
		const sections = await Section.find({
			shop: shop,
		});
		shop.sections = sections;
		// Get Transactions if shop owner
		const transactions = await Transaction.find({
			shop: shop,
		});
		shop.transactions = transactions;
		res.json(shop[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/shop/feedback/id
// @desc    return shop's feedback by id
// @access  Public
router.get('/feedback/:id', async (req, res) => {
	try {
		const feedback = await Feedback.find({
			shop_receiver: req.params.id,
		});
		if (!feedback) {
			return res.status(400).json({ msg: 'No feedback found for this shop' });
		}
		res.json(feedback);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/shops/transactions/id
// @desc    return shop's transactions by id
// @access  Private
router.get('/transactions/:id', async (req, res) => {
	try {
		const transactions = await Transaction.find({
			shop: req.params.id,
		});
		if (!transactions) {
			return res.status(400).json({ msg: 'No transactions found for this shop' });
		}
		res.json(transactions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
/*******************************************************************************************************
 *  POST REQUESTS
 *******************************************************************************************************/

// @route  POST api/shops
// @desc   Create Shop
// @access Private
router.post('/', auth, [check('name', 'Name is Required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const {
			active,
			address,
			email,
			facebook,
			instagram,
			intro,
			linkedin,
			name,
			pic_logo,
			pic_jumbo,
			tags,
			twitter,
			type,
			youtube,
		} = req.body;

		// Check if name already in use
		const shops = await Shop.find({
			name: name,
		});
		if (shops.length > 0) {
			return res.json('Shop name already in use');
		}
		// Check if email already in use
		const shops2 = await Shop.find({
			email: email,
		});
		if (shops2.length > 0) {
			return res.json('Shop email already in use');
		}

		//Build Product Object
		const shopFields = {};

		shopFields.user = req.user.id;
		if (active) shopFields.active = active;
		if (address) shopFields.address = address;
		if (email) shopFields.email = email;
		if (intro) shopFields.intro = intro;
		if (name) shopFields.name = name;
		if (pic_logo) shopFields.pic_logo = pic_logo;
		if (pic_jumbo) shopFields.pic_jumbo = pic_jumbo;
		if (type) shopFields.type = type;
		if (tags) shopFields.tags = tags;
		/** 
    	if (tags) {
      	shopFields.tags = tags.split(",").map((tag) => tag.trim());
    	}
    	*/

		//Build social object
		shopFields.social = {};

		if (facebook) shopFields.social.facebook = facebook;
		if (instagram) shopFields.social.instagram = instagram;
		if (linkedin) shopFields.social.linkedin = linkedin;
		if (twitter) shopFields.social.twitter = twitter;
		if (youtube) shopFields.social.youtube = youtube;

		const shop = new Shop(shopFields);
		const user = await User.findById(req.user.id);
		user.shops_owned.unshift(shop);
		await shop.save();
		await user.save();

		// Add product section to shop
		const sectionFields = {};

		sectionFields.user = req.user.id;
		sectionFields.shop = shop;
		sectionFields.title = 'Products';
		sectionFields.position = 1;
		sectionFields.type = 'data-view';

		// Create section
		const section = new Section(sectionFields);
		await section.save();
		res.json(shop);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/shops/edit/id
// @desc   Edit Shop
// @access Private
router.post('/edit/:id', auth, async (req, res) => {
	const shop = await Shop.findById(req.params.id);
	if (!shop) {
		return res.status(404).json({ msg: 'Shop not found' });
	}
	//Check user
	if (shop.user.toString() !== req.user.id) {
		return res.status(401).json({ msg: 'User not autorized' });
	}

	const {
		active,
		address,
		amazon,
		email,
		intro,
		facebook,
		instagram,
		linkedin,
		name,
		phone,
		tags,
		twitter,
		type,
		youtube,
	} = req.body;

	//Build Product Object
	let shopFields = {};

	shopFields.user = req.user.id;
	if (active) shopFields.active = active;
	if (address) shopFields.address = address;
	if (email) {
		// Check if email already in use
		const shops2 = await Shop.find({
			email: email,
		});
		if (shops2.length > 0) {
			return res.json('Shop email already in use');
		}
		shopFields.email = email;
	}
	if (intro) shopFields.intro = intro;
	if (name) {
		// Check if name already in use
		const shops = await Shop.find({
			name: name,
		});
		if (shops.length > 0) {
			return res.json('Shop name already in use');
		}
		shopFields.name = name;
	}
	if (type) shopFields.type = type;
	if (tags) shopFields.tags = tags;

	//Build social object
	shopFields.social = {};

	if (amazon) shopFields.social.amazon = amazon;
	if (facebook) shopFields.social.facebook = facebook;
	if (instagram) shopFields.social.instagram = instagram;
	if (linkedin) shopFields.social.linkedin = linkedin;
	if (phone) shopFields.social.phone = phone;
	if (twitter) shopFields.social.twitter = twitter;
	if (youtube) shopFields.social.youtube = youtube;

	try {
		const shop = await Shop.findOneAndUpdate({ _id: req.params.id }, { $set: shopFields }, { new: true });
		res.json(shop);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/shops/remove-logo/id
// @desc   Remove Shop Logo
// @access Private
router.post('/remove-logo/:id', auth, async (req, res) => {
	console.log('Route Running');
	try {
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}
		//Check user
		if (shop.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not autorized' });
		}
		shop.pic_logo = null;
		await shop.save();
		res.json(shop);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*******************************************************************************************************
 Upload IMGs
 *******************************************************************************************************/
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function (req, file, cb) {
		cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 10000000 },
}).single('myImage');

// @route   POST api/shops/upload_logo/id
// @desc    Upload logo and asign to shop
// @access  Private
router.post('/upload_logo/:id', auth, (req, res) => {
	upload(req, res, (err) => {
		//console.log("Request file ---", req.file); //Here you get file.
		let updatedShop = null;
		if (!err) {
			async function updateShop() {
				const shop = await Shop.findById(req.params.id);
				shop.pic_logo = req.file.filename;
				await shop.save();
				updatedShop = shop;
			}
			updateShop();
			res.json(updatedShop);
		} else {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	});
});

// @route   POST api/shops/upload_jumbo/id
// @desc    Upload jumbo and asign to shop
// @access  Private
router.post('/upload_jumbo/:id', auth, (req, res) => {
	upload(req, res, (err) => {
		//console.log("Request file ---", req.file); //Here you get file.
		let updatedShop = null;
		if (!err) {
			async function updateShop() {
				const shop = await Shop.findById(req.params.id);
				shop.pic_jumbo = req.file.filename;
				await shop.save();
				updatedShop = shop;
			}
			updateShop();
			res.json(updatedShop);
		} else {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	});
});

/*******************************************************************************************************
 *  DELETE REQUESTS
 *******************************************************************************************************/

// @route   DELETE api/shop/:id
// @desc    Delete a shop
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}
		//Check user
		if (shop.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not autorized' });
		}
		//Remove Shop's products
		await Product.deleteMany({ shop: req.params.id });

		let user = await User.findById(req.user.id);
		let userShops = user.shops_owned;
		userShops.forEach((shop) => {
			if (shop === req.params.id) {
				const index = userShops.indexOf(shop);
				if (index > -1) {
					userShops.splice(index, 1);
				}
				user.shops_owned = userShops;
			}
		});
		await user.save();
		await shop.remove();

		const shops = await Shop.find({
			user: req.user.id,
		});

		res.json(shops);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Shop not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/shop/product/:id/:product_id
// @desc    Delete a Product from a shop
// @access  Private
router.delete('/product/:id', auth, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		//Make sure product exists
		if (!product) {
			return res.status(404).json({ msg: 'Product does not exist' });
		}
		const shop = await Shop.findById(product.shop);
		if (!shop) {
			return res.status(404).json({ msg: 'No shop found for this product' });
		}
		// Check user
		if (shop.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		let user = await User.findById(req.user.id);
		user.products.remove(product);
		shop.products.remove(product);

		await user.save();
		await shop.save();
		await product.remove();

		const products = await Product.find({
			shop: product.shop,
		});

		res.json(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*****************************************************************************************************
 * PUT REQUESTS
 *****************************************************************************************************/

// @route   PUT api/shops/feedback/:id
// @desc    Feedback an shop
// @access  Private
router.put('/feedback/:id', auth, async (req, res) => {
	try {
		// Check if user exists
		let shop_receiver = await Shop.findById(req.params.id);
		if (!shop_receiver) {
			return res.status(404).json({ msg: 'Receiver shop not found' });
		}
		// Check request user
		let user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}

		const { stars, comment } = req.body;

		//Build Feedback Object
		const feedbackFields = {};

		feedbackFields.user = user;
		feedbackFields.user_name = user.name;
		feedbackFields.user_pic = user.pic;
		if (stars) feedbackFields.stars = stars;
		if (comment) feedbackFields.comment = comment;

		if (shop_receiver.feedback.length > 0) {
			let feedbacks = shop_receiver.feedback;
			feedbacks.forEach(async (feedback) => {
				// If user has rated before
				if (feedback.user.toString() === user._id.toString()) {
					const index = feedbacks.indexOf(feedback);
					if (index > -1) {
						// Remove old feedback
						feedbacks.splice(index, 1);
						// Add new feedback
						feedbacks.unshift(feedbackFields);
					}
					shop_receiver.feedback = feedbacks;
					await shop_receiver.save();
					res.json(shop_receiver.feedback.sort((a, b) => (a.date > b.date ? 1 : -1)));
				}
			});
		} else {
			const feedbacks = [];
			feedbacks.unshift(feedbackFields);
			shop_receiver.feedback = feedbacks;
			await shop_receiver.save();
			res.json(shop_receiver.feedback.sort((a, b) => (a.date > b.date ? 1 : -1)));
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/shops/visit/:id
// @desc    Update shop visit
// @access  Public
router.put('/visit/:id', async (req, res) => {
	try {
		// Check if shop exists
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}

		// Shop Object
		const shopFields = {};
		shopFields.visits = shop.visits;

		//Build Visit Object
		const visitFields = {};
		shopFields.visits.unshift(visitFields);

		// Update
		const updatedShop = await Shop.findOneAndUpdate({ _id: req.params.id }, { $set: shopFields }, { new: true });
		res.json(updatedShop);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/shops/visit-auth/:id
// @desc    Update shop visits
// @access  Private
router.put('/visit-auth/:id', auth, async (req, res) => {
	try {
		// Check if shop exists
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}

		// Shop Object
		const shopFields = {};
		shopFields.visits = shop.visits;

		//Build Visit Object
		const visitFields = {};
		visitFields.user = req.user.id;
		shopFields.visits.unshift(visitFields);

		// Update
		const updatedShop = await Shop.findOneAndUpdate({ _id: req.params.id }, { $set: shopFields }, { new: true });
		res.json(updatedShop);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/shops/follow/:id
// @desc    Follow a shop
// @access  Purivate
router.put('/follow/:id', auth, async (req, res) => {
	try {
		// Check if shop exists
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}
		// Check if user exists
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}

		// Shop Followed Object
		const shopFollowedFields = {};
		shopFollowedFields.shop = shop._id;
		shopFollowedFields.name = shop.name;
		shopFollowedFields.pic_logo = shop.pic_logo;

		// User Follower Object
		const followerFields = {};
		followerFields.user = user._id;
		followerFields.name = user.name;
		followerFields.pic = user.pic;

		// Updated shop fields
		const shopFields = {};
		shopFields.followers = shop.followers ? shop.followers : [];
		shopFields.followers.unshift(followerFields);

		// Updated user fields
		const userFields = {};
		userFields.shops_followed = shop.shops_followed ? shop.shops_followed : [];
		userFields.shops_followed.unshift(shopFollowedFields);

		// Update Shop
		const updatedShop = await Shop.findOneAndUpdate({ _id: req.params.id }, { $set: shopFields }, { new: true });

		// Update User
		const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, { $set: userFields }, { new: true });

		res.json({ updatedShop, updatedUser });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/shops/unfollow/:id
// @desc    Follow a shop
// @access  Private
router.put('/unfollow/:id', auth, async (req, res) => {
	try {
		// Check if shop exists
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}
		// Check if user exists
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}

		// Updated shop fields
		const shopFields = {};
		shopFields.followers = shop.followers;
		shopFields.followers.forEach((follower) => {
			if (follower.user === user._id) {
				const index = shopFields.followers.indexOf(follower);
				if (index > -1) {
					shopFields.followers.splice(index, 1);
				}
			}
		});

		// Updated user fields
		const userFields = {};
		userFields.shops_followed = shop.shops_followed ? shop.shops_followed : [];
		userFields.shops_followed.forEach((shop) => {
			if (shop.shop === shop._id) {
				const index = userFields.shops_followed.indexOf(shop);
				if (index > -1) {
					userFields.shops_followed.splice(index, 1);
				}
			}
		});

		// Update Shop
		const updatedShop = await Shop.findOneAndUpdate({ _id: req.params.id }, { $set: shopFields }, { new: true });

		// Update User
		const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, { $set: userFields }, { new: true });

		res.json({ updatedShop, updatedUser });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
/************************************************************************************************************
 * Product Routes
 *************************************************************************************************************/

/************************************************************************************************************
 * Get Requests
 ************************************************************************************************************/

// @route   GET api/shops/products
// @desc    Return shop products using id
// @access  Private
router.get('/products/:id', async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(400).json({ msg: 'Shop not found' });
		}
		const products = await Product.find({
			shop: req.params.id,
		});
		if (!products) {
			return res.status(400).json({ msg: 'Products not found' });
		}
		res.json(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/************************************************************************************************************
 * Post Request
 *************************************************************************************************************/

// @route  POST api/shops/product/id
// @desc   Add product to shop
// @access Private
router.post('/product/:id', auth, [check('name', 'Name is Required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const shop = await Shop.findById(req.params.id);
	if (!shop) {
		return res.status(404).json({ msg: 'Shop not found' });
	}

	const { description, name, price, quantity, type, tags, amazon, twitter, facebook, instagram } = req.body;

	//Build Product Object
	const productFields = {};

	productFields.user = req.user.id;
	productFields.shop = shop;
	if (description) productFields.description = description;
	if (name) productFields.name = name;
	if (price) productFields.price = price;
	if (quantity) productFields.quantity = quantity;
	if (type) productFields.type = type;
	if (tags) productFields.tags = tags;

	const productFound = await Product.find({ shop: shop, name: name });
	if (productFound.length > 0) {
		return res.json('Product name already in use');
	}

	//Build social object
	productFields.social = {};

	if (amazon) productFields.social.amazon = amazon;
	if (twitter) productFields.social.twitter = twitter;
	if (facebook) productFields.social.facebook = facebook;
	if (instagram) productFields.social.instagram = instagram;

	try {
		// Create product
		const product = new Product(productFields);
		// Update user
		const user = await User.findById(req.user.id);
		user.products.unshift(product);
		// Update shop
		shop.products.unshift(product);
		await shop.save();
		await product.save();
		await user.save();

		// Check if shop has a product section
		let hasProductSection = false;
		// Sections
		const sections = await Section.find({
			shop: req.params.id,
		});
		if (sections) {
			sections.forEach((section) => {
				if (section.type === 'data-view') {
					hasProductSection = true;
				}
			});
		}
		if (!hasProductSection) {
			// Add product section to shop
			const sectionFields = {};

			sectionFields.user = req.user.id;
			sectionFields.shop = req.params.id;
			sectionFields.title = 'Products';
			sectionFields.position = 1;
			sectionFields.type = 'data-view';

			// Create section
			const section = new Section(sectionFields);
			await section.save();
		}

		const products = await Product.find({
			shop: req.params.id,
		});
		// Updated Sections
		const updatedSections = await Section.find({
			shop: req.params.id,
		});

		res.json({ products: products, sections: updatedSections });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/shops/product/edit/id
// @desc   Edit Product
// @access Private
router.post('/product/edit/:id', auth, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		//Make sure product exists
		if (!product) {
			return res.status(404).json({ msg: 'Product does not exist' });
		}

		const shop = await Shop.findById(product.shop);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}

		const { description, name, pics, price, quantity, type, tags, amazon, twitter, facebook, instagram } = req.body;

		//Build Product Object
		let productFields = {};

		if (product) productFields = product;
		productFields.user = req.user.id;
		if (description) productFields.description = description;
		if (name) productFields.name = name;
		if (pics) productFields.pics = pics;
		if (price) productFields.price = price;
		if (quantity) productFields.quantity = quantity;
		if (type) productFields.type = type;
		if (tags) productFields.tags = tags;
		if (productFields.quantity > 0) productFields.active = true;

		if (name) {
			const productFound = await Product.find({ shop: shop, name: name });
			if (productFound.length > 0) {
				return res.json('Product name already in use');
			}
		}

		//Build social object
		productFields.social = product.social;

		if (amazon) productFields.social.amazon = amazon;
		if (twitter) productFields.social.twitter = twitter;
		if (facebook) productFields.social.facebook = facebook;
		if (instagram) productFields.social.instagram = instagram;

		const productUpdated = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: productFields },
			{ new: true }
		);
		//await productUpdated.save();

		const products = await Product.find({
			shop: product.shop,
		});

		res.json({ products: products, product: productUpdated });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/shops/product/soldout/id
// @desc   Soldout Product
// @access Private
router.post('/product/soldout/:id', auth, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		//Make sure product exists
		if (!product) {
			return res.status(404).json({ msg: 'Product does not exist' });
		}

		const shop = await Shop.findById(product.shop);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}

		//Build Product Object
		let productFields = {};

		if (product) productFields = product;
		productFields.quantity = 0;
		productFields.active = false;

		const productUpdated = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: productFields },
			{ new: true }
		);

		const products = await Product.find({
			shop: product.shop,
		});

		res.json({ products: products, product: productUpdated });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/************************************************************************************************************
 * Sections
 *************************************************************************************************************/

/************************************************************************************************************
 * Get Request
 *************************************************************************************************************/

// @route   GET api/shops/sections
// @desc    Return shop sections using id
// @access  Private
router.get('/sections/:id', async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(400).json({ msg: 'Shop not found' });
		}
		const sections = await Section.find({
			shop: req.params.id,
		});
		res.json(sections);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/************************************************************************************************************
 * Post Request
 *************************************************************************************************************/

// @route  POST api/shops/section/id
// @desc   Add section to shop
// @access Private
router.post('/section/:id', auth, async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.id);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop not found' });
		}

		const { img, title, position, text, type } = req.body;

		// Build Section Object
		const sectionFields = {};

		sectionFields.user = req.user.id;
		sectionFields.shop = req.params.id;
		if (img) sectionFields.img = img;
		if (title) sectionFields.title = title;
		if (position) sectionFields.position = position;
		if (text) sectionFields.text = text;
		if (type) sectionFields.type = type;

		const sections = await Section.find({
			shop: req.params.id,
		});
		// if shop has sections
		if (sections && sections.length > 0) {
			sections.forEach(async (section) => {
				// if sections position >= new section position
				// increase its position
				if (section.position >= sectionFields.position) {
					section.position = section.position + 1;
					await section.save();
				}
			});
			// Create section
			const section = new Section(sectionFields);
			await section.save();
			// update shop
			shop.sections.push(section);
			await shop.save();

			// Updated Sections Positions
			const updatedSections = await Section.find({
				shop: section.shop,
			});
			res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
		} else {
			// Create section
			const section = new Section(sectionFields);
			await section.save();
			// Updated Sections Positions
			const updatedSections = await Section.find({
				shop: section.shop,
			});
			res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/shops/section/edit/id
// @desc   Edit Shop Section
// @access Private
router.post('/section/edit/:id', auth, async (req, res) => {
	const section = await Section.findById(req.params.id);
	if (!section) {
		return res.status(404).json({ msg: 'Section not found' });
	}

	const { img, title, position, text, type } = req.body;

	// Build Section Object
	let sectionFields = {};
	if (section) {
		sectionFields = section;
	}

	sectionFields.user = req.user.id;
	if (img) sectionFields.img = img;
	if (title) sectionFields.title = title;
	if (position) sectionFields.position = position;
	if (text) sectionFields.text = text;
	if (type) sectionFields.type = type;

	const sections = await Section.find({
		shop: section.shop,
	});

	try {
		// if shop has sections and position changed
		if (sections && sections.length > 0) {
			// Update section
			const section = await Section.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: sectionFields },
				{ new: true }
			);

			await section.save();

			// Updated Sections Positions
			const updatedSections = await Section.find({
				shop: section.shop,
			});
			// Update positions
			let positionCounter = 1;
			updatedSections
				.sort((a, b) => (a.position > b.position ? 1 : -1))
				.forEach(async (section) => {
					// re-arrange positions
					if (section.position !== positionCounter) {
						section.position = positionCounter;
						positionCounter = positionCounter + 1;
						await section.save();
					}
					positionCounter = positionCounter + 1;
				});
			res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
		} else {
			// Update section
			const section = await Section.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: sectionFields },
				{ new: true }
			);
			await section.save();

			// Updated Sections Positions
			const updatedSections = await Section.find({
				shop: section.shop,
			});

			res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/shops/section/move/id
// @desc   Move shop section position
// @access Private
router.post('/section/move/:id', auth, async (req, res) => {
	const section = await Section.findById(req.params.id);
	if (!section) {
		return res.status(404).json({ msg: 'Section not found' });
	}
	// Shop Sections
	const sections = await Section.find({
		shop: section.shop,
	});
	// Moving Direction
	const { direction } = req.body;

	try {
		// Move Up
		if (direction === 'up') {
			if (section.position > 1) {
				section.position = section.position - 2;
				await section.save();
			}
			// Move Down
		} else {
			if (section.position < sections.length) {
				section.position = section.position + 2;
				await section.save();
			}
		}

		// Updated Sections Positions
		const updatedSections = await Section.find({
			shop: section.shop,
		});
		// Update positions
		let positionCounter = 1;
		updatedSections
			.sort((a, b) => (a.position > b.position ? 1 : -1))
			.forEach(async (section) => {
				// re-arrange positions
				if (section.position !== positionCounter) {
					section.position = positionCounter;
					positionCounter = positionCounter + 1;
					await section.save();
				}
				positionCounter = positionCounter + 1;
			});
		res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/shops/section/swap/id
// @desc   Swap img position in section
// @access Private
router.post('/section/swap/:id', auth, async (req, res) => {
	try {
		const section = await Section.findById(req.params.id);
		if (!section) {
			return res.status(404).json({ msg: 'Section not found' });
		}
		section.reverse = !section.reverse;
		await section.save();
		// Updated Sections
		const updatedSections = await Section.find({
			shop: section.shop,
		});
		res.json(updatedSections);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/************************************************************************************************************
 * Delete Request
 *************************************************************************************************************/

// @route   DELETE api/shop/section/:shop_id/:product_id
// @desc    Delete a Section from a shop
// @access  Private
router.delete('/section/:shop_id/:section_id', auth, async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.shop_id);
		if (!shop) {
			return res.status(404).json({ msg: 'Shop does not exist' });
		}
		//pullout section
		const section = await Section.findById(req.params.section_id);
		if (!section) {
			return res.status(404).json({ msg: 'Section does not exist' });
		}
		// Check user
		if (shop.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		shop.sections.remove(section);

		await shop.save();
		await section.remove();

		// Updated Sections Positions
		const updatedSections = await Section.find({
			shop: section.shop,
		});
		if (updatedSections && updatedSections.length > 0) {
			// Update positions
			let positionCounter = 1;
			updatedSections
				.sort((a, b) => (a.position > b.position ? 1 : -1))
				.forEach(async (section) => {
					// re-arrange positions
					if (section.position !== positionCounter) {
						section.position = positionCounter;
						positionCounter = positionCounter + 1;
						await section.save();
					}
					positionCounter = positionCounter + 1;
				});
		}
		res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/shops/feedback-response/shop_id/feedback_id'
// @desc    Reply to Feedback
// @access  Private
router.put('/feedback-response/:shop_id/:feedback_id', auth, async (req, res) => {
	try {
		// Check if user exists
		let shop_receiver = await Shop.findById(req.params.shop_id);
		if (!shop_receiver) {
			return res.status(404).json({ msg: 'Receiver shop not found' });
		}
		// Check request user
		let user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}

		const { comment } = req.body;

		//Build Feedback Object
		const responseFields = {};

		responseFields.user = user;
		responseFields.user_name = user.name;
		responseFields.user_pic = user.pic;
		if (comment) responseFields.comment = comment;

		let shopFeedback = shop_receiver.feedback;
		// Check if feedback exists and modify it
		shopFeedback.forEach(async (feed) => {
			if (feed._id.toString() === req.params.feedback_id.toString()) {
				feed.responses.push(responseFields);
				shop_receiver.feedback = shopFeedback;
				await shop_receiver.save();
				res.json({ shopFeedback: shop_receiver.feedback, feedback: feed });
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/shops/feedback-report/shop_id/feedback_id'
// @desc    Report a Feedback
// @access  Private
router.put('/feedback-report/:shop_id/:feedback_id', auth, async (req, res) => {
	try {
		// Check if user exists
		let shop_receiver = await Shop.findById(req.params.shop_id);
		if (!shop_receiver) {
			return res.status(404).json({ msg: 'Receiver shop not found' });
		}
		// Check request user
		let user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}

		const { comment, reason } = req.body;

		//Build Feedback Object
		const reportFields = {};

		reportFields.user = user;
		if (reason) reportFields.reason = reason;
		if (comment) reportFields.comment = comment;

		let shopFeedback = shop_receiver.feedback;
		// Check if feedback exists
		shopFeedback.forEach(async (feed) => {
			if (feed._id.toString() === req.params.feedback_id.toString()) {
				feed.reports.push(reportFields);
				shop_receiver.feedback = shopFeedback;
				await shop_receiver.save();
				res.json({ shopFeedback: shop_receiver.feedback, feedback: feed });
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
