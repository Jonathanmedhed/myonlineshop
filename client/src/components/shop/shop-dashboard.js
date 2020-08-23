import React, { useEffect, useState, Fragment, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/** Components */
import Cart from '../cart/cart';
import ProductDashboard from '../product/product-dashboard';

/** Partials */
import DialogPrime from '../partials/dialog';
import Navbar from '../navbar/navbar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';
import { Rating } from 'primereact/rating';
import { TabView, TabPanel } from 'primereact/tabview';
import ChartComp from '../partials/chart';
import DataViewComp from '../partials/data-view';
import FeedbackComp from '../feedback/feedback';
import InfoSection from './info-section';
import ProductCreation from './product-creation';
import ItemEdition from '../partials/item-edition';
import LightBox from '../partials/light-box';
import ListBoxIMG from '../partials/list-box';
import Login from '../landing/_login';
import Register from '../landing/_register';
import TextArea from '../partials/text-area';
import JumboFooter from '../partials/jumbo-footer';
import PrimeSpinner from '../partials/spinner';
import Report from '../report/report';
import SectionCreation from './section-creation';
import ShopHeader from './shop-header';
import ShopCreation from '../user/shop-creation';
import TransactionView from '../transaction/transaction';
import Alert from '../alerts/alert';

/** Functions */
import {
	approveOrder,
	closeFeedback,
	closeProduct,
	closeTransaction,
	createProduct,
	createProductSection,
	createSection,
	deleteProduct,
	deleteShop,
	deleteSection,
	deleteTransaction,
	editShop,
	editShopSection,
	editProductSection,
	followShop,
	getOrder,
	getProduct,
	getProductChart,
	getProductToDelete,
	getShop,
	getTransaction,
	moveSection,
	rateShop,
	removeLogo,
	replyFeedback,
	reportFeedback,
	selectFeedback,
	selectReportFeedback,
	setOrderReady,
	setOrderDelivered,
	setOrderPaid,
	setCustomerView,
	swapImgSection,
	unFollowShop,
} from '../../actions/shop';
import { transProductsQtyById, getOrders } from '../../actions/utilities';
import { setAlert } from '../../actions/alerts';
import { logout } from '../../actions/auth';

const ShopDashboard = ({
	match,
	setAlert,
	auth: { isAuthenticated },
	closeFeedback,
	closeProduct,
	closeTransaction,
	createProduct,
	createProductSection,
	createSection,
	deleteProduct,
	deleteSection,
	deleteShop,
	deleteTransaction,
	editProductSection,
	editShop,
	editShopSection,
	followShop,
	logout,
	moveSection,
	getOrder,
	getProduct,
	getProductChart,
	getProductToDelete,
	getShop,
	getTransaction,
	rateShop,
	setCustomerView,
	unFollowShop,
	approveOrder,
	removeLogo,
	replyFeedback,
	reportFeedback,
	selectFeedback,
	selectReportFeedback,
	setOrderReady,
	setOrderDelivered,
	setOrderPaid,
	swapImgSection,
	shop: {
		createdProduct,
		currentFeedback,
		loading,
		product,
		shop,
		chartProduct,
		currentUser,
		feedback,
		hasProductSection,
		isOwner,
		isFollower,
		orderToShow,
		ordersApprove,
		ordersPrepare,
		ordersReady,
		ordersDelivered,
		products,
		productsInTransactions,
		productToDelete,
		sections,
		showFeedback,
		showReportFeedback,
		showProductDeletion,
		tags,
		transactions,
		type,
	},
}) => {
	// History
	let history = useHistory();

	// List References
	let contentRef = createRef();
	let feedbackRef = createRef();
	let feedbackVisitorRef = createRef();
	let ordersRef = createRef();
	let productsRef = createRef();
	let productSectionRef = createRef();
	let settingsRef = createRef();
	let statisticsRef = createRef();
	let transactionsRef = createRef();

	// show delete shop dialog
	const [showDeleteShop, setShowDeleteShop] = useState(false);
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
	// Quick Register
	const [showRegister, setShowRegister] = useState(false);
	// Quick Login
	const [showLogin, setShowLogin] = useState(false);
	// Submition loading
	const [submition, setSubmition] = useState(false);
	// Product Deletion
	const [success, setSuccess] = useState(false);
	// Create Product Suggestion
	const [productSuggestion, setProductSuggestion] = useState(true);
	// Create Section Suggestion
	const [sectionSuggestion, setSectionSuggestion] = useState(true);
	// Shop Creation
	const [shopCreation, setShopCreation] = useState(false);
	// Show Cart
	const [showCart, setShowCart] = useState(false);
	// Shopping Card Content
	const [cartContent, setCartContent] = useState([]);
	// Item Added to Cart
	const [itemAdded, setItemAdded] = useState(false);
	// ProductSelected (To show loading when product selected)
	const [productSelected, setProductSelected] = useState(false);
	// Edit Section
	const [editSection, setEditSection] = useState(false);
	const [sectionToEdit, setSectionToEdit] = useState(null);

	// Chart
	const [chartOption, setChartOption] = useState('Sold Items');
	const [productChartOption, setProductChartOption] = useState('Sold Items');

	const [visitor, setVisitor] = useState(false);
	//
	const [checked1, setChecked1] = useState(false);
	// Product Creation Dialog
	const [productCreation, setProductCreation] = useState(false);
	// Accordion
	const [activeIndex, setActiveIndex] = useState(null);
	// Tabs Statistics
	const [tabActiveIndex, setTabActiveIndex] = useState(0);
	// Tabs Orders
	const [tabActiveIndex2, setTabActiveIndex2] = useState(0);
	// Section Creation Dialog
	const [sectionCreation, setSectionCreation] = useState(false);
	// Change Shop Values States
	const [edit, setEdit] = useState(false);
	const [editField, setEditField] = useState(null);
	// Lightbox
	const [imgToShow, setImgToShow] = useState('');
	const [showLightBox, setShowLightBox] = useState(false);

	// Showing Transaction
	const [transactionToShow, setTransactionToShow] = useState(null);

	let [formData, setFormData] = useState({
		comment: '',
		stars: 5,
	});

	// Form Values Variables
	const { comment, stars } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Edit shop field
	const selectEdit = (field) => {
		setEditField(field);
		setEdit(true);
	};

	// Show create section dialog
	const showSectionDialog = (option) => {
		setSectionCreation(option);
		setEditSection(option);
	};

	// Set tab index for charts
	const setTabIndex = (index) => {
		setActiveIndex(index);
		return true;
	};

	// Action after header option selection
	// To move the view to the option selected
	const setHeaderOption = async (option) => {
		switch (option) {
			case 'content':
				setTabIndex(0);
				window.scrollTo(0, contentRef.current.offsetTop + 500);
				break;
			case 'orders':
				setActiveIndex(1);
				window.scrollTo(0, ordersRef.current.offsetTop + 500);
				break;
			case 'feedback':
				setActiveIndex(5);
				window.scrollTo(0, feedbackRef.current.offsetTop + 1500);
				break;
			case 'feedback-visitor':
				setActiveIndex(0);
				window.scrollTo(0, feedbackVisitorRef.current.offsetTop + 1500);
				break;
			case 'products':
				setActiveIndex(3);
				window.scrollTo(0, productsRef.current.offsetTop + 500);
				break;
			case 'product-section':
				window.scrollTo(0, productSectionRef.current.offsetTop + 500);
				break;
			case 'settings':
				setActiveIndex(6);
				window.scrollTo(0, settingsRef.current.offsetTop + 500);
				break;
			case 'statistics':
				setActiveIndex(2);
				window.scrollTo(0, statisticsRef.current.offsetTop + 500);
				break;
			case 'transactions':
				setActiveIndex(4);
				window.scrollTo(0, transactionsRef.current.offsetTop + 500);
				break;
			default:
				break;
		}
	};

	// Close product or cart dialogs
	const goBack = () => {
		closeProduct();
		setShowCart(false);
	};

	// Open create product and close product suggestion
	const acceptProductSuggestion = () => {
		setProductCreation(true);
		setProductSuggestion(false);
	};

	// Open create section and close section suggestion
	const acceptSectionSuggestion = () => {
		setSectionCreation(true);
		setSectionSuggestion(false);
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

	// Hide Dialog
	const hideOrderDialog = () => {
		setApprove(false);
		setPreparedDeliver(false);
		setPreparedPickup(false);
		setReady(false);
		setDelivered(false);
		setOrderRemoval(false);
		setOrderDeletion(false);
		setShowDeleteShop(false);
		closeFeedback();
	};

	// open 'move order' dialog
	const moveOrder = (order, type) => {
		// Close order opened
		setTransactionToShow(null);
		// Set order to be moved
		setCurrentOrderDialog(order);
		// Open dialog
		setOrderRemoval(true);
		// Change order status state
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
		// Set order to be deleted
		setCurrentOrderDialog(order);
		// Open dialog
		setOrderDeletion(true);
		// Change order status state
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

	useEffect(() => {
		getShop(match.params.id);
	}, [match.params.id, getShop]);
	return (
		<Fragment>
			{submition && <PrimeSpinner />}
			{/** Show Lightbox */}
			{showLightBox && imgToShow && <LightBox img={imgToShow} toggle={setShowLightBox} />}
			{/** Navbar */}
			<Navbar
				type={'shop'}
				view={
					currentUser && currentUser.shops_owned.length > 0 && isOwner
						? 'shop-owner'
						: currentUser && currentUser.shops_owned.length > 0
						? 'shop-owner-visitor'
						: isAuthenticated
						? 'not-shop-owner'
						: 'not-user'
				}
				history={history}
				user={currentUser}
				shops={currentUser && currentUser.shops_owned}
				shop={shop}
				products={products}
				selectOption={setHeaderOption}
				selectProduct={getProduct}
				isAuthenticated={isAuthenticated}
				loading={loading}
				logout={logout}
				toggleCreateShop={setShopCreation}
				hasProductSection={hasProductSection}
				unFollow={unFollowShop}
				follow={followShop}
				isFollower={isFollower}
				cartContent={cartContent}
				setShowCart={setShowCart}
				setCustomerView={setCustomerView}
				//setProduct={setProduct}
			/>
			<Fragment>
				{shop === null ? (
					<PrimeSpinner />
				) : (
					<Fragment>
						<section className="container">
							{/**
							 * Orders dialog, and algo repor and reply
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
										: showDeleteShop
										? 'Deletion'
										: showFeedback
										? 'Feedback'
										: showReportFeedback
										? 'Report'
										: 'Delivery'
								}
								visible={
									approve ||
									preparedDeliver ||
									preparedPickup ||
									ready ||
									delivered ||
									orderRemoval ||
									orderDeletion ||
									showDeleteShop ||
									showFeedback ||
									showReportFeedback
								}
								onHide={() => hideOrderDialog()}
							>
								{/** Order Apprival */}
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
								{/** Order Preparation */}
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
								{/** Order Readiness */}
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
								{/** Order delivered */}
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
								{/** Delete Shop */}
								{showDeleteShop && (
									<div className="message-button-sm">
										<div className="message">{'Delete ' + shop.name + '?'}</div>
										<div className="options">
											<button
												onClick={() => deleteShop(history, shop._id)}
												className="btn btn-danger"
											>
												Yes
											</button>
											<button onClick={() => hideOrderDialog()} className="btn btn-success">
												No
											</button>
										</div>
									</div>
								)}
								{/** Feedback component */}
								{showFeedback && (
									<FeedbackComp
										shop={shop}
										setCurrentFeedback={selectFeedback}
										feedback={currentFeedback}
										setAlert={setAlert}
										replyFeedback={replyFeedback}
									/>
								)}
								{/** Report Feedback */}
								{showReportFeedback && (
									<Report
										reportFeedback={reportFeedback}
										shop={shop}
										setCurrentFeedback={selectReportFeedback}
										feedback={currentFeedback}
										setAlert={setAlert}
										close={closeFeedback}
										type={'shop'}
									/>
								)}
								{/** Order Received */}
								{delivered && (
									<div className="message-button-sm">
										<div className="message">Payment Received?</div>
										<div className="options">
											<button
												onClick={() =>
													setOrderPaid(formData, currentOrderDialog._id, hideOrderDialog)
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
								{/** Move order */}
								{orderRemoval && (
									<div className="message-button-sm">
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
								{/** Delete order */}
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
							<Dialog
								header={'Login'}
								visible={showLogin && !isAuthenticated}
								onHide={() => setShowLogin(false)}
							>
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
							{/** Show Product Suggestion */}
							{isOwner && productSuggestion && products && products.length === 0 && (
								<div className="jumbo-dialog">
									<div onClick={() => setProductSuggestion(false)} className="dialog-exit">
										<i className="fas fa-times-circle"></i>
									</div>
									<img
										className="jumbo-dialog-img"
										src={require('../../img/showcase.jpg')}
										alt="background"
									></img>
									<div className="inner">
										<div className="text-container">
											<div className="message-button">
												<div className="message">What are you going to sell?</div>
												<button
													onClick={() => acceptProductSuggestion()}
													className="btn btn-success"
												>
													Add products to my Shop <i className="far fa-hand-point-left"></i>
												</button>
												<button
													onClick={() => setProductSuggestion(false)}
													className="btn btn-danger mt-1"
												>
													Later
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
							{/** Show Product Suggestion */}
							{isOwner && sectionSuggestion && sections && sections.length < 2 && (
								<div className="jumbo-dialog">
									<div onClick={() => setSectionSuggestion(false)} className="dialog-exit">
										<i className="fas fa-times-circle"></i>
									</div>
									<img
										className="jumbo-dialog-img"
										src={require('../../img/showcase.jpg')}
										alt="background"
									></img>
									<div className="inner">
										<div className="text-container">
											<div className="message-button">
												<div className="message">Make your shop stand out!</div>
												<button
													onClick={() => acceptSectionSuggestion()}
													className="btn btn-success"
												>
													Add sections to my Shop <i className="far fa-hand-point-left"></i>
												</button>
												<button
													onClick={() => setSectionSuggestion(false)}
													className="btn btn-danger mt-1"
												>
													Later
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
							{/** Show Product */}
							<Dialog header={'Product Information'} visible={product} onHide={() => closeProduct()}>
								<div className="big-dialog">
									<ProductDashboard
										closeProduct={closeProduct}
										shop={shop}
										productObject={product}
										isOwner={isOwner}
										setCurrentProduct={getProduct}
										setCartContent={setCartContent}
										cartContent={cartContent}
										setItemAdded={setItemAdded}
										transactionInfo={productsInTransactions}
										isAuthenticated={isAuthenticated}
										products={products}
										toggleRegister={setShowRegister}
										toggleLogin={setShowLogin}
										setSubmition={setSubmition}
										deleteProduct={deleteProduct}
									/>
								</div>
							</Dialog>
							{/**
							 * Cart
							 */}
							<Dialog header={'Shopping Cart'} visible={showCart} onHide={() => setShowCart(false)}>
								<Cart
									cartContent={cartContent}
									setCartContent={setCartContent}
									setShowCart={setShowCart}
									currentUser={currentUser}
									setAlert={setAlert}
									goBack={goBack}
									shop={shop}
									user={currentUser}
									history={history}
								/>
							</Dialog>
							{/** Product Added To Card */}
							{itemAdded && (
								<DialogPrime
									itemAdded={itemAdded}
									setItemAdded={setItemAdded}
									message="Item added to cart!"
									setShowCart={setShowCart}
									closeProduct={closeProduct}
								/>
							)}
							{/** Shop/Product Creation */}
							{shopCreation === true && (
								<ShopCreation toggle={setShopCreation} setAlert={setAlert} history={history} />
							)}
							{/** Edit Shop */}
							{edit === true && (
								<ItemEdition
									field={editField}
									item={shop}
									editShop={editShop}
									itemType={'shop'}
									setAlert={setAlert}
									toggle={setEdit}
									editShop={editShop}
									removeLogo={removeLogo}
								/>
							)}
							{/** Product Creation */}
							{productCreation === true && (
								<ProductCreation
									toggle={setProductCreation}
									itemType={'product'}
									setAlert={setAlert}
									shop_id={shop._id}
									setCurrentProduct={getProduct}
									createdProduct={createdProduct}
									createProduct={createProduct}
								/>
							)}
							{/** Section Creation */}
							{(sectionCreation === true || editSection === true) && (
								<SectionCreation
									createProductSection={createProductSection}
									deleteSection={deleteSection}
									editSection={editShopSection}
									editProductSection={editProductSection}
									history={history}
									toggle={showSectionDialog}
									setAlert={setAlert}
									item={shop}
									itemType={'shop'}
									setImg={setImgToShow}
									showImg={setShowLightBox}
									sectionToEdit={sectionToEdit}
									setSectionToEdit={setSectionToEdit}
									createSection={createSection}
									currentSections={sections}
								/>
							)}
							{/**
							 * Delete Product
							 */}
							<Dialog
								header={'Deletion'}
								visible={showProductDeletion}
								//onHide={() => setShowProductDeletion(false)}
							>
								{/** Options */}
								{!success && productToDelete && (
									<h1 className="text-center mt-1">
										Delete Product? {<div className="text-danger">{productToDelete.name}</div>}
									</h1>
								)}
								{/** Success Message */}
								{success && productToDelete && (
									<h1 className="text-center mt-1">
										{<div className="text-danger">{productToDelete.name}</div>} Product Deleted!
									</h1>
								)}
								{/** Submit and cancel/exit buttons */}
								<div className="form-group">
									<div className="buttons-form">
										{success ? (
											<Fragment>
												<button
													//onClick={() => setShowProductDeletion(false)}
													className="btn btn-success"
												>
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
												<button
													//onClick={() => setShowProductDeletion(false)}
													className="btn btn-primary"
												>
													Cancel
												</button>
											</Fragment>
										)}
									</div>
								</div>
							</Dialog>
							<div className="dashboard">
								{/** Top */}
								<div className="top-section bg-white">
									<div className={product || showCart ? 'sub-page-header' : 'jumbo-container'}>
										{/**
										 *  Header
										 */}
										<ShopHeader
											closeProduct={closeProduct}
											history={history}
											showCreateSection={setSectionCreation}
											isOwner={isOwner}
											logout={logout}
											setCustomerView={setCustomerView}
											setOption={setHeaderOption}
											shop={shop}
											user={currentUser}
											cartContent={cartContent}
											setShowCart={setShowCart}
											//setProduct={setProduct}
											goBack={goBack}
											toggleCreateProduct={setProductCreation}
											type={'shop'}
											view={
												currentUser && currentUser.shops_owned.length > 0 && isOwner
													? 'shop-owner'
													: currentUser && currentUser.shops_owned.length > 0 /**&& visitor*/
													? 'shop-owner-visitor'
													: currentUser &&
													  currentUser.shops_owned.length === 0 &&
													  (isOwner || visitor)
													? 'not-shop-owner'
													: 'not-user'
											}
											products={products}
											hasProductSection={hasProductSection}
											unFollow={unFollowShop}
											follow={followShop}
											isFollower={isFollower}
											cartContent={cartContent}
											setShowCart={setShowCart}
											//setProduct={setProduct}
										/>
										{!product && !showCart && (
											<Fragment>
												{/**Shop Loading Spinner if product selected */}
												{productSelected && <PrimeSpinner />}
												<img
													className="jumbo-showcase"
													src={
														shop.pic_jumbo
															? shop.pic_jumbo
															: require('../../img/showcase.jpg')
													}
													alt=""
												></img>
												<div className="inner">
													<div className="logo-showcase">
														{/** Show logo if has one */}
														{!isOwner && shop.pic_logo && (
															<img
																src={
																	shop.pic_logo
																		? shop.pic_logo
																		: require('../../img/logo-example.png')
																}
																alt=""
															></img>
														)}
														{/** Show logo option if owner mode */}
														{isOwner && (
															<img
																src={
																	shop.pic_logo
																		? shop.pic_logo
																		: require('../../img/logo-example.png')
																}
																alt=""
															></img>
														)}
														{isOwner && (
															<i
																onClick={() => selectEdit('Pic_Logo')}
																className="far fa-edit"
															></i>
														)}
													</div>
													{/** Shop Name */}
													<div className="text-container">
														<h1>{shop.name}</h1>
														{/** Edit option for owner */}
														{isOwner && (
															<i
																onClick={() => selectEdit('Name')}
																className="far fa-edit"
															></i>
														)}
													</div>
													{/** Show intro if has one */}
													{!isOwner && shop.intro && (
														<div className="text-container">
															<p>
																{shop.intro
																	? shop.intro
																	: 'Small shop description/slogan, products for sale or services to provide'}
																{/** Edit option for owner */}
																{isOwner && (
																	<i
																		onClick={() => selectEdit('Intro')}
																		className="far fa-edit"
																	></i>
																)}
															</p>
														</div>
													)}
													{/** Show intro option is owner mode */}
													{isOwner && (
														<div className="text-container">
															<p>
																{shop.intro
																	? shop.intro
																	: 'Small shop description/slogan, products for sale or services to provide'}
																{/** Edit option for owner */}
																{isOwner && (
																	<i
																		onClick={() => selectEdit('Intro')}
																		className="far fa-edit"
																	></i>
																)}
															</p>
														</div>
													)}
													<Alert />
												</div>
												{/** Edit button for jumbo */}
												{isOwner === true && (
													<div className="edit-button">
														{isOwner && (
															<i
																onClick={() => selectEdit('Pic_Jumbo')}
																className="far fa-edit"
															></i>
														)}
													</div>
												)}
												{/** Footer */}
												<JumboFooter
													isOwner={isOwner}
													//setShop={setShop}
													shop={shop}
													user={currentUser}
													goBack={goBack}
													selectEdit={selectEdit}
												/>
											</Fragment>
										)}
									</div>
								</div>
								{/** Show website sections to visitor */}
								{!isOwner && !showCart && (
									<Fragment>
										{sections &&
											sections.length > 0 &&
											sections
												.sort((a, b) => (a.position > b.position ? 1 : -1))
												.map((section) => (
													<InfoSection
														isOwner={isOwner}
														items={products}
														itemsType={'products'}
														reverse={false}
														section={section}
														setAlert={setAlert}
														setSectionToEdit={setSectionToEdit}
														moveSection={moveSection}
														setEdit={setEditSection}
														setCurrentProduct={getProduct}
														productSectionRef={productSectionRef}
														swapImgSection={swapImgSection}
														deleteSection={deleteSection}
													/>
												))}
									</Fragment>
								)}
								<Fragment>
									{/**
									 *  Tags and Type wih edit option
									 */}
									{isOwner && (!product || !showCart) ? (
										<Fragment>
											{/** Tags and Type */}
											<table className="tags-type">
												<tr className="inner">
													<th className="title">Tags</th>
													<td className="cell">
														<div className="tags">
															{shop.tags &&
																shop.tags.map((tag) => (
																	<div className="tag">{tag}</div>
																))}
														</div>
													</td>
													<td className="cell">
														<div
															onClick={() => selectEdit('Tags')}
															className="btn btn-danger"
														>
															Edit
														</div>
													</td>
												</tr>
												<tr className="inner">
													<th className="title">Type</th>
													<td className="cell">
														<div className="type-container">
															<div className="type">{shop.type}</div>
														</div>
													</td>
													<td className="cell">
														<div
															onClick={() => selectEdit('Type')}
															className="btn btn-danger"
														>
															Edit
														</div>
													</td>
												</tr>
											</table>
											{/**
											 *  Owner Accordion
											 * */}
											<Accordion
												activeIndex={activeIndex}
												onTabChange={(e) => setActiveIndex(e.index)}
											>
												{/** Website content */}
												<AccordionTab
													header={
														<div ref={contentRef}>
															<i class="far fa-window-maximize"></i> Website Content
														</div>
													}
												>
													<button
														onClick={() => setSectionCreation(true)}
														className="btn btn-primary mt-1"
													>
														Add Section
													</button>
													{sections &&
														sections.length > 0 &&
														sections
															.sort((a, b) => (a.position > b.position ? 1 : -1))
															.map((section) => (
																<InfoSection
																	isOwner={isOwner}
																	items={products}
																	itemsType={'products'}
																	reverse={false}
																	section={section}
																	setAlert={setAlert}
																	setSectionToEdit={setSectionToEdit}
																	moveSection={moveSection}
																	setEdit={setEditSection}
																	setCurrentProduct={getProduct}
																	swapImgSection={swapImgSection}
																	deleteSection={deleteSection}
																/>
															))}
												</AccordionTab>
												{/** Shop Orders */}
												<AccordionTab
													header={
														<div ref={ordersRef}>
															<i class="fas fa-clipboard-list ml-qter"></i> Orders
															Received
														</div>
													}
												>
													<Alert />
													<div>
														{/**
														 * Transaction View
														 */}
														{orderToShow ? (
															<TransactionView
																toggle={closeTransaction}
																transaction={orderToShow}
																openProduct={getProduct}
															/>
														) : (
															<TabView
																/** Order status categories */
																activeIndex={tabActiveIndex2}
																onTabChange={(e) => setTabActiveIndex2(e.index)}
															>
																{/** Orders to approve */}
																<TabPanel header="To Approve" leftIcon="far fa-clock">
																	{/**Transaction List */}
																	{ordersApprove && ordersApprove.length > 0 ? (
																		<Fragment>
																			<DataViewComp
																				items={ordersApprove}
																				setTransaction={getOrder}
																				type="orders-shop-approve"
																				setApprove={setApprove}
																				setCurrentOrderDialog={
																					setCurrentOrderDialog
																				}
																				moveOrder={moveOrder}
																				deleteOrder={deleteOrder}
																			/>
																		</Fragment>
																	) : (
																		<h1>No orders received</h1>
																	)}
																</TabPanel>
																{/** Orders to set as 'Ready' */}
																<TabPanel header="To Prepare" leftIcon="fas fa-wrench">
																	{/**Transaction List */}
																	{ordersPrepare && ordersPrepare.length > 0 ? (
																		<DataViewComp
																			items={ordersPrepare}
																			setTransaction={getOrder}
																			type="orders-shop-prepare"
																			setPreparedDeliver={setPreparedDeliver}
																			setPreparedPickup={setPreparedPickup}
																			setCurrentOrderDialog={
																				setCurrentOrderDialog
																			}
																			moveOrder={moveOrder}
																			deleteOrder={deleteOrder}
																		/>
																	) : (
																		<h1>No orders to prepare</h1>
																	)}
																</TabPanel>
																{/** Orders to deliver or for pick up */}
																<TabPanel header="Ready" leftIcon="fas fa-gift">
																	{/**Transaction List */}
																	{ordersReady && ordersReady.length > 0 ? (
																		<DataViewComp
																			items={ordersReady}
																			setTransaction={getOrder}
																			type="orders-shop-ready"
																			setReady={setReady}
																			setCurrentOrderDialog={
																				setCurrentOrderDialog
																			}
																			moveOrder={moveOrder}
																			deleteOrder={deleteOrder}
																		/>
																	) : (
																		<h1>No orders ready for delivery/pickup</h1>
																	)}
																</TabPanel>
																{/** Orders to delivered*/}
																<TabPanel
																	header="Delivered"
																	leftIcon="far fa-check-square"
																>
																	{/**Transaction List */}
																	{ordersDelivered && ordersDelivered.length > 0 ? (
																		<DataViewComp
																			items={ordersDelivered}
																			setTransaction={getOrder}
																			type="orders-shop-delivered"
																			setDelivered={setDelivered}
																			setCurrentOrderDialog={
																				setCurrentOrderDialog
																			}
																			moveOrder={moveOrder}
																			deleteOrder={deleteOrder}
																		/>
																	) : (
																		<h1>No recent orders delivered</h1>
																	)}
																</TabPanel>
															</TabView>
														)}
													</div>
												</AccordionTab>
												{/** Statistics */}
												<AccordionTab
													header={
														<div ref={statisticsRef}>
															<i class="fas fa-chart-line"></i> Statistics
														</div>
													}
												>
													<div>
														{/** Chart Categories */}
														<TabView
															activeIndex={tabActiveIndex}
															onTabChange={(e) => setTabActiveIndex(e.index)}
														>
															{/** Shop charts */}
															<TabPanel header="Shop Data" leftIcon="far fa-user">
																<div className="buttons-form-free mb-1">
																	{/** Options */}
																	<button
																		onClick={() => setChartOption('Sold Items')}
																		className={
																			chartOption === 'Sold Items'
																				? 'btn btn-dark'
																				: 'btn btn-primary'
																		}
																	>
																		Sold Items
																	</button>
																	<button
																		onClick={() => setChartOption('Income')}
																		className={
																			chartOption === 'Income'
																				? 'btn btn-dark'
																				: 'btn btn-primary'
																		}
																	>
																		Income
																	</button>
																</div>
																<ChartComp
																	data={transactions}
																	onlychart={true}
																	type={
																		chartOption === 'Sold Items'
																			? 'transactions'
																			: 'transactions-money'
																	}
																	title={chartOption}
																/>
															</TabPanel>
															{/** Product charts */}
															<TabPanel
																header="Products"
																leftIcon="fas fa-shopping-basket"
															>
																{products.length > 0 ? (
																	<div className="chart-search">
																		<div className="vertical">
																			<div className="buttons-form-free mb-1">
																				{/** Options */}
																				<button
																					onClick={() =>
																						setProductChartOption(
																							'Sold Items'
																						)
																					}
																					className={
																						productChartOption ===
																						'Sold Items'
																							? 'btn btn-dark'
																							: 'btn btn-primary'
																					}
																				>
																					Sold Items
																				</button>
																				<button
																					onClick={() =>
																						setProductChartOption('Visits')
																					}
																					className={
																						productChartOption === 'Visits'
																							? 'btn btn-dark'
																							: 'btn btn-primary'
																					}
																				>
																					Visits
																				</button>
																			</div>
																			<ChartComp
																				data={
																					productChartOption === 'Sold Items'
																						? productsInTransactions
																						: chartProduct.visits
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
																		{/** List with searchbox for products */}
																		<ListBoxIMG
																			itemType={'product'}
																			item={chartProduct}
																			setItem={getProductChart}
																			transactionsSold={transactions}
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
												{/** Shop products */}
												<AccordionTab
													header={
														<div ref={productsRef}>
															<i class="fas fa-boxes"></i> Products
														</div>
													}
												>
													<Alert />
													{/**Product List */}
													<button
														onClick={() => setProductCreation(true)}
														className="btn btn-primary mb-1"
													>
														<i className="fas fa-plus-circle mr-1"></i>Product
													</button>
													{products && products.length > 0 ? (
														<DataViewComp
															items={products}
															type="products"
															setCurrentProduct={getProduct}
															setProductToDelete={getProductToDelete}
														/>
													) : (
														<h1>Doesn't have any products</h1>
													)}
												</AccordionTab>
												{/** Transactions */}
												<AccordionTab
													header={
														<div ref={transactionsRef}>
															<i class="fas fa-hand-holding-usd"></i> Transactions
														</div>
													}
												>
													{/**
													 * Transaction View
													 */}
													{transactionToShow ? (
														<TransactionView
															toggle={closeTransaction}
															transaction={transactionToShow}
															openProduct={getProduct}
														/>
													) : (
														<Fragment>
															{/**Transaction List */}
															{!transactionToShow &&
															transactions &&
															transactions.length > 0 ? (
																<DataViewComp
																	items={transactions}
																	setTransaction={getTransaction}
																	type="transactions"
																/>
															) : (
																!transactionToShow && <h1>Haven't sold any items</h1>
															)}
														</Fragment>
													)}
												</AccordionTab>
												{/** Feedback */}
												<AccordionTab
													header={
														<div ref={feedbackRef}>
															<i class="fas fa-star-half-alt"></i> Feedback
														</div>
													}
												>
													{/**Review List */}
													<div className="accord-list">
														<Alert />
														<div className="review-section">
															{feedback && feedback.length > 0 ? (
																<DataViewComp
																	items={feedback}
																	type="feedback"
																	selectFeedback={selectFeedback}
																	selectReportFeedback={selectReportFeedback}
																/>
															) : (
																<h1>Haven't received feedback yet!</h1>
															)}
														</div>
													</div>
												</AccordionTab>
												{/** Settings */}
												<AccordionTab
													header={
														<div ref={settingsRef}>
															<i class="fas fa-cog"></i> Settings
														</div>
													}
												>
													<div className="big-items" ref={settingsRef}>
														{/**
														<div className="big-item">
															<div className="bold">Receive email notifications:</div>
															<InputSwitch
																checked={checked1}
																onChange={(e) => setChecked1(e.value)}
															/>
														</div>
														<div className="big-item mt-1">
															<div className="bold">Do something:</div>
															<InputSwitch
																checked={checked1}
																onChange={(e) => setChecked1(e.value)}
															/>
														</div>
														 */}
														<div className="big-item mt-1">
															<div className="bold">Delete Shop:</div>
															<button
																onClick={() => setShowDeleteShop(true)}
																className="btn btn-danger"
															>
																Delete
															</button>
														</div>
													</div>
												</AccordionTab>
											</Accordion>
										</Fragment>
									) : (
										<Accordion
											activeIndex={activeIndex}
											onTabChange={(e) => setActiveIndex(e.index)}
										>
											{/** Visitor's Accordion */}
											{/** Feedback */}
											<AccordionTab
												header={
													<div ref={feedbackVisitorRef}>
														<i class="fas fa-star-half-alt"></i>{' '}
														{!product ? 'Feedback' : 'Shop Feedback'}
													</div>
												}
											>
												<div className="accord-list">
													{/** Text area to leave review */}
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
															<Alert />
															<TextArea
																name="comment"
																value={comment}
																setValue={onChange}
															/>
															<button
																onClick={() => rateShop(formData, shop._id)}
																className="btn btn-primary my-1"
															>
																Leave Review
															</button>
														</div>
													)}
													{/** Login and register options*/}
													<div className="review-section">
														{!isAuthenticated && (
															<div className="mb-1">
																<div className="review-login-sug">
																	<div
																		onClick={() => setShowLogin(true)}
																		className="solid"
																	>
																		Login
																	</div>{' '}
																	or{' '}
																	<div
																		onClick={() => setShowRegister(true)}
																		className="solid"
																	>
																		register
																	</div>{' '}
																	to leave feedback
																</div>
															</div>
														)}
														{/** Feedback list */}
														{feedback && feedback.length > 0 ? (
															<DataViewComp
																items={feedback}
																type="feedback"
																selectFeedback={selectFeedback}
																selectReportFeedback={selectReportFeedback}
															/>
														) : (
															<h1>Haven't received feedback yet!</h1>
														)}
													</div>
												</div>
											</AccordionTab>
										</Accordion>
									)}
								</Fragment>
							</div>
						</section>
					</Fragment>
				)}
			</Fragment>
		</Fragment>
	);
};

ShopDashboard.propTypes = {
	approveOrder: PropTypes.func.isRequired,
	closeTransaction: PropTypes.func.isRequired,
	createdProduct: PropTypes.object.isRequired,
	createProductSection: PropTypes.func.isRequired,
	createSection: PropTypes.func.isRequired,
	currentFeedback: PropTypes.object.isRequired,
	deleteSection: PropTypes.func.isRequired,
	setOrderReady: PropTypes.func.isRequired,
	setOrderDelivered: PropTypes.func.isRequired,
	setOrderPaid: PropTypes.func.isRequired,
	closeFeedback: PropTypes.func.isRequired,
	closeProduct: PropTypes.func.isRequired,
	createProduct: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired,
	deleteProduct: PropTypes.func.isRequired,
	deleteShop: PropTypes.func.isRequired,
	deleteTransaction: PropTypes.func.isRequired,
	editProductSection: PropTypes.func.isRequired,
	editShop: PropTypes.func.isRequired,
	editShopSection: PropTypes.func.isRequired,
	followShop: PropTypes.func.isRequired,
	getOrder: PropTypes.func.isRequired,
	getProduct: PropTypes.func.isRequired,
	getProductChart: PropTypes.func.isRequired,
	getProductToDelete: PropTypes.func.isRequired,
	getShop: PropTypes.func.isRequired,
	getTransaction: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	moveSection: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	loading: PropTypes.object.isRequired,
	shop: PropTypes.object.isRequired,
	chartProduct: PropTypes.object.isRequired,
	feedback: PropTypes.array.isRequired,
	hasProductSection: PropTypes.bool.isRequired,
	isOwner: PropTypes.bool.isRequired,
	isFollower: PropTypes.bool.isRequired,
	orderToShow: PropTypes.object.isRequired,
	ordersApprove: PropTypes.array.isRequired,
	ordersPrepare: PropTypes.array.isRequired,
	ordersReady: PropTypes.array.isRequired,
	ordersDelivered: PropTypes.array.isRequired,
	products: PropTypes.array.isRequired,
	productsInTransactions: PropTypes.array.isRequired,
	productToDelete: PropTypes.object.isRequired,
	rateShop: PropTypes.func.isRequired,
	removeLogo: PropTypes.func.isRequired,
	replyFeedback: PropTypes.func.isRequired,
	reportFeedback: PropTypes.func.isRequired,
	sections: PropTypes.array.isRequired,
	selectFeedback: PropTypes.func.isRequired,
	selectReportFeedback: PropTypes.func.isRequired,
	showFeedback: PropTypes.bool.isRequired,
	showReportFeedback: PropTypes.bool.isRequired,
	showProductDeletion: PropTypes.bool.isRequired,
	setCustomerView: PropTypes.func.isRequired,
	swapImgSection: PropTypes.func.isRequired,
	tags: PropTypes.array.isRequired,
	transactions: PropTypes.array.isRequired,
	type: PropTypes.object.isRequired,
	unFollowShop: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	createdProduct: state.createdProduct,
	currentUser: state.currentUser,
	loading: state.loading,
	shop: state.shop,
	chartProduct: state.chartProduct,
	feedback: state.feedback,
	hasProductSection: state.hasProductSection,
	isOwner: state.isOwner,
	isFollower: state.isFollower,
	orderToShow: state.orderToShow,
	ordersApprove: state.ordersApprove,
	ordersPrepare: state.ordersPrepare,
	ordersReady: state.ordersReady,
	ordersDelivered: state.ordersDelivered,
	products: state.products,
	productsInTransactions: state.productsInTransactions,
	productToDelete: state.productDelete,
	replyFeedback: state.replyFeedback,
	reportFeedback: state.reportFeedback,
	sections: state.sections,
	showFeedback: state.showFeedback,
	showReportFeedback: state.showReportFeedback,
	showProductDeletion: state.showProductDeletion,
	tags: state.tags,
	transactions: state.transactions,
	type: state.type,
});

export default connect(mapStateToProps, {
	approveOrder,
	closeFeedback,
	closeTransaction,
	createProduct,
	createProductSection,
	createSection,
	removeLogo,
	replyFeedback,
	reportFeedback,
	selectFeedback,
	selectReportFeedback,
	setOrderReady,
	setOrderDelivered,
	setOrderPaid,
	setAlert,
	closeProduct,
	deleteProduct,
	deleteSection,
	deleteShop,
	deleteTransaction,
	editProductSection,
	editShop,
	editShopSection,
	followShop,
	getOrder,
	getProductChart,
	getTransaction,
	logout,
	moveSection,
	getProduct,
	getProductToDelete,
	getShop,
	rateShop,
	setCustomerView,
	swapImgSection,
	unFollowShop,
})(withRouter(ShopDashboard));
