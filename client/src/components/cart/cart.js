import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

/** Functions */
import { createTransaction, sendEmail } from '../../actions/requests';
import { createEmail } from '../../actions/utilities';
/** Partials */
import Alert from '../alerts/alert';
import DataViewComp from '../partials/data-view';
import { Dialog } from 'primereact/dialog';
import PrimeSpinner from '../partials/spinner';
import Table from '../partials/table';
import { InputTextarea } from 'primereact/inputtextarea';

const Cart = ({ cartContent, setCartContent, setShowCart, currentUser, setAlert, shop, user, history }) => {
	// Review email
	const [reviewEmail, setReviewEmail] = useState(false);
	// Payment Attempt
	const [paymentAttempt, setPaymentAttempt] = useState(false);
	// Payment State
	const [paymentDone, setPaymentDone] = useState(false);
	// Transaction View
	const [transactionView, setTransactionView] = useState(false);
	// Transaction Result Content
	const [transactionContent, setTransactionContent] = useState([]);
	// Calculate Total and Tax
	let net_total = 0;
	let taxes = 0;

	if (cartContent) {
		cartContent.forEach((item) => {
			net_total = net_total + item.price * item.quantity;
		});
		taxes = net_total * 0.15;
		net_total = net_total * 1.15;
	}

	let [formData, setFormData] = useState({
		products: cartContent ? cartContent : [],
		tax: cartContent ? taxes : 0,
		total: cartContent ? net_total : 0,
		emailToSend: cartContent ? createEmail(shop, cartContent, user) : [],
	});

	// Form Values Variables
	const { paid, products, tax, total, emailToSend } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Remove Item from Cart
	const removeFromCart = async (product) => {
		setCartContent(cartContent.filter((item) => item._id !== product._id));
		setAlert('Item Removed', 'success');
	};

	// Send email to shop
	const emailSubmition = async (transaction) => {
		let email = shop.email;
		let subject = 'Shop: ' + shop.name + 'Order: ' + transaction._id;
		let text = emailToSend;
		//await sendEmail(email, subject, text);
		setPaymentDone(true);
	};

	// Create Transaction
	const createTrans = async () => {
		setPaymentAttempt(true);
		if (!cartContent[0].shop) {
			setAlert('No Shop Found', 'error');
		}
		if (!cartContent[0].user) {
			setAlert('No Seller(User) Found', 'error');
		}
		if (!currentUser._id) {
			setAlert('No Buyer Found', 'error');
		}
		const transaction = await createTransaction(formData, cartContent[0].shop._id);
		if (transaction.status === 200) {
			setPaymentDone(true);
			// Send email to shop owner
			emailSubmition(transaction.data);
			setAlert('Order Placed', 'success');
			// Update transaction info
			await setTransactionContent(cartContent);
			setReviewEmail(false);
			// Clear Cart
			setCartContent([]);
		}
		setPaymentAttempt(false);
	};

	return (
		<Fragment>
			{
				cartContent.length === 0 &&
					transactionContent.length === 0 &&
					setShowCart(false) /** Return home is cart is empty */
			}
			{/**
			 * Review order email
			 */}
			<Dialog header={'Order'} visible={reviewEmail} onHide={() => setReviewEmail(false)}>
				<h1 className="text-center mb-half">Order Message</h1>
				<div className="email-text">
					<div class="pull-tab"></div>
					<InputTextarea
						autoResize={false}
						name="emailToSend"
						value={emailToSend}
						onChange={(e) => onChange(e)}
						rows={15}
						cols={40}
					></InputTextarea>
				</div>
				<div className="form-group">
					<div className="buttons-form">
						<Fragment>
							<button onClick={() => createTrans()} className="btn btn-success">
								Send
							</button>
							<button onClick={() => setReviewEmail(false)} className="btn btn-danger">
								Cancel
							</button>
						</Fragment>
					</div>
				</div>
			</Dialog>
			<div className="p-1">
				{paymentAttempt && <PrimeSpinner />}
				{/** Change title depending on data */}
				<Alert />
				<div className="dashboard">
					{/** List of products with pic and stuff*/}
					<div className="hide-sm">
						<div className="cart">
							{!paymentDone && (
								<DataViewComp
									items={cartContent}
									type="products-checkout"
									transactionView={transactionView}
									removeItem={removeFromCart}
								/>
							)}
							{/** Payment succesful message */}
							<div className="cart-invoice">
								{paymentDone && (
									<div className="payment-message">
										<i class="fas fa-check-circle fa-5x text-success"></i>
										<h1>Order Placed</h1>
										<div>
											<strong>{shop.name}</strong> will contact you shortly to arrange{' '}
											<strong>payment</strong> and <strong>delivery</strong> of the products.
										</div>
										<div onClick={() => history.replace('/user')} className="btn btn-success mt-1">
											Check Orders
										</div>
									</div>
								)}
								{/** Product and Amount to pay breakdown */}
								<h1 className="page-title mt-1">Payment Breakdown</h1>
								<div className="inner">
									<Table
										data={'products'}
										list={paymentDone ? transactionContent : cartContent}
										headers={['Name', 'Price', 'Quantity', 'Total']}
										wOptions={!paymentDone && true}
										wSearch={false}
										transactionView={transactionView}
										selectItem={removeFromCart}
									/>
									{(!paymentDone || transactionView) && (
										<div className="buttons-form-free-center mt-1">
											<button onClick={() => setShowCart(false)} className="btn btn-danger">
												Cancel
											</button>
											{/** 
										<button className="btn btn-caution">Save</button>
										*/}
											{!paymentAttempt ? (
												<button
													onClick={() => setReviewEmail(true)}
													className="btn btn-success"
												>
													Place Order
												</button>
											) : (
												<button className="btn btn-dark">Processing...</button>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="show-sm">
						<div className="cart-mobile">
							{!paymentDone && (
								<DataViewComp
									items={cartContent}
									type="products-checkout"
									transactionView={transactionView}
									removeItem={removeFromCart}
								/>
							)}
							{/** Payment succesful message */}
							<div className="cart-invoice">
								{paymentDone && (
									<div className="payment-message">
										{paymentDone && (
											<div className="payment-message">
												<i class="fas fa-check-circle fa-5x text-success"></i>
												<h1>Order Placed</h1>
												<div>
													<strong>{shop.name}</strong> will contact you shortly to arrange{' '}
													<strong>payment</strong> and <strong>delivery</strong> of the
													products.
												</div>
												<div
													onClick={() => history.replace('/user')}
													className="btn btn-success mt-1"
												>
													Check Orders
												</div>
											</div>
										)}
									</div>
								)}
								{/** Product and Amount to pay breakdown */}
								<h1 className="page-title mt-1">Payment Breakdown</h1>
								<div className="inner">
									<Table
										data={'products-mobile'}
										list={paymentDone ? transactionContent : cartContent}
										headers={['Name', 'Price x Quantity', 'Total']}
										wOptions={!paymentDone && true}
										wSearch={false}
										transactionView={transactionView}
										selectItem={removeFromCart}
									/>
									{(!paymentDone || transactionView) && (
										<div className="buttons-form-free-center my-1">
											<button className="btn btn-danger">Cancel</button>
											{/** 
										<button className="btn btn-caution">Save</button>
										*/}
											{!paymentAttempt ? (
												<button
													onClick={() => setReviewEmail(true)}
													className="btn btn-success"
												>
													Place Order
												</button>
											) : (
												<button className="btn btn-dark">Processing...</button>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Cart.propTypes = {
	history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	history: state.history,
});

export default withRouter(Cart);
