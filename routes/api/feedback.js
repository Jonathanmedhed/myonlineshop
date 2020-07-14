const express = require('express');
const router = express.Router();

// Models
const Feedback = require('../../models/Feedback');

const auth = require('../../middleware/auth');

// @route   GET api/user/feedback
// @desc    return request user feedback
// @access  Public
router.get('/', auth, async (req, res) => {
	try {
		const feedback = await Feedback.find({
			user_receiver: req.user.id,
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

module.exports = router;
