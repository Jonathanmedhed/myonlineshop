import React, { Fragment, useEffect, useState, createRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Functions
import {
	createShop,
	closeFeedback,
	deleteUser,
	deleteTransaction,
	editUser,
	getCurrentUser,
	rateUser,
	getProductChart,
	getShopChart,
	getProduct,
	closeProduct,
	closeTransaction,
	getProductToDelete,
	deleteProduct,
	getShopToDelete,
	deleteShop,
	getTransactionPurchase,
	getTransactionSale,
	getOrderPurchase,
	getOrderSale,
	approveOrder,
	replyFeedback,
	reportFeedback,
	selectFeedback,
	selectReportFeedback,
	setOrderReady,
	setOrderDelivered,
	setOrderPaid,
} from '../../actions/user';
import { logout } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';
/** Components */
import Alert from '../alerts/alert';
import ProductDashboard from '../product/product-dashboard';
import TransactionView from '../transaction/transaction';
// Partials
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import FeedbackComp from '../feedback/feedback';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { Rating } from 'primereact/rating';
import { TabView, TabPanel } from 'primereact/tabview';
import ChartComp from '../partials/chart';
import DataViewComp from '../partials/data-view';
import ListBoxIMG from '../partials/list-box';
import Login from '../landing/_login';
import Register from '../landing/_register';
import Navbar from '../navbar/navbar';
import PrimeSpinner from '../partials/spinner';
import ProductCreation from '../shop/product-creation';
import Report from '../report/report';
import ShopCreation from './shop-creation';
import TextArea from '../partials/text-area';
import UserCard from './_user-card';
import UserData from './_user-data';

const UserDashboard = ({
	match,
	setAlert,
	closeFeedback,
	closeProduct,
	closeTransaction,
	createShop,
	deleteUser,
	deleteTransaction,
	deleteProduct,
	deleteShop,
	editUser,
	getCurrentUser,
	getShopChart,
	getShopToDelete,
	getOrderPurchase,
	getOrderSale,
	getProduct,
	getProductChart,
	getProductToDelete,
	getTransactionPurchase,
	getTransactionSale,
	approveOrder,
	replyFeedback,
	reportFeedback,
	selectFeedback,
	selectReportFeedback,
	setOrderReady,
	setOrderDelivered,
	setOrderPaid,
	rateUser,
	user: {
		user,
		loading,
		createdShop,
		currentFeedback,
		shops,
		products,
		feedback,
		isOwner,
		shop,
		transactionsSold,
		productToShow,
		productToDelete,
		product,
		productsInTransactions,
		shopToDelete,
		transactionToShowPurchase,
		transactionToShowSale,
		orderToShowPurchase,
		orderToShowSale,
		ordersApprovePurchase,
		ordersPreparePurchase,
		ordersReadyPurchase,
		ordersDeliveredPurchase,
		ordersApproveSale,
		ordersPrepareSale,
		ordersReadySale,
		ordersDeliveredSale,
		showFeedback,
		showReportFeedback,
	},
	auth: { isAuthenticated },
	logout,
}) => {
	// History
	let history = useHistory();
	// List References
	let topRef = createRef();
	let feedbackRef = createRef();
	let ordersSaleRef = createRef();
	let ordersPurchaseRef = createRef();
	let productsRef = createRef();
	let settingsRef = createRef();
	let shopsRef = createRef();
	let statisticsRef = createRef();
	let transPurchaseRef = createRef();
	let transSaleRef = createRef();
	// delete account state to show dialog
	const [deleteAccount, setDeleteAccount] = useState(false);
	// order deletion to show delete order dialog
	const [orderDeletion, setOrderDeletion] = useState(false);
	// order removal to show move order dialog
	const [orderRemoval, setOrderRemoval] = useState(false);
	// order type to modify
	const [orderType, setOrderType] = useState(null);
	// current order for dialog
	const [currentOrderDialog, setCurrentOrderDialog] = useState(null);
	// show approve dialog
	const [approve, setApprove] = useState(false);
	// show prepared delivery dialog
	const [preparedDeliver, setPreparedDeliver] = useState(false);
	// show prepared pickup dialog
	const [preparedPickup, setPreparedPickup] = useState(false);
	// show ready dialog
	const [ready, setReady] = useState(false);
	// show delivered dialog
	const [delivered, setDelivered] = useState(false);
	// show received dialog
	const [received, setReceived] = useState(false);
	//Quick Register
	const [showRegister, setShowRegister] = useState(false);
	//Quick Login
	const [showLogin, setShowLogin] = useState(false);

	// Submition loading
	const [submition, setSubmition] = useState(false);

	// Product Deletion
	const [showProductDeletion, setShowProductDeletion] = useState(false);
	const [success, setSuccess] = useState(false);
	const [currentProductToDelete, setCurrentProductToDelete] = useState(null);

	// Shop Deletion
	const [showShopDeletion, setShowShopDeletion] = useState(false);
	const [currentShopToDelete, setCurrentShopToDelete] = useState(null);
	const [shopSelected, setShopSelected] = useState(false);

	// Create Shop Suggestion
	const [shopSuggestion, setShopSuggestion] = useState(true);

	// Chart
	const [userChartOption, setUserChartOption] = useState('Sold Items');
	const [productChartOption, setProductChartOption] = useState('Sold Items');
	const [shopChartOption, setShopChartOption] = useState('Sold Items');
	const [transactionsBought, setTransactionsBought] = useState([]);

	// Accordion
	const [activeIndex, setActiveIndex] = useState(null);
	// Tabs Charts
	const [tabActiveIndex, setTabActiveIndex] = useState(0);
	// Tabs Orders Sale
	const [tabActiveIndex2, setTabActiveIndex2] = useState(0);
	// Tabs Orders Purchase
	const [tabActiveIndex3, setTabActiveIndex3] = useState(0);
	// Shop Creation
	const [shopCreation, setShopCreation] = useState(false);
	// Product Creation
	const [productCreation, setProductCreation] = useState(false);

	// Owner State (to show owner options)
	const [visitor, setVisitor] = useState(false);

	// Form data for feedback
	const [formData, setFormData] = useState({
		comment: '',
		stars: 5,
	});

	// Form Values Variables
	const { comment, stars } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Set tab index of charts
	const setTabIndex = (index) => {
		setActiveIndex(index);
		return true;
	};

	// Action after header option selection (move window to choice selected)
	const setHeaderOption = async (option) => {
		// show spinner
		setSubmition(true);
		switch (option) {
			case 'statistics':
				setActiveIndex(0);
				window.scrollTo(0, statisticsRef.current.offsetTop + 500);
				break;
			case 'shops':
				setActiveIndex(1);
				window.scrollTo(0, shopsRef.current.offsetTop + 500);
				break;
			case 'products':
				setActiveIndex(2);
				window.scrollTo(0, productsRef.current.offsetTop + 500);
				break;
			case 'orders-sale':
				setActiveIndex(3);
				window.scrollTo(0, ordersSaleRef.current.offsetTop + 500);
				break;
			case 'orders-purchase':
				setActiveIndex(4);
				window.scrollTo(0, ordersPurchaseRef.current.offsetTop + 500);
				break;
			case 'trans-sale':
				setActiveIndex(5);
				window.scrollTo(0, transSaleRef.current.offsetTop + 500);
				break;
			case 'trans-purchase':
				setActiveIndex(6);
				window.scrollTo(0, transPurchaseRef.current.offsetTop + 500);
				break;
			case 'feedback':
				setActiveIndex(7);
				window.scrollTo(0, feedbackRef.current.offsetTop + 500);
				break;
			case 'settings':
				setActiveIndex(8);
				window.scrollTo(0, settingsRef.current.offsetTop + 500);
				break;
			default:
				break;
		}
		// hide spinner
		setSubmition(false);
	};

	// Open shop creation and close shop suggestion
	const openShopCreation = () => {
		setShopSuggestion(false);
		setShopCreation(true);
	};

	// Set User after login
	const setAuthUser = async () => {
		window.location.reload(false);
		/** 
		try {
			const result = await getShop(match.params.id);
			let shopObject = result.data;

			const user = await getCurrentUser();
			await getShopTransactions(shop._id);
			// Set TransactionssetCurrentUser(user.data);
			//Set isOwner view if user is owner
			if (shop.user === user.data._id) {
				const transactions = await getShopTransactions(shop._id);
				// Set Transactions
				setTransactions(transactions.data);
				setIsOwner(true);

				//Set products for chart
				if (shop.products && transactions) {
					setChartProduct(products[0]);
					setProductsInTransactions(transProductsQtyById(transactions.data, shop.products[0]._id));
				}
			} else {
				setVisitor(user.data);
			}
			// Set isFollower
			user.data.shops_followed.forEach((shopFollowed) => {
				if (shopFollowed.shop === shop._id) {
					setIsFollower(true);
				}
			});
			// Update Visit Count
			if (user) {
				await getShopTransactions(shop._id);
				// Set TransactionsvisitShopAuth(match.params.id);
			} else {
				await getShopTransactions(shop._id);
				// Set TransactionsvisitShop(match.params.id);
			}
			setShop(shopObject);
		} catch (error) {}
		*/
	};

	// Hide order/feedback/report dialogs
	const hideOrderDialog = () => {
		setApprove(false);
		setDeleteAccount(false);
		setPreparedDeliver(false);
		setPreparedPickup(false);
		setReady(false);
		setDelivered(false);
		setOrderRemoval(false);
		setOrderDeletion(false);
		setReceived(false);
		closeFeedback();
	};

	// open 'move order' dialog
	const moveOrder = (order, type) => {
		// Close order opened
		closeTransaction();
		setCurrentOrderDialog(order);
		setOrderRemoval(true);
		switch (type) {
			case 'orders-shop-approve':
				setOrderType('orders-shop-approve');
				break;
			case 'orders-shop-prepare':
				setOrderType('orders-shop-prepare');
				break;
			case 'orders-shop-ready':
				setOrderType('orders-shop-ready');
				break;
			case 'orders-shop-delivered':
				setOrderType('orders-shop-delivered');
				break;
			default:
				break;
		}
	};

	// open 'delete order' dialog
	const deleteOrder = (order, type) => {
		// select order to delete
		setCurrentOrderDialog(order);
		// open dialog
		setOrderDeletion(true);
		// Set the type of the order
		switch (type) {
			case 'orders-shop-approve':
				setOrderType('orders-shop-approve');
				break;
			case 'orders-shop-prepare':
				setOrderType('orders-shop-prepare');
				break;
			case 'orders-shop-ready':
				setOrderType('orders-shop-ready');
				break;
			case 'orders-shop-delivered':
				setOrderType('orders-shop-delivered');
				break;
			default:
				break;
		}
	};

	if (!isAuthenticated) {
		return <Redirect to="/" />;
	}

	useEffect(() => {
		getCurrentUser();
	}, [getCurrentUser]);

	return loading && user === null ? (
		<PrimeSpinner />
	) : (
		<Fragment>
			{/** Navbar */}
			<Navbar
				view={
					shops.length > 0 && isOwner
						? 'shop-owner'
						: shops.length > 0 && visitor
						? 'shop-owner-visitor'
						: shops.length === 0 && (isOwner || visitor)
						? 'not-shop-owner'
						: 'not-user'
				}
				history={history}
				user={user}
				shops={shops}
				products={products}
				selectOption={setHeaderOption}
				//selectProduct={setCurrentProductToShow}
				isAuthenticated={isAuthenticated}
				loading={loading}
				logout={logout}
				toggleCreateShop={setShopCreation}
			/>
			<section className="container">
				{/**
				 * Orders dialog
				 */}
				<Dialog
					header={
						approve
							? 'Approval'
							: preparedDeliver || preparedPickup
							? 'Preparation'
							: ready
							? 'Ready'
							: orderRemoval
							? 'Move Order'
							: orderDeletion
							? 'Order Deletion'
							: deleteAccount
							? 'Close Account'
							: showFeedback
							? 'Feedback'
							: showReportFeedback
							? 'Report'
							: 'Delivery'
					}
					visible={
						approve ||
						deleteAccount ||
						showFeedback ||
						preparedDeliver ||
						preparedPickup ||
						ready ||
						delivered ||
						orderRemoval ||
						orderDeletion ||
						received ||
						showReportFeedback
					}
					onHide={() => hideOrderDialog()}
				>
					{/** Approve order options */}
					{approve && (
						<div className="message-button-sm">
							<div className="message">Approve Order?</div>
							<div className="options">
								<button
									onClick={() =>
										approveOrder(
											formData,
											null,
											currentOrderDialog._id,
											hideOrderDialog,
											setTabActiveIndex2
										)
									}
									className="btn btn-success"
								>
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
					{/** Delete account options */}
					{deleteAccount && (
						<div className="message-button-sm">
							<div className="message">Delete your account?</div>
							<div className="options">
								<button onClick={() => deleteUser(history)} className="btn btn-success">
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
					{/** Prepare for delivery order options */}
					{preparedDeliver && (
						<div className="message-button-sm">
							<div className="message">Order ready for delivery?</div>
							<div className="options">
								<button
									onClick={() =>
										setOrderReady(
											formData,
											null,
											currentOrderDialog._id,
											'delivery',
											hideOrderDialog,
											setTabActiveIndex2
										)
									}
									className="btn btn-success"
								>
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
					{/** Prepare for pick up order options */}
					{preparedPickup && (
						<div className="message-button-sm">
							<div className="message">Order ready for pick up?</div>
							<div className="options">
								<button
									onClick={() =>
										setOrderReady(
											formData,
											null,
											currentOrderDialog._id,
											'pickup',
											hideOrderDialog,
											setTabActiveIndex2
										)
									}
									className="btn btn-success"
								>
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
					{/** Delivered order options */}
					{ready && (
						<div className="message-button-sm">
							<div className="message">Order delivered?</div>
							<div className="options">
								<button
									onClick={() =>
										setOrderDelivered(
											formData,
											null,
											currentOrderDialog._id,
											hideOrderDialog,
											setTabActiveIndex2
										)
									}
									className="btn btn-success"
								>
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
					{/** Feedback component */}
					{showFeedback && (
						<FeedbackComp
							user={user}
							setCurrentFeedback={selectFeedback}
							replyFeedback={replyFeedback}
							feedback={currentFeedback}
							setAlert={setAlert}
						/>
					)}
					{/** Report feedback component */}
					{showReportFeedback && (
						<Report
							user={user}
							feedback={currentFeedback}
							setAlert={setAlert}
							type={'user'}
							reportFeedback={reportFeedback}
						/>
					)}
					{/** Payed order options */}
					{delivered && (
						<div className="message-button-sm">
							<div className="message">Payment Received?</div>
							<div className="options">
								<button
									onClick={() => setOrderPaid(formData, currentOrderDialog._id, hideOrderDialog)}
									className="btn btn-success"
								>
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
					{/** Received order options */}
					{received && (
						<div className="message-button-sm">
							<div className="message">Order Received?</div>
							<div className="options">
								<button
									onClick={() => setOrderPaid(formData, currentOrderDialog._id, hideOrderDialog)}
									className="btn btn-success"
								>
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
					{/** Move order options */}
					{orderRemoval && (
						<div className="message-button-sm">
							{/** change question depending on order type */}
							<div className="message">
								Move back to{' '}
								{orderType === 'orders-shop-prepare'
									? 'Order Approval'
									: orderType === 'orders-shop-ready'
									? 'Order Preparation'
									: orderType === 'orders-shop-delivered' && 'Order Ready'}
								?
							</div>
							<div className="options">
								<button
									onClick={() => {
										orderType === 'orders-shop-prepare'
											? approveOrder(
													formData,
													true,
													currentOrderDialog._id,
													hideOrderDialog,
													setTabActiveIndex2
											  )
											: orderType === 'orders-shop-ready'
											? setOrderReady(
													formData,
													true,
													currentOrderDialog._id,
													null,
													hideOrderDialog,
													setTabActiveIndex2
											  )
											: orderType === 'orders-shop-delivered' &&
											  setOrderDelivered(
													formData,
													true,
													currentOrderDialog._id,
													hideOrderDialog,
													setTabActiveIndex2
											  );
									}}
									className="btn btn-success"
								>
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
					{/** Delete order options */}
					{orderDeletion && (
						<div className="message-button-sm">
							<div className="message">Delete Order?</div>
							<div className="options">
								<button
									onClick={() => deleteTransaction(currentOrderDialog._id)}
									className="btn btn-success"
								>
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
				</Dialog>
				{/**
				 * Login
				 */}
				<Dialog header={'Login'} visible={showLogin && !isAuthenticated} onHide={() => setShowLogin(false)}>
					<Login
						quickLogin={true}
						toggleRegister={setShowRegister}
						toggle={setShowLogin}
						setAuthUser={setAuthUser}
					/>
				</Dialog>
				{/**
				 * Register
				 */}
				<Dialog
					header={'Register'}
					visible={showRegister && !isAuthenticated}
					onHide={() => setShowRegister(false)}
				>
					<Register
						quickRegister={true}
						toggleLogin={setShowLogin}
						toggle={setShowRegister}
						setAuthUser={setAuthUser}
					/>
				</Dialog>
				{/** Loading for product selection */}
				{(shopSelected || submition) && <PrimeSpinner />}
				{/** Create Shop suggestion */}
				{shopSuggestion && user && user.shops_owned.length === 0 && isOwner && (
					<div className="jumbo-dialog">
						<div onClick={() => setShopSuggestion(false)} className="dialog-exit">
							<i className="fas fa-times-circle"></i>
						</div>
						<img
							className="jumbo-dialog-img"
							src={require('../../img/showcase.jpg')}
							alt={'showcase'}
						></img>
						<div className="inner">
							<div className="text-container">
								<div className="message-button">
									<div className="message">Start Your Journey!</div>
									<button onClick={() => openShopCreation()} className="btn btn-success">
										Create My Online Shop <i className="far fa-hand-point-left"></i>
									</button>
									<button onClick={() => setShopSuggestion(false)} className="btn btn-danger mt-1">
										Later
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
				{/** Show Product */}
				<Dialog header={'Product Information'} visible={productToShow} onHide={() => closeProduct()}>
					<ProductDashboard
						goBack={closeProduct}
						setSubmition={setSubmition}
						productObject={productToShow}
						isOwner={isOwner}
						transactionInfo={transactionsSold}
						backButton={false}
						products={products}
						deleteProduct={deleteProduct}
					/>
				</Dialog>
				{/**
				 * Delete Product
				 */}
				<Dialog header={'Deletion'} visible={showProductDeletion} onHide={() => setShowProductDeletion(false)}>
					{/** Delete question, show product name */}
					{!success && currentProductToDelete && (
						<h1 className="text-center mt-1">
							Delete Product? {<div className="text-danger">{currentProductToDelete.name}</div>}
						</h1>
					)}
					{/** Success message, show deleted product's name */}
					{success && currentProductToDelete && (
						<h1 className="text-center mt-1">
							{<div className="text-danger">{currentProductToDelete.name}</div>} Product Deleted!
						</h1>
					)}
					{/** Delete options and exit button when success */}
					<div className="form-group">
						<div className="buttons-form">
							{success ? (
								<Fragment>
									<button onClick={() => setShowProductDeletion(false)} className="btn btn-success">
										Exit
									</button>
								</Fragment>
							) : (
								<Fragment>
									<button
										onClick={() => deleteProduct(productToDelete._id)}
										className="btn btn-danger"
									>
										Delete
									</button>
									<button onClick={() => setShowProductDeletion(false)} className="btn btn-primary">
										Cancel
									</button>
								</Fragment>
							)}
						</div>
					</div>
				</Dialog>
				{/**
				 * Delete Shop
				 */}
				<Dialog header={'Deletion'} visible={showShopDeletion} onHide={() => setShowShopDeletion(false)}>
					{/** Delete question, show shop name */}
					{!success && currentShopToDelete && (
						<h1 className="text-center mt-1">
							Delete Shop? {<div className="text-danger">{currentShopToDelete.name}</div>}
						</h1>
					)}
					{/** Success message, show deleted shop's name */}
					{success && currentShopToDelete && (
						<h1 className="text-center mt-1">
							{<div className="text-danger">{currentShopToDelete.name}</div>} Shop Deleted!
						</h1>
					)}
					{/** Delete options and exit button when success */}
					<div className="form-group">
						<div className="buttons-form">
							{success ? (
								<Fragment>
									<button onClick={() => setShowShopDeletion(false)} className="btn btn-success">
										Exit
									</button>
								</Fragment>
							) : (
								<Fragment>
									<button
										onClick={() => deleteShop(history, shopToDelete._id)}
										className="btn btn-danger"
									>
										Delete
									</button>
									<button onClick={() => setShowShopDeletion(false)} className="btn btn-primary">
										Cancel
									</button>
								</Fragment>
							)}
						</div>
					</div>
				</Dialog>
				{/** Shop/Product Creation */}
				{shopCreation === true && (
					<ShopCreation
						createShop={createShop}
						createdShop={createdShop}
						toggle={setShopCreation}
						setAlert={setAlert}
						history={history}
						//setShops={setShops}
						setSubmition={setSubmition}
					/>
				)}
				{/** Product Creation */}
				{productCreation === true && (
					<ProductCreation toggle={setProductCreation} setAlert={setAlert} history={history} />
				)}
				{/** Page title, show 'My account' if owner */}
				<h1 ref={topRef} className="page-title">
					{isOwner ? 'My Account' : 'User Information'}{' '}
				</h1>
				<div className="dashboard">
					{/** Alerts */}
					<Alert />
					{/** Top */}
					<div className="top-section-user">
						{/** Top Left */}
						<div className="m-auto">
							<UserCard
								user={user}
								//setCurrentUser={setCurrentUser}
								isOwner={isOwner}
								feedback={feedback}
								editUser={editUser}
							/>
						</div>
						{/** Top Right (Hide on mobile) */}
						<div className="m-auto hide-sm">
							<UserData
								user={user}
								isOwner={isOwner}
								shops={shops}
								products={products}
								feedback={feedback}
							/>
						</div>
						{/** Mobile user card hidden behind button */}
						<div className="show-sm mt-1">
							<Inplace closable={true}>
								<InplaceDisplay>More...</InplaceDisplay>
								<InplaceContent>
									<UserData
										user={user}
										isOwner={isOwner}
										shops={shops}
										products={products}
										feedback={feedback}
										noFeedback={true}
									/>
								</InplaceContent>
							</Inplace>
						</div>
					</div>
				</div>
				{/** Accordion */}
				{isOwner ? (
					<Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
						{/** Statistics */}
						<AccordionTab
							header={
								<div ref={statisticsRef}>
									<i className="fas fa-chart-line"></i> Statistics
								</div>
							}
						>
							<div>
								<TabView activeIndex={tabActiveIndex} onTabChange={(e) => setTabActiveIndex(e.index)}>
									{/** User Data Chart */}
									<TabPanel header="My Data" leftIcon="far fa-user">
										{/** Options (Hide on mobile) */}
										<div className="hide-sm">
											<div className="buttons-form-free">
												<button
													onClick={() => setUserChartOption('Purchased Items')}
													className={
														userChartOption === 'Purchased Items'
															? 'btn btn-dark'
															: 'btn btn-primary'
													}
												>
													Purchased Items
												</button>
												<button
													onClick={() => setUserChartOption('Sold Items')}
													className={
														userChartOption === 'Sold Items'
															? 'btn btn-dark'
															: 'btn btn-primary'
													}
												>
													Sold Items
												</button>
												<button
													onClick={() => setUserChartOption('Income')}
													className={
														userChartOption === 'Income'
															? 'btn btn-dark'
															: 'btn btn-primary'
													}
												>
													Income
												</button>
												<button
													onClick={() => setUserChartOption('Spendings')}
													className={
														userChartOption === 'Spendings'
															? 'btn btn-dark'
															: 'btn btn-primary'
													}
												>
													Spendings
												</button>
											</div>
										</div>
										{/** Options (mobile) */}
										<div className="show-sm">
											<div className="buttons-options">
												<button
													onClick={() => setUserChartOption('Purchased Items')}
													className={
														userChartOption === 'Purchased Items'
															? 'btn btn-dark'
															: 'btn btn-primary'
													}
												>
													Purchases
												</button>
												<button
													onClick={() => setUserChartOption('Sold Items')}
													className={
														userChartOption === 'Sold Items'
															? 'btn btn-dark'
															: 'btn btn-primary'
													}
												>
													Sales
												</button>
											</div>
											<div className="buttons-options mt-qter">
												<button
													onClick={() => setUserChartOption('Income')}
													className={
														userChartOption === 'Income'
															? 'btn btn-dark'
															: 'btn btn-primary'
													}
												>
													Income
												</button>
												<button
													onClick={() => setUserChartOption('Spendings')}
													className={
														userChartOption === 'Spendings'
															? 'btn btn-dark'
															: 'btn btn-primary'
													}
												>
													Spendings
												</button>
											</div>
										</div>
										{/** Chart */}
										<ChartComp
											data={
												userChartOption === 'Purchased Items' || userChartOption === 'Spendings'
													? transactionsBought
													: transactionsSold
											}
											onlychart={true}
											type={
												userChartOption === 'Purchased Items' ||
												userChartOption === 'Sold Items'
													? 'transactions'
													: 'transactions-money'
											}
											title={userChartOption}
										/>
									</TabPanel>
									{/** Shop data chart */}
									<TabPanel header="Shops" leftIcon="fas fa-shopping-cart">
										{/** Show if user has shops */}
										{shops.length > 0 ? (
											<div className="chart-search">
												<div className="vertical">
													{/** Options */}
													<div className="buttons-form-free mb-1">
														<button
															onClick={() => setShopChartOption('Sold Items')}
															className={
																shopChartOption === 'Sold Items'
																	? 'btn btn-dark'
																	: 'btn btn-primary'
															}
														>
															Sold Items
														</button>
														<button
															onClick={() => setShopChartOption('Visits')}
															className={
																shopChartOption === 'Visits'
																	? 'btn btn-dark'
																	: 'btn btn-primary'
															}
														>
															Visits
														</button>
													</div>
													{/** Chart */}
													<ChartComp
														data={
															shopChartOption === 'Sold Items'
																? shop && shop.transactions
																: shop && shop.visits
														}
														onlychart={true}
														type={
															shopChartOption === 'Sold Items'
																? 'shop-transactions'
																: 'shop-visits'
														}
														title={shopChartOption}
													/>
												</div>
												{/** List of selectable shops */}
												<ListBoxIMG
													itemType={'shop'}
													item={shop}
													setItem={getShopChart}
													items={shops}
												/>
											</div>
										) : (
											<h1>You don't have any shops</h1>
										)}
									</TabPanel>
									{/** Products data chart */}
									<TabPanel header="Products" leftIcon="fas fa-shopping-basket">
										{/** Show if user has products */}
										{products.length > 0 ? (
											<div className="chart-search">
												<div className="vertical">
													<div className="buttons-form-free mb-1">
														{/** options */}
														<button
															onClick={() => setProductChartOption('Sold Items')}
															className={
																productChartOption === 'Sold Items'
																	? 'btn btn-dark'
																	: 'btn btn-primary'
															}
														>
															Sold Items
														</button>
														<button
															onClick={() => setProductChartOption('Visits')}
															className={
																productChartOption === 'Visits'
																	? 'btn btn-dark'
																	: 'btn btn-primary'
															}
														>
															Visits
														</button>
													</div>
													{/** Chart */}
													<ChartComp
														data={
															productChartOption === 'Sold Items'
																? productsInTransactions
																: product.visits
														}
														onlychart={true}
														type={
															productChartOption === 'Sold Items'
																? 'products-sold'
																: 'product-visits'
														}
														title={productChartOption}
													/>
												</div>
												{/** List of selectable products */}
												<ListBoxIMG
													itemType={'product'}
													item={product}
													transactionsSold={transactionsSold}
													setItem={getProductChart}
													items={products}
												/>
											</div>
										) : (
											<h1>You don't have any products</h1>
										)}
									</TabPanel>
								</TabView>
							</div>
						</AccordionTab>
						{/** Shops List */}
						<AccordionTab
							header={
								<div ref={shopsRef}>
									<i className="fas fa-store"></i> Shops
								</div>
							}
						>
							{/** Create shop button */}
							<button onClick={() => setShopCreation(true)} className="btn btn-primary mb-1">
								<i className="fas fa-plus-circle mr-1"></i>New
							</button>
							<Alert />
							{/** Show if user has shops */}
							{shops.length > 0 ? (
								<DataViewComp items={shops} type="shops" setShopToDelete={getShopToDelete} />
							) : (
								<h1>You don't have any shops</h1>
							)}
						</AccordionTab>
						{/** Products List */}
						<AccordionTab
							header={
								<div ref={productsRef}>
									<i className="fas fa-boxes"></i> Products
								</div>
							}
						>
							<Alert />
							{/** Show if user has products */}
							{products.length > 0 ? (
								<DataViewComp
									items={products}
									setCurrentProduct={getProduct}
									setProductToDelete={getProductToDelete}
									type="products"
								/>
							) : (
								<h1>You don't have any products</h1>
							)}
						</AccordionTab>
						{/** Orders List (Sale) */}
						<AccordionTab
							header={
								<div ref={ordersSaleRef}>
									<i className="fas fa-clipboard-list mx-qter"></i> Orders (Sale)
								</div>
							}
						>
							<Alert />
							<div>
								{/**
								 * Transaction View Component
								 */}
								{orderToShowSale ? (
									<TransactionView
										toggle={closeTransaction}
										transaction={orderToShowSale}
										openProduct={getProduct}
										orderView={true}
									/>
								) : (
									<Fragment>
										{/** Orders by status tabs */}
										<TabView
											activeIndex={tabActiveIndex2}
											onTabChange={(e) => setTabActiveIndex2(e.index)}
										>
											{/** Orders to approve */}
											<TabPanel header="To Approve" leftIcon="far fa-clock">
												{/** Show list if there is any orders */}
												{ordersApproveSale && ordersApproveSale.length > 0 ? (
													<Fragment>
														<DataViewComp
															items={ordersApproveSale}
															setTransaction={getOrderSale}
															type="orders-shop-approve"
															setApprove={setApprove}
															setCurrentOrderDialog={setCurrentOrderDialog}
															moveOrder={moveOrder}
															deleteOrder={deleteOrder}
														/>
													</Fragment>
												) : (
													<h1>No orders received</h1>
												)}
											</TabPanel>
											{/** Orders to set as ready */}
											<TabPanel header="To Prepare" leftIcon="fas fa-wrench">
												{/** Show list if there is any orders */}
												{ordersPrepareSale && ordersPrepareSale.length > 0 ? (
													<DataViewComp
														items={ordersPrepareSale}
														setTransaction={getOrderSale}
														type="orders-shop-prepare"
														setPreparedDeliver={setPreparedDeliver}
														setPreparedPickup={setPreparedPickup}
														setCurrentOrderDialog={setCurrentOrderDialog}
														moveOrder={moveOrder}
														deleteOrder={deleteOrder}
													/>
												) : (
													<h1>No orders to prepare</h1>
												)}
											</TabPanel>
											{/** Orders to set as delivered */}
											<TabPanel header="Ready" leftIcon="fas fa-gift">
												{/** Show list if there is any orders */}
												{ordersReadySale && ordersReadySale.length > 0 ? (
													<DataViewComp
														items={ordersReadySale}
														setTransaction={getOrderSale}
														type="orders-shop-ready"
														setReady={setReady}
														setCurrentOrderDialog={setCurrentOrderDialog}
														moveOrder={moveOrder}
														deleteOrder={deleteOrder}
													/>
												) : (
													<h1>No orders ready for delivery/pickup</h1>
												)}
											</TabPanel>
											{/** Orders to set as payed */}
											<TabPanel header="Delivered" leftIcon="far fa-check-square">
												{/** Show list if there is any orders */}
												{ordersDeliveredSale && ordersDeliveredSale.length > 0 ? (
													<DataViewComp
														items={ordersDeliveredSale}
														setTransaction={getOrderSale}
														type="orders-shop-delivered"
														setDelivered={setDelivered}
														setCurrentOrderDialog={setCurrentOrderDialog}
														moveOrder={moveOrder}
														deleteOrder={deleteOrder}
													/>
												) : (
													<h1>No recent orders delivered</h1>
												)}
											</TabPanel>
										</TabView>
									</Fragment>
								)}
							</div>
						</AccordionTab>
						{/** Orders List (Purchase) */}
						<AccordionTab
							header={
								<div ref={ordersPurchaseRef}>
									<i className="fas fa-shopping-cart"></i> Orders (Purchase)
								</div>
							}
						>
							<Alert />
							<div>
								{/**
								 * Transaction View Component
								 */}
								{orderToShowPurchase ? (
									<TransactionView
										toggle={closeTransaction}
										transaction={orderToShowPurchase}
										openProduct={getProduct}
										orderView={true}
									/>
								) : (
									<Fragment>
										<TabView
											activeIndex={tabActiveIndex3}
											onTabChange={(e) => setTabActiveIndex3(e.index)}
										>
											{/** Orders to be approved */}
											<TabPanel header="To Approve" leftIcon="far fa-clock">
												{/** Show list if there is any orders */}
												{ordersApprovePurchase && ordersApprovePurchase.length > 0 ? (
													<Fragment>
														<DataViewComp
															items={ordersApprovePurchase}
															setTransaction={getOrderPurchase}
															type="orders-shop-approve"
															setApprove={setApprove}
															setCurrentOrderDialog={setCurrentOrderDialog}
															moveOrder={moveOrder}
															deleteOrder={deleteOrder}
															buyerView={true}
														/>
													</Fragment>
												) : (
													<h1>No orders made</h1>
												)}
											</TabPanel>
											{/** Orders to be prepared */}
											<TabPanel header="To Prepare" leftIcon="fas fa-wrench">
												{/** Show list if there is any orders */}
												{ordersPreparePurchase && ordersPreparePurchase.length > 0 ? (
													<DataViewComp
														items={ordersPreparePurchase}
														setTransaction={getOrderPurchase}
														type="orders-shop-prepare"
														setPreparedDeliver={setPreparedDeliver}
														setPreparedPickup={setPreparedPickup}
														setCurrentOrderDialog={setCurrentOrderDialog}
														moveOrder={moveOrder}
														deleteOrder={deleteOrder}
														buyerView={true}
													/>
												) : (
													<h1>No orders being prepared</h1>
												)}
											</TabPanel>
											{/** Orders to be set as ready for pickup/delivered */}
											<TabPanel header="Ready" leftIcon="fas fa-gift">
												{/** Show list if there is any orders */}
												{ordersReadyPurchase && ordersReadyPurchase.length > 0 ? (
													<DataViewComp
														items={ordersReadyPurchase}
														setTransaction={getOrderPurchase}
														type="orders-shop-ready"
														setReady={setReady}
														setCurrentOrderDialog={setCurrentOrderDialog}
														moveOrder={moveOrder}
														deleteOrder={deleteOrder}
														buyerView={true}
													/>
												) : (
													<h1>No orders ready for delivery/pickup</h1>
												)}
											</TabPanel>
											{/** Orders delivered */}
											<TabPanel header="Received" leftIcon="far fa-check-square">
												{/** Show list if there is any orders */}
												{ordersDeliveredPurchase && ordersDeliveredPurchase.length > 0 ? (
													<DataViewComp
														items={ordersDeliveredPurchase}
														setTransaction={getOrderPurchase}
														type="orders-shop-delivered"
														setReceived={setReceived}
														setCurrentOrderDialog={setCurrentOrderDialog}
														moveOrder={moveOrder}
														deleteOrder={deleteOrder}
														buyerView={true}
													/>
												) : (
													<h1>No recent orders received</h1>
												)}
											</TabPanel>
										</TabView>
									</Fragment>
								)}
							</div>
						</AccordionTab>
						{/** Transaction list (Sale) */}
						<AccordionTab
							header={
								<div ref={transSaleRef}>
									<i className="fas fa-hand-holding-usd"></i> Transactions (Sale)
								</div>
							}
						>
							{/**
							 * Transaction View Component
							 */}
							{transactionToShowSale ? (
								<TransactionView
									toggle={closeTransaction}
									transaction={transactionToShowSale}
									openProduct={getProduct}
								/>
							) : (
								<Fragment>
									{/** Show transactions if has any */}
									{!transactionToShowSale && transactionsSold && transactionsSold.length > 0 ? (
										<DataViewComp
											items={transactionsSold}
											setTransaction={getTransactionSale}
											type="transactions"
										/>
									) : (
										!transactionToShowSale && <h1>You haven't sold any items</h1>
									)}
								</Fragment>
							)}
						</AccordionTab>
						{/** Transaction list (Purchase) */}
						<AccordionTab
							header={
								<div ref={transPurchaseRef}>
									<i className="fas fa-wallet"></i> Transactions (Purchase)
								</div>
							}
						>
							{/**
							 * Transaction View Component
							 */}
							{transactionToShowPurchase ? (
								<TransactionView
									toggle={closeTransaction}
									transaction={transactionToShowPurchase}
									openProduct={getProduct}
								/>
							) : (
								<Fragment>
									{/** Show transactions if has any */}
									{!transactionToShowPurchase &&
									transactionsBought &&
									transactionsBought.length > 0 ? (
										<DataViewComp
											items={transactionsBought}
											setTransaction={getTransactionPurchase}
											type="transactions"
										/>
									) : (
										!transactionToShowPurchase && <h1>You haven't purchased any items</h1>
									)}
								</Fragment>
							)}
						</AccordionTab>
						{/** Feedback list */}
						<AccordionTab
							header={
								<div ref={feedbackRef}>
									<i className="fas fa-star-half-alt"></i> Feedback
								</div>
							}
						>
							<Alert />
							{/**Review List */}
							<div className="accord-list">
								{/** Show feedback if has received any */}
								{feedback && feedback.length > 0 ? (
									<Fragment>
										<DataViewComp
											selectFeedback={selectFeedback}
											selectReportFeedback={selectReportFeedback}
											items={feedback}
											type="feedback"
										/>
									</Fragment>
								) : (
									<h1>Haven't received feedback yet!</h1>
								)}
							</div>
						</AccordionTab>
						{/** Settings */}
						<AccordionTab
							header={
								<div ref={settingsRef}>
									<i className="fas fa-user-cog"></i> Settings
								</div>
							}
						>
							<div className="big-items">
								{/**
									<div className="big-item">
										<div className="bold">Do something:</div>
										<InputSwitch checked={checked1} onChange={(e) => setChecked1(e.value)} />
									</div>
									<div className="big-item mt-1">
										<div className="bold">Receive email notifications:</div>
										<InputSwitch checked={checked1} onChange={(e) => setChecked1(e.value)} />
									</div>
									 */}
								<div className="big-item mt-1">
									<div className="bold">Delete Account:</div>
									<button onClick={() => setDeleteAccount(true)} className="btn btn-danger">
										Delete
									</button>
								</div>
							</div>
						</AccordionTab>
					</Accordion>
				) : (
					<Fragment>
						{/** Accordion for visitors */}
						<Accordion>
							{/** Shops list */}
							<AccordionTab
								header={
									<div ref={shopsRef}>
										<i className="fas fa-store"></i> Shops
									</div>
								}
							>
								{/** Show shop list if has any */}
								<div className="card-list">
									{shops.length > 0 ? (
										<DataViewComp items={shops} type="shops" />
									) : (
										<h1>Doesn't have any shops</h1>
									)}
								</div>
							</AccordionTab>
							{/** Products list */}
							<AccordionTab
								header={
									<div ref={productsRef}>
										<i className="fas fa-boxes"></i> Products
									</div>
								}
							>
								{/** Show product list if has any */}
								<div className="card-list">
									{products.length > 0 ? (
										<DataViewComp items={products} setCurrentProduct={getProduct} type="products" />
									) : (
										<h1>Doesn't have any products</h1>
									)}
								</div>
							</AccordionTab>
							{/** Feedback list and textbox to leave one */}
							<AccordionTab
								header={
									<div ref={feedbackRef}>
										<i className="fas fa-star-half-alt"></i> Feedback
									</div>
								}
							>
								{/**Review Text area*/}
								<div className="accord-list">
									{!isOwner && isAuthenticated && (
										<div className="review-section">
											<Rating
												name="stars"
												value={stars}
												readonly={false}
												onChange={(e) => onChange(e)}
												stars={5}
												cancel={5}
											/>
											<TextArea name="comment" value={comment} setValue={onChange} />
											<Alert />
											<button
												onClick={() => rateUser(formData, user._id)}
												className="btn btn-primary my-1"
											>
												Leave Review
											</button>
										</div>
									)}
									{/** Login or register options */}
									<div className="review-section">
										{!isAuthenticated && (
											<div className="mb-1">
												<div className="review-login-sug">
													<div onClick={() => setShowLogin(true)} className="solid">
														Login
													</div>{' '}
													or{' '}
													<div onClick={() => setShowRegister(true)} className="solid">
														register
													</div>{' '}
													to leave feedback
												</div>
											</div>
										)}
										{/** Show feedback received if has any */}
										{feedback && feedback.length > 0 ? (
											<DataViewComp
												selectFeedback={selectFeedback}
												selectReportFeedback={selectReportFeedback}
												items={feedback}
												type="feedback"
											/>
										) : (
											<h1>Haven't received feedback yet!</h1>
										)}
									</div>
								</div>
							</AccordionTab>
						</Accordion>
					</Fragment>
				)}
			</section>
		</Fragment>
	);
};

UserDashboard.propTypes = {
	closeFeedback: PropTypes.func.isRequired,
	createShop: PropTypes.func.isRequired,
	createdShop: PropTypes.object.isRequired,
	currentFeedback: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	getCurrentUser: PropTypes.func.isRequired,
	getOrderPurchase: PropTypes.func.isRequired,
	getOrderSale: PropTypes.func.isRequired,
	getProduct: PropTypes.func.isRequired,
	getProductChart: PropTypes.func.isRequired,
	getProductToDelete: PropTypes.func.isRequired,
	getShopToDelete: PropTypes.func.isRequired,
	getTransactionPurchase: PropTypes.func.isRequired,
	getTransactionSale: PropTypes.func.isRequired,
	closeProduct: PropTypes.func.isRequired,
	closeTransaction: PropTypes.func.isRequired,
	deleteProduct: PropTypes.func.isRequired,
	deleteShop: PropTypes.func.isRequired,
	deleteTransaction: PropTypes.func.isRequired,
	deleteUser: PropTypes.func.isRequired,
	editUser: PropTypes.func.isRequired,
	getShopChart: PropTypes.func.isRequired,
	rateUser: PropTypes.func.isRequired,
	isOwner: PropTypes.bool.isRequired,
	approveOrder: PropTypes.func.isRequired,
	setOrderReady: PropTypes.func.isRequired,
	setOrderDelivered: PropTypes.func.isRequired,
	setOrderPaid: PropTypes.func.isRequired,
	orderToShowPurchase: PropTypes.object.isRequired,
	orderToShowSale: PropTypes.object.isRequired,
	ordersApprovePurchase: PropTypes.array.isRequired,
	ordersPreparePurchase: PropTypes.array.isRequired,
	ordersReadyPurchase: PropTypes.array.isRequired,
	ordersDeliveredPurchase: PropTypes.array.isRequired,
	ordersApproveSale: PropTypes.array.isRequired,
	ordersPrepareSale: PropTypes.array.isRequired,
	ordersReadySale: PropTypes.array.isRequired,
	ordersDeliveredSale: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	shops: PropTypes.array.isRequired,
	shop: PropTypes.object.isRequired,
	shopToDelete: PropTypes.object.isRequired,
	transactionsSold: PropTypes.array.isRequired,
	transactionToShowPurchase: PropTypes.object.isRequired,
	transactionToShowSale: PropTypes.object.isRequired,
	product: PropTypes.object.isRequired,
	productsInTransactions: PropTypes.array.isRequired,
	productToDelete: PropTypes.object.isRequired,
	productToShow: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired,
	feedback: PropTypes.array.isRequired,
	replyFeedback: PropTypes.func.isRequired,
	reportFeedback: PropTypes.func.isRequired,
	selectFeedback: PropTypes.func.isRequired,
	selectReportFeedback: PropTypes.func.isRequired,
	showFeedback: PropTypes.bool.isRequired,
	showReportFeedback: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	createdShop: state.createdShop,
	currentFeedback: state.currentFeedback,
	orderToShowPurchase: state.orderToShowPurchase,
	orderToShowSale: state.orderToShowSale,
	ordersApprovePurchase: state.ordersApprovePurchase,
	ordersPreparePurchase: state.ordersPreparePurchase,
	ordersReadyPurchase: state.ordersReadyPurchase,
	ordersDeliveredPurchase: state.ordersDeliveredPurchase,
	ordersApproveSale: state.ordersApproveSal,
	ordersPrepareSale: state.ordersPrepareSale,
	ordersReadySale: state.ordersReadySale,
	ordersDeliveredSale: state.ordersDeliveredSale,
	user: state.user,
	shops: state.shops,
	shop: state.shop,
	shopToDelete: state.shopToDelete,
	transactionToShowPurchase: state.transactionToShowPurchase,
	transactionToShowSale: state.transactionToShowSale,
	product: state.product,
	productsInTransactions: state.productsInTransactions,
	products: state.products,
	productToDelete: state.productToDelete,
	productToShow: state.productToShow,
	feedback: state.feedback,
	isOwner: state.isOwner,
	showFeedback: state.showFeedback,
	showReportFeedback: state.showReportFeedback,
	transactionsSold: state.transactionsSold,
});

export default connect(mapStateToProps, {
	closeFeedback,
	createShop,
	editUser,
	setAlert,
	logout,
	getCurrentUser,
	rateUser,
	getShopChart,
	getOrderPurchase,
	getOrderSale,
	getProduct,
	getProductChart,
	getProductToDelete,
	getShopToDelete,
	getTransactionPurchase,
	getTransactionSale,
	approveOrder,
	setOrderReady,
	setOrderDelivered,
	setOrderPaid,
	closeProduct,
	closeTransaction,
	deleteProduct,
	deleteTransaction,
	deleteUser,
	deleteShop,
	replyFeedback,
	reportFeedback,
	selectFeedback,
	selectReportFeedback,
})(UserDashboard);
