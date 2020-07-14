const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
// Connect Database
connectDB();
// Init middleware
app.use(express.json({ extended: false }));
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/feedback', require('./routes/api/feedback'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/shops', require('./routes/api/shops'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/users', require('./routes/api/users'));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
