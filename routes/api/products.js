const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Feedback = require('../../models/Feedback');
const Product = require('../../models/Product');
const Shop = require('../../models/Shop');
const Section = require('../../models/Section');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

// @route   GET api/products
// @desc    return request's user products
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const products = await Product.find({
			user: req.user.id,
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

// @route   GET api/products/id
// @desc    return product by id
// @access  Private
router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(400).json({ msg: 'No product found' });
		}
		const shop = await Shop.findById(product.shop);
		product.shop = shop;
		const sections = await Section.find({
			product: req.params.id,
		});
		product.sections = sections;
		res.json(product);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/products/feedback/id
// @desc    return product's feedback by id
// @access  Public
router.get('/feedback/:id', async (req, res) => {
	try {
		const feedback = await Feedback.find({
			product_receiver: req.params.id,
		});
		if (!feedback) {
			return res.status(400).json({ msg: 'No feedback found for this product' });
		}
		res.json(feedback);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*****************************************************************************************************
 * PUT REQUESTS
 *****************************************************************************************************/

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

// @route   POST api/products/upload/id
// @desc    Upload image and add it to product
// @access  Private
router.post('/upload/:id', auth, (req, res) => {
	upload(req, res, (err) => {
		//console.log("Request file ---", req.file); //Here you get file.
		let updatedProduct = null;
		if (!err) {
			async function updateProduct() {
				const product = await Product.findById(req.params.id);
				product.pics.push(req.file.filename);
				await product.save();
				updatedProduct = product;
			}
			updateProduct();
			res.json(updatedProduct);
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
// @desc    Feedback a product
// @access  Private
router.put('/feedback/:id', auth, async (req, res) => {
	try {
		// Check if user exists
		let product_receiver = await Product.findById(req.params.id);
		if (!product_receiver) {
			return res.status(404).json({ msg: 'Receiver product not found' });
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

		if (product_receiver.feedback.length > 0) {
			let feedbacks = product_receiver.feedback;
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
					product_receiver.feedback = feedbacks;
					await product_receiver.save();
					res.json(product_receiver.feedback.sort((a, b) => (a.date > b.date ? 1 : -1)));
				}
			});
		} else {
			const feedbacks = [];
			feedbacks.unshift(feedbackFields);
			product_receiver.feedback = feedbacks;
			await product_receiver.save();
			res.json(product_receiver.feedback.sort((a, b) => (a.date > b.date ? 1 : -1)));
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/products/visit/:id
// @desc    Update product visit
// @access  Public
router.put('/visit/:id', async (req, res) => {
	try {
		// Check if product exists
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ msg: 'Product not found' });
		}

		// Product Object
		const productFields = {};
		productFields.visits = product.visits;

		//Build Visit Object
		const visitFields = {};
		productFields.visits.unshift(visitFields);

		// Update
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: productFields },
			{ new: true }
		);
		res.json(updatedProduct);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/products/visit-auth/:id
// @desc    Update product visits
// @access  Private
router.put('/visit-auth/:id', auth, async (req, res) => {
	try {
		// Check if product exists
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ msg: 'Product not found' });
		}

		// Product Object
		const productFields = {};
		productFields.visits = product.visits;

		//Build Visit Object
		const visitFields = {};
		visitFields.user = req.user.id;
		productFields.visits.unshift(visitFields);

		// Update
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: productFields },
			{ new: true }
		);
		res.json(updatedProduct);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/products/feedback-response/product_id/feedback_id'
// @desc    Reply to Feedback
// @access  Private
router.put('/feedback-response/:product_id/:feedback_id', auth, async (req, res) => {
	try {
		// Check if user exists
		let product_receiver = await Product.findById(req.params.product_id);
		if (!product_receiver) {
			return res.status(404).json({ msg: 'Receiver product not found' });
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

		let productFeedback = product_receiver.feedback;
		// Check if feedback exists and modify it
		productFeedback.forEach(async (feed) => {
			if (feed._id.toString() === req.params.feedback_id.toString()) {
				feed.responses.push(responseFields);
				product_receiver.feedback = productFeedback;
				await product_receiver.save();
				res.json({ productFeedback: product_receiver.feedback, feedback: feed });
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/products/feedback-report/product_id/feedback_id'
// @desc    Report a Feedback
// @access  Private
router.put('/feedback-report/:product_id/:feedback_id', auth, async (req, res) => {
	try {
		// Check if user exists
		let product_receiver = await Product.findById(req.params.product_id);
		if (!product_receiver) {
			return res.status(404).json({ msg: 'Receiver product not found' });
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

		let productFeedback = product_receiver.feedback;
		// Check if feedback exists
		productFeedback.forEach(async (feed) => {
			if (feed._id.toString() === req.params.feedback_id.toString()) {
				feed.reports.push(reportFields);
				product_receiver.feedback = productFeedback;
				await product_receiver.save();
				res.json({ productFeedback: product_receiver.feedback, feedback: feed });
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/products/report/product_id'
// @desc    Report a Product
// @access  Private
router.put('/report/:product_id', auth, async (req, res) => {
	try {
		// Check if user exists
		let product_receiver = await Product.findById(req.params.product_id);
		if (!product_receiver) {
			return res.status(404).json({ msg: 'Receiver product not found' });
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

		let productReports = product_receiver.reports;
		productReports.unshift(reportFields);
		product_receiver.reports = productReports;
		await product_receiver.save();
		res.json(product_receiver);
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

// @route   GET api/products/sections
// @desc    Return product sections using id
// @access  Public
router.get('/sections/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(400).json({ msg: 'Product not found' });
		}
		const sections = await Section.find({
			product: req.params.id,
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

 // @route   POST api/products/picture/id
// @desc    Add img to product
// @access  Private
router.post('/picture/:id', auth, async (req, res) => {
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

		const { picture } = req.body;

		product.pics.push(picture);
		await product.save();

		res.json(product);

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/products/section/id
// @desc   Add section to product
// @access Private
router.post('/section/:id', auth, async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({ msg: 'Product not found' });
	}

	const { img, title, position, text, type } = req.body;

	// Build Section Object
	const sectionFields = {};

	sectionFields.user = req.user.id;
	sectionFields.product = req.params.id;
	if (img) sectionFields.img = img;
	if (title) sectionFields.title = title;
	if (position) sectionFields.position = position;
	if (text) sectionFields.text = text;
	if (type) sectionFields.type = type;

	const sections = await Section.find({
		product: req.params.id,
	});

	try {
		// if product has sections
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
			// update product
			product.sections.push(section);
			await product.save();

			// Updated Sections Positions
			const updatedSections = await Section.find({
				product: section.product,
			});
			res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
		} else {
			// Create section
			const section = new Section(sectionFields);
			await section.save();
			// update product
			product.sections.push(section);
			await product.save();
			// Updated Sections Positions
			const updatedSections = await Section.find({
				product: section.product,
			});
			res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/products/section/edit/id
// @desc   Edit Product Section
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
		product: section.product,
	});

	try {
		// if product has sections and position changed
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
				product: section.product,
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
				product: section.product,
			});

			res.json(updatedSections.sort((a, b) => (a.position > b.position ? 1 : -1)));
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/products/section/move/id
// @desc   Move product section position
// @access Private
router.post('/section/move/:id', auth, async (req, res) => {
	const section = await Section.findById(req.params.id);
	if (!section) {
		return res.status(404).json({ msg: 'Section not found' });
	}
	// Shop Sections
	const sections = await Section.find({
		product: section.product,
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
			product: section.product,
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

/************************************************************************************************************
 * Delete Request
 *************************************************************************************************************/

// @route   DELETE api/shop/section/:shop_id/:product_id
// @desc    Delete a Section from a product
// @access  Private
router.delete('/section/:product_id/:section_id', auth, async (req, res) => {
	try {
		const product = await Product.findById(req.params.product_id);
		if (!product) {
			return res.status(404).json({ msg: 'Product does not exist' });
		}
		//pullout section
		const section = await Section.findById(req.params.section_id);
		if (!section) {
			return res.status(404).json({ msg: 'Section does not exist' });
		}
		// Check user
		if (product.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		product.sections.remove(section);

		await product.save();
		await section.remove();

		// Updated Sections Positions
		const updatedSections = await Section.find({
			product: section.product,
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

module.exports = router;
