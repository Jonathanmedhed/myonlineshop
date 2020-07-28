const bcrypt = require('bcryptjs');
const config = require('config');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const { check, validationResult } = require('express-validator');

// Models
const Feedback = require('../../models/Feedback');
const User = require('../../models/User');
const Shop = require('../../models/Shop');
const Product = require('../../models/Product');
const Section = require('../../models/Section');
const Transaction = require('../../models/Transaction');

const auth = require('../../middleware/auth');

/*****************************************************************************************************
 * DELETE REQUESTS
 *****************************************************************************************************/

// @route   DELETE api/users/product/:id/
// @desc    Delete a Product from a user
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
		if (product.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		let user = await User.findById(req.user.id);
		user.products.remove(product);
		shop.products.remove(product);

		await user.save();
		await shop.save();
		await product.remove();

		const products = await Product.find({
			user: product.user,
		});

		res.json(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/users/
// @desc    Delete an user
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		//Make sure User exists
		if (!user) {
			return res.status(404).json({ msg: 'User does not exist' });
		}

		await user.remove();

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*****************************************************************************************************
 * GET REQUESTS
 *****************************************************************************************************/
const aws = require('aws-sdk');
aws.config.region = 'us-east-2';

// @route   GET api/users/sign-s3
// @desc    Get upload img and get url
// @access  Public
router.get('/sign-s3', async (req, res) => {
	console.log('Route running');
	process.env.AWS_ACCESS_KEY_ID = 'AKIAJRQ5SEZNKOHKM2NA';
	process.env.AWS_SECRET_ACCESS_KEY = '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';
	process.env.S3_BUCKET = 'myonlineshopvzla';
	const S3_BUCKET = process.env.S3_BUCKET;
	const s3 = new aws.S3();
	const fileName = req.query['file-name'];
	const fileType = req.query['file-type'];
	const s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read',
	};
	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err);
			return res.end();
		}
		const returnData = {
			signedRequest: data,
			url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
		};
		res.json(returnData.url);
	});
});

// @route   GET api/users/id
// @desc    Get user by id
// @access  Public
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}
		// Get User Products
		const products = await Product.find({
			user: req.params.id,
		});
		user.products = products;
		// Get User Shops
		const shops = await Shop.find({
			user: req.params.id,
		});
		user.shops_owned = shops;
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route GET api/users/
// @desc Get current user
// @access private
router.get('/', auth, async (req, res) => {
	try {
		let user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ errors: [{ msg: 'User not found' }] });
		}
		// Get User Products
		const products = await Product.find({
			user: req.user.id,
		});
		user.products = products;
		// Get User Shops
		const shops = await Shop.find({
			user: req.user.id,
		});
		user.shops_owned = shops;
		// Get User Purchase Transactions
		const transactionsPurchase = await Transaction.find({
			buyer: req.user.id,
		});
		user.transactions_purchase = transactionsPurchase;
		// Get User Selling Transactions
		const transactionsSold = await Transaction.find({
			seller: req.user.id,
		});
		user.transactions_sale = transactionsSold;
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/user/shops/id
// @desc    return user's shops by id
// @access  Private
router.get('/shops/:id', async (req, res) => {
	try {
		const shops = await Shop.find({
			user: req.params.id,
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

// @route   GET api/user/feedback/id
// @desc    return user's feedback by id
// @access  Public
router.get('/feedback/:id', async (req, res) => {
	try {
		const feedback = await Feedback.find({
			user_receiver: req.params.id,
		});
		if (!feedback) {
			return res.status(400).json({ msg: 'No feedback found for this user' });
		}
		res.json(feedback);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/user/products/id
// @desc    return user's products by id
// @access  Private
router.get('/products/:id', async (req, res) => {
	try {
		const products = await Product.find({
			user: req.params.id,
		});
		if (!products) {
			return res.status(400).json({ msg: 'No products found for this user' });
		}
		res.json(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/user/transactions/id
// @desc    return user's transactions(buy) by id
// @access  Private
router.get('/transactions-buy/:id', async (req, res) => {
	try {
		const transactions = await Transaction.find({
			buyer: req.params.id,
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

// @route   GET api/user/transactions/id
// @desc    return user's transactions(sold) by id
// @access  Private
router.get('/transactions-sold/:id', async (req, res) => {
	try {
		const transactions = await Transaction.find({
			seller: req.params.id,
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

/*****************************************************************************************************
 * POST REQUESTS
 *****************************************************************************************************/

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}
			user = new User({
				name,
				email,
				password,
			});
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			// Return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route  POST api/users/edit/id
// @desc   Edit User
// @access Private
router.post('/edit/', auth, async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return res.status(404).json({ msg: 'User not found' });
	}

	let {
		active,
		email,
		facebook,
		id_document,
		instagram,
		linkedin,
		location,
		name,
		password,
		pic,
		socialEmail,
		tags,
		twitter,
		type,
		youtube,
	} = req.body;

	//Build Product Object
	let userFields = user;

	userFields.user = req.user.id;
	if (active) userFields.active = active;
	if (email) {
		const user = await User.find({ email: email });
		if (user.length > 0) {
			return res.json('Email already in use');
		}
	}
	if (email) userFields.email = email;
	if (id_document) userFields.id_document = id_document;
	if (location) userFields.location = location;
	if (name) userFields.name = name;
	if (password) {
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);
		userFields.password = password;
	}
	if (pic) userFields.pic = pic;
	if (type) userFields.type = type;
	if (tags) {
		userFields.tags = tags.split(',').map((tag) => tag.trim());
	}

	//Build social object
	userFields.social = {};
	if (user.social) {
		userFields.social = user.social;
	}
	if (facebook) userFields.social.facebook = facebook;
	if (instagram) userFields.social.instagram = instagram;
	if (linkedin) userFields.social.linkedin = linkedin;
	if (socialEmail) userFields.social.email = socialEmail;
	if (twitter) userFields.social.twitter = twitter;
	if (youtube) userFields.social.youtube = youtube;

	try {
		const user = await User.findOneAndUpdate({ _id: req.user.id }, { $set: userFields }, { new: true });
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route Post api/users/send-email
// @desc send email
// @access private
router.post('/send-email', auth, async (req, res) => {
	/**
	 * Email Account that will be used to send emails
	 * Port that the transporter ill use
	 */
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		port: 465,
		secure: true,
		auth: {
			user: 'Pass1234!',
		},
	});

	/**
	 * App's Email
	 */
	const appEmail = 'my.online.shop.contact.service@gmail.com';

	try {
		const { emailToSend } = req.body;
		emailToSend.from = appEmail;
		console.log('Email From: ' + emailToSend.from);
		console.log('Email To: ' + emailToSend.to);
		console.log('Email Subject: ' + emailToSend.subject);
		console.log('Email Text: ' + emailToSend.text);
		transporter.sendMail(emailToSend, (error, info) => {
			if (error) {
				console.log('Email Not Sent');
				console.log(error);
				res.status(400).send({
					msg: error,
				});
			} else {
				console.log('Email Sent');
				res.json({ ok: 'email sent!' }).send();
			}
		});
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

// @route   POST api/users/upload
// @desc    Upload IMG and asign to user
// @access  Private
router.post('/upload', auth, (req, res) => {
	upload(req, res, (err) => {
		//console.log("Request file ---", req.file); //Here you get file.
		let updatedUser = null;
		if (!err) {
			async function updateUser() {
				const user = await User.findById(req.user.id);
				user.pic = req.file.filename;
				await user.save();
				updatedUser = user;
			}
			updateUser();
			res.json(updatedUser);
		} else {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	});
});

// @route   POST api/users/upload
// @desc    Upload IMG only, return path
// @access  Private
router.post('/upload-only', (req, res) => {
	upload(req, res, (err) => {
		if (!err) {
			res.json(req.file.filename);
		} else {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	});
});

// @route   POST api/users/upload
// @desc    Upload IMG and asign it to section
// @access  Private
router.post('/upload-section/:id', (req, res) => {
	upload(req, res, (err) => {
		let updatedSection = null;
		if (!err) {
			async function updateSection() {
				let section = await Section.findById(req.params.id);
				if (!section) {
					return res.status(404).json({ msg: 'Section not found' });
				}
				section.img = req.file.filename;
				updatedSection = section;
				await updatedSection.save();
			}
			updateSection();
			res.json(updatedSection);
		} else {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	});
});

/*****************************************************************************************************
 * PUT REQUESTS
 *****************************************************************************************************/

// @route   PUT api/users/feedback/:id
// @desc    Feedback an user
// @access  Private
router.put('/feedback/:id', auth, async (req, res) => {
	try {
		// Check if user exists
		let user_receiver = await User.findById(req.params.id);
		if (!user_receiver) {
			return res.status(404).json({ msg: 'Receiver user not found' });
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

		if (user_receiver.feedback.length > 0) {
			let feedbacks = user_receiver.feedback;
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
					user_receiver.feedback = feedbacks;
					await user_receiver.save();
					res.json(user_receiver.feedback.sort((a, b) => (a.date > b.date ? 1 : -1)));
				}
			});
		} else {
			const feedbacks = [];
			feedbacks.unshift(feedbackFields);
			user_receiver.feedback = feedbacks;
			await user_receiver.save();
			res.json(user_receiver.feedback.sort((a, b) => (a.date > b.date ? 1 : -1)));
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/users/feedback-response/user_id/feedback_id'
// @desc    Reply to Feedback
// @access  Private
router.put('/feedback-response/:user_id/:feedback_id', auth, async (req, res) => {
	try {
		// Check if user exists
		let user_receiver = await User.findById(req.params.user_id);
		if (!user_receiver) {
			return res.status(404).json({ msg: 'Receiver user not found' });
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

		let userFeedback = user_receiver.feedback;
		// Check if feedback exists
		userFeedback.forEach(async (feed) => {
			if (feed._id.toString() === req.params.feedback_id.toString()) {
				feed.responses.push(responseFields);
				user_receiver.feedback = userFeedback;
				await user_receiver.save();
				res.json({ userFeedback: user_receiver.feedback, feedback: feed });
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/users/feedback-report/user_id/feedback_id'
// @desc    Report a Feedback
// @access  Private
router.put('/feedback-report/:user_id/:feedback_id', auth, async (req, res) => {
	try {
		// Check if user exists
		let user_receiver = await User.findById(req.params.user_id);
		if (!user_receiver) {
			return res.status(404).json({ msg: 'Receiver user not found' });
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

		let userFeedback = user_receiver.feedback;
		// Check if feedback exists
		userFeedback.forEach(async (feed) => {
			if (feed._id.toString() === req.params.feedback_id.toString()) {
				feed.reports.push(reportFields);
				user_receiver.feedback = userFeedback;
				await user_receiver.save();
				res.json({ userFeedback: user_receiver.feedback, feedback: feed });
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
