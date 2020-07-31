import React, { useEffect, useState, Fragment, createRef } from 'react';
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
	deleteTransaction,
	deleteShop,
	editTransaction,
	followShop,
	unFollowShop,
	getShop,
	getShopByName,
	getShopProducts,
	getShopTransactions,
	getCurrentUser,
	getSections,
	rateShop,
	getProduct,
	getProductSections,
	deleteShopProduct,
	rateProduct,
	visitShop,
	visitShopAuth,
	getShopFeedback,
	getProductFeedback,
	getTransaction,
	editShop,
} from '../../actions/requests';
import { transProductsQtyById, getOrders } from '../../actions/utilities';
import { setAlert } from '../../actions/alerts';
import { logout } from '../../actions/auth';

const ShopDashboard = ({ history, match, setAlert, auth: { isAuthenticated, loading }, logout }) => {
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

	// show report feedback
	const [showReportFeedback, setShowReportFeedback] = useState(false);
	// show reply feedback
	const [showFeedback, setShowFeedback] = useState(false);
	const [currentFeedback, setCurrentFeedback] = useState(null);
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
	// Orders to approve
	const [ordersApprove, setOrdersApprove] = useState([]);
	// Orders to prepare
	const [ordersPrepare, setOrdersPrepare] = useState([]);
	// Orders that are ready
	const [ordersReady, setOrdersReady] = useState([]);
	// Orders delivered
	const [ordersDelivered, setOrdersDelivered] = useState([]);
	// Quick Register
	const [showRegister, setShowRegister] = useState(false);
	// Quick Login
	const [showLogin, setShowLogin] = useState(false);
	// Tags
	const [tags, setTags] = useState([]);
	// Tags
	const [type, setType] = useState(null);
	// Submition loading
	const [submition, setSubmition] = useState(false);
	// Visitor is follower
	const [isFollower, setIsFollower] = useState(false);
	// Has Products Section
	const [hasProductSection, setHasProductSection] = useState(false);
	// Product Deletion
	const [showProductDeletion, setShowProductDeletion] = useState(false);
	const [success, setSuccess] = useState(false);
	const [currentProductToDelete, setCurrentProductToDelete] = useState(null);
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
	// Logged in User
	const [currentUser, setCurrentUser] = useState(null);
	// Current Product
	const [product, setProduct] = useState(null);
	// ProductSelected (To show loading when product selected)
	const [productSelected, setProductSelected] = useState(false);
	// Edit Section
	const [editSection, setEditSection] = useState(false);
	const [sectionToEdit, setSectionToEdit] = useState(null);

	// Chart
	const [chartOption, setChartOption] = useState('Sold Items');
	const [productsInTransactions, setProductsInTransactions] = useState([]);
	const [chartProduct, setChartProduct] = useState(null);
	const [productChartOption, setProductChartOption] = useState('Sold Items');

	/** Shop Data */
	const [shop, setShop] = useState(null);
	// Feedback
	const [feedback, setFeedback] = useState([]);
	// Products
	const [products, setProducts] = useState([]);
	// Sections
	const [sections, setSections] = useState([]);
	// Transactions
	const [transactions, setTransactions] = useState([]);

	// (set view for costumer orshop owner)
	const [isOwner, setIsOwner] = useState(false);
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

	// Showing Order
	const [orderToShow, setOrderToShow] = useState(null);

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

	// Rate shop
	const onRate = async () => {
		const feedBackGiven = await rateShop(formData, shop._id);
		if (feedBackGiven) {
			setFeedback(feedBackGiven.data);
		}
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

	// Get product and open product dialog
	const setCurrentProduct = async (id) => {
		// Remove current product
		setProduct(null);
		setProductSelected(true);
		const result = await getProduct(id);
		let productObject = result.data;
		// Get Sections
		const productSections = await getProductSections(id);
		productObject.sections = productSections.data;
		setProduct(productObject);
		setProductSelected(false);
		// Set Chart Data
		if (transactions) {
			setProductsInTransactions(transProductsQtyById(transactions, id));
		}
		setChartProduct(productObject);
	};
	/**
	 * Set the product to delete and open dialog
	 */
	const setProductToDelete = async (id) => {
		// show spinner
		setSubmition(true);
		setSuccess(false);
		setProductSelected(true);
		const result = await getProduct(id);
		if (result.status !== 200) {
			setAlert('Product not found', 'error');
		}
		// Set product
		setCurrentProductToDelete(result.data);
		setProductSelected(false);
		// Open dialog
		setShowProductDeletion(true);
		// Hide spinner
		setSubmition(false);
	};

	/**
	 * Delete a product
	 */
	const productDelete = async (id) => {
		// show spinner
		setSubmition(true);
		const result = await deleteShopProduct(id);
		if (result.status === 200) {
			setSuccess(true);
			// Update products
			setProducts(result.data);
			setAlert('Product Deleted', 'success');
		} else {
			setAlert('Deletion Failed', 'error');
		}
		// hide spinner
		setSubmition(false);
	};

	// Close product or cart dialogs
	const goBack = () => {
		setProduct(null);
		setShowCart(false);
	};

	// Set current product for chart
	const setCurrentChartProduct = async (product) => {
		if (product) {
			setSubmition(true);
			if (transactions) {
				setProductsInTransactions(transProductsQtyById(transactions, product._id));
			}
			setChartProduct(product);
			setSubmition(false);
		}
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

	// Set current transaction to show
	const setCurrentTransaction = async (id) => {
		// show spinner
		setSubmition(true);
		const result = await getTransaction(id);
		setTransactionToShow(result.data);
		// hide spinner
		setSubmition(false);
	};

	// Set current order to show
	const setCurrentOrder = async (id) => {
		// show spinner
		setSubmition(true);
		const result = await getTransaction(id);
		setOrderToShow(result.data);
		// hide spinner
		setSubmition(false);
	};

	// Follow Shop
	const followCurrentShop = async () => {
		// show spinner
		setSubmition(true);
		const result = await followShop(shop._id);
		if (result.status === 200) {
			// update is follower state
			setIsFollower(true);
			setAlert('Following shop', 'success');
		} else {
			setAlert('Something went wrong', 'error');
		}
		// hide spinner
		setSubmition(false);
	};

	// Unfollow Shop
	const unfollowCurrentShop = async () => {
		// show spinner
		setSubmition(true);
		const result = await unFollowShop(shop._id);
		if (result.status === 200) {
			// update is follower state
			setIsFollower(false);
			setAlert('Unfollowing shop', 'success');
		} else {
			setAlert('Something went wrong', 'error');
		}
		// hide spinner
		setSubmition(false);
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
		setShowFeedback(false);
		setShowReportFeedback(false);
	};

	// Approve order or reverse approval
	const approveOrder = async (reverse) => {
		// Close order opened
		setTransactionToShow(null);
		// show spinner
		setSubmition(true);
		// Clear form data
		formData.ready_f_pickup = null;
		formData.ready_f_delivery = null;
		formData.delivered = null;
		formData.paid = null;
		// set false if revelsal
		if (reverse) {
			formData.approved = false;
		} else {
			formData.approved = true;
		}
		// Edit Order
		const orderApproved = await editTransaction(formData, currentOrderDialog._id);
		if (orderApproved.status === 200) {
			// if reverse remove from approved else add to approved
			if (reverse) {
				// get index of order
				var removeIndex = ordersPrepare
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersPrepare.splice(removeIndex, 1);
				// add to prepare
				ordersApprove.unshift(orderApproved.data);
				setAlert('Order Unapproved!', 'success');
				hideOrderDialog();
				// go back if reversal
				if (reverse) {
					setTabActiveIndex2(0);
				} else {
					setTabActiveIndex2(1);
				}
			} else {
				// get index of order
				var removeIndex = ordersApprove
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersApprove.splice(removeIndex, 1);
				// add to prepare
				ordersPrepare.unshift(orderApproved.data);
				setAlert('Order Approved!', 'success');
				hideOrderDialog();
				// go back if reversal
				if (reverse) {
					setTabActiveIndex2(0);
				} else {
					setTabActiveIndex2(1);
				}
			}
		} else {
			setAlert('Approval Failed!', 'error');
		}
		// hidespinner
		setSubmition(false);
	};

	// Set order as ready or reverse ready
	const readyOrder = async (option, reverse) => {
		// Close order opened
		setTransactionToShow(null);
		// show spinner
		setSubmition(true);
		// Clear form data
		formData.ready_f_pickup = null;
		formData.ready_f_delivery = null;
		formData.delivered = null;
		formData.paid = null;
		// set false if revelsal
		if (reverse) {
			formData.ready_f_pickup = false;
			formData.ready_f_delivery = false;
		} else {
			if (option === 'delivery') {
				formData.ready_f_delivery = true;
			} else {
				formData.ready_f_pickup = true;
			}
		}
		// Edit Order
		const orderReady = await editTransaction(formData, currentOrderDialog._id);
		if (orderReady.status === 200) {
			// if reverse remove from ready else add to prepare
			if (reverse) {
				// get index of order
				var removeIndex = ordersReady
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersReady.splice(removeIndex, 1);
				// add to prepare
				ordersPrepare.unshift(orderReady.data);
				setAlert('Order is not ready!', 'success');
			} else {
				// get index of order
				var removeIndex = ordersPrepare
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersPrepare.splice(removeIndex, 1);
				// add to prepare
				ordersReady.unshift(orderReady.data);
				setAlert('Order is now ready!', 'success');
			}
			hideOrderDialog();
			// move back if reversal
			if (reverse) {
				setTabActiveIndex2(1);
			} else {
				setTabActiveIndex2(2);
			}
		} else {
			setAlert('Modification Failed!', 'error');
		}
		// hide spinner
		setSubmition(false);
	};

	// Set order as delivered
	const deliveredOrder = async (reverse) => {
		// Close order opened
		setTransactionToShow(null);
		// show spinner
		setSubmition(true);
		// Clear form data
		formData.ready_f_pickup = null;
		formData.ready_f_delivery = null;
		formData.paid = null;
		// set false if revelsal
		if (reverse) {
			formData.delivered = false;
		} else {
			formData.delivered = true;
		}
		// Edit Order
		const orderDelivered = await editTransaction(formData, currentOrderDialog._id);
		if (orderDelivered.status === 200) {
			// if reverse remove from delivered else add to ready
			if (reverse) {
				// get index of order
				var removeIndex = ordersDelivered
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersDelivered.splice(removeIndex, 1);
				// add to prepare
				ordersReady.unshift(orderDelivered.data);
				setAlert('Order is not delivered!', 'success');
			} else {
				// get index of order
				var removeIndex = ordersReady
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersReady.splice(removeIndex, 1);
				// add to prepare
				ordersDelivered.unshift(orderDelivered.data);
				setAlert('Order is delivered!', 'success');
			}
			hideOrderDialog();
			// move back if reversal
			if (reverse) {
				setTabActiveIndex2(2);
			} else {
				setTabActiveIndex2(3);
			}
		} else {
			setAlert('Modification Failed!', 'error');
		}
		// hide spinner
		setSubmition(false);
	};

	// Set order as paid
	const paidOrder = async () => {
		// Close order opened
		setTransactionToShow(null);
		setSubmition(true);
		// Clear form data
		formData.ready_f_pickup = null;
		formData.ready_f_delivery = null;
		formData.delivered = null;
		formData.paid = true;
		// Edit Order
		const orderPaid = await editTransaction(formData, currentOrderDialog._id);
		if (orderPaid.status === 200) {
			// get index of order
			var removeIndex = ordersDelivered
				.map(function (item) {
					return item._id;
				})
				.indexOf(currentOrderDialog._id);
			// remove object
			ordersDelivered.splice(removeIndex, 1);
			// add to prepare
			transactions.unshift(orderPaid.data);
			setAlert('Order is paid!', 'success');
			hideOrderDialog();
			setTabActiveIndex2(3);
		} else {
			setAlert('Modification Failed!', 'error');
		}
		setSubmition(false);
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

	// Approve order or reverse approval
	const deleteOrderFunction = async () => {
		// Show spinner
		setSubmition(true);
		// Edit Order
		const orderToDelete = await deleteTransaction(currentOrderDialog._id);
		if (orderToDelete.status === 200) {
			// Remove and add to corresponding section
			switch (orderType) {
				case 'orders-shop-approve':
					// get index of order
					var removeIndex = ordersApprove
						.map(function (item) {
							return item._id;
						})
						.indexOf(currentOrderDialog._id);
					// remove object
					ordersApprove.splice(removeIndex, 1);
					break;
				case 'orders-shop-prepare':
					// get index of order
					var removeIndex = ordersPrepare
						.map(function (item) {
							return item._id;
						})
						.indexOf(currentOrderDialog._id);
					// remove object
					ordersPrepare.splice(removeIndex, 1);
					break;
				case 'orders-shop-ready':
					// get index of order
					var removeIndex = ordersReady
						.map(function (item) {
							return item._id;
						})
						.indexOf(currentOrderDialog._id);
					// remove object
					ordersReady.splice(removeIndex, 1);
					break;
				case 'orders-shop-delivered':
					// get index of order
					var removeIndex = ordersDelivered
						.map(function (item) {
							return item._id;
						})
						.indexOf(currentOrderDialog._id);
					// remove object
					ordersDelivered.splice(removeIndex, 1);
					break;
				default:
					break;
			}
			setAlert('Order Deleted', 'success');
			hideOrderDialog();
		} else {
			setAlert('Deletion Failed', 'error');
		}
		setSubmition(false);
	};

	// Delete Shop
	const deleteShopFunction = async () => {
		// Show spinner
		setSubmition(true);
		const shopToDelete = await deleteShop(shop._id);
		// Move to user page if success
		if (shopToDelete.status === 200) {
			history.replace('/user');
		} else {
			setAlert('Deletion Failed', 'error');
		}
		// Hide spinner
		setSubmition(false);
	};

	// Select feedback to replay to
	const selectFeedback = (feedback) => {
		setCurrentFeedback(feedback);
		setShowFeedback(true);
	};

	// Report a feedback
	const selectReportFeedback = (feedback) => {
		setCurrentFeedback(feedback);
		setShowReportFeedback(true);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await getShopByName(match.params.id);
			let shopObject = result.data;
			// Get Feedback
			setFeedback(result.data.feedback);
			// Get Products
			const products = await getShopProducts(shopObject._id);
			setProducts(products.data);
			// Get Sections
			const shopSections = await getSections(shopObject._id);
			setSections(shopSections.data);
			// Set Tags
			setTags(shopObject.tags);
			// Set Type
			setType(shopObject.type);
			// Check if shop has product section
			if (shopSections) {
				shopSections.data.forEach((section) => {
					if (section.type === 'data-view') {
						setHasProductSection(true);
					}
				});
			}
			try {
				const user = await getCurrentUser();
				setCurrentUser(user.data);
				//Set isOwner view if user is owner
				if (shopObject.user === user.data._id) {
					const transactions = await getShopTransactions(shopObject._id);
					setIsOwner(true);
					// Set Orders
					setOrdersApprove(getOrders(transactions.data).toApprove);
					setOrdersPrepare(getOrders(transactions.data).toPrepare);
					setOrdersReady(getOrders(transactions.data).ready);
					setOrdersDelivered(getOrders(transactions.data).delivered);
					// Set Transactions
					setTransactions(getOrders(transactions.data).paid);
					//Set products for chart
					if (result.data.products && transactions) {
						setChartProduct(result.data.products[0]);
						setProductsInTransactions(transProductsQtyById(transactions.data, result.data.products[0]._id));
					}
				} else {
					setVisitor(user.data);
				}
				// Set isFollower
				user.data.shops_followed.forEach((shop) => {
					if (shop.shop === shopObject._id) {
						setIsFollower(true);
					}
				});
				// Update Visit Count
				if (user) {
					visitShopAuth(shopObject._id);
				} else {
					visitShop(shopObject._id);
				}
			} catch (error) {}

			setShop(shopObject);
		};
		fetchData();
	}, [match.params.id]);
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
						: currentUser && currentUser.shops_owned.length > 0 /**&& visitor*/
						? 'shop-owner-visitor'
						: currentUser && currentUser.shops_owned.length === 0 && (isOwner || visitor)
						? 'not-shop-owner'
						: 'not-user'
				}
				history={history}
				user={currentUser}
				shops={currentUser && currentUser.shops_owned}
				shop={shop}
				products={products}
				selectOption={setHeaderOption}
				selectProduct={setCurrentProduct}
				isAuthenticated={isAuthenticated}
				loading={loading}
				logout={logout}
				toggleCreateShop={setShopCreation}
				hasProductSection={hasProductSection}
				unFollow={unfollowCurrentShop}
				follow={followCurrentShop}
				isFollower={isFollower}
				cartContent={cartContent}
				setShowCart={setShowCart}
				setProduct={setProduct}
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
											<button onClick={() => approveOrder()} className="btn btn-success">
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
											<button onClick={() => readyOrder('delivery')} className="btn btn-success">
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
											<button onClick={() => readyOrder('pickup')} className="btn btn-success">
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
											<button onClick={() => deliveredOrder()} className="btn btn-success">
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
											<button onClick={() => deleteShopFunction()} className="btn btn-danger">
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
										setCurrentFeedback={setCurrentFeedback}
										setFeedback={setFeedback}
										feedback={currentFeedback}
										setAlert={setAlert}
									/>
								)}
								{/** Report Feedback */}
								{showReportFeedback && (
									<Report
										shop={shop}
										setCurrentFeedback={setCurrentFeedback}
										setFeedback={setFeedback}
										feedback={currentFeedback}
										setAlert={setAlert}
										close={setShowReportFeedback}
										type={'shop'}
									/>
								)}
								{/** Order Received */}
								{delivered && (
									<div className="message-button-sm">
										<div className="message">Payment Received?</div>
										<div className="options">
											<button onClick={() => paidOrder()} className="btn btn-success">
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
														? approveOrder(true)
														: orderType === 'orders-shop-ready'
														? readyOrder(null, true)
														: orderType === 'orders-shop-delivered' && deliveredOrder(true);
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
											<button onClick={() => deleteOrderFunction()} className="btn btn-success">
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
							<Dialog header={'Product Information'} visible={product} onHide={() => setProduct(null)}>
								<div className="big-dialog">
									<ProductDashboard
										shop={shop}
										productObject={product}
										isOwner={isOwner}
										setIsOwner={setIsOwner}
										setCurrentProduct={setCurrentProduct}
										setCartContent={setCartContent}
										cartContent={cartContent}
										setItemAdded={setItemAdded}
										goBack={setProduct}
										transactionInfo={productsInTransactions}
										isAuthenticated={isAuthenticated}
										products={products}
										toggleRegister={setShowRegister}
										toggleLogin={setShowLogin}
										setProducts={setProducts}
										setSubmition={setSubmition}
										hideProduct={setProduct}
										setCurrentProduct={setCurrentProduct}
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
									setProduct={setProduct}
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
									setItem={setShop}
									itemType={'shop'}
									setAlert={setAlert}
									toggle={setEdit}
									setProducts={setProducts}
								/>
							)}
							{/** Product Creation */}
							{productCreation === true && (
								<ProductCreation
									toggle={setProductCreation}
									itemType={'product'}
									setAlert={setAlert}
									shop_id={shop._id}
									setProducts={setProducts}
									setCurrentProduct={setCurrentProduct}
									setSections={setSections}
								/>
							)}
							{/** Section Creation */}
							{(sectionCreation === true || editSection === true) && (
								<SectionCreation
									history={history}
									toggle={showSectionDialog}
									setAlert={setAlert}
									item={shop}
									itemType={'shop'}
									setImg={setImgToShow}
									showImg={setShowLightBox}
									sectionToEdit={sectionToEdit}
									setSectionToEdit={setSectionToEdit}
									setSections={setSections}
									currentSections={sections}
								/>
							)}
							{/**
							 * Delete Product
							 */}
							<Dialog
								header={'Deletion'}
								visible={showProductDeletion}
								onHide={() => setShowProductDeletion(false)}
							>
								{/** Options */}
								{!success && currentProductToDelete && (
									<h1 className="text-center mt-1">
										Delete Product?{' '}
										{<div className="text-danger">{currentProductToDelete.name}</div>}
									</h1>
								)}
								{/** Success Message */}
								{success && currentProductToDelete && (
									<h1 className="text-center mt-1">
										{<div className="text-danger">{currentProductToDelete.name}</div>} Product
										Deleted!
									</h1>
								)}
								{/** Submit and cancel/exit buttons */}
								<div className="form-group">
									<div className="buttons-form">
										{success ? (
											<Fragment>
												<button
													onClick={() => setShowProductDeletion(false)}
													className="btn btn-success"
												>
													Exit
												</button>
											</Fragment>
										) : (
											<Fragment>
												<button
													onClick={() => productDelete(currentProductToDelete._id)}
													className="btn btn-danger"
												>
													Delete
												</button>
												<button
													onClick={() => setShowProductDeletion(false)}
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
											history={history}
											showCreateSection={setSectionCreation}
											isOwner={isOwner}
											logout={logout}
											setIsOwner={setIsOwner}
											setOption={setHeaderOption}
											shop={shop}
											user={currentUser}
											cartContent={cartContent}
											setShowCart={setShowCart}
											setProduct={setProduct}
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
											unFollow={unfollowCurrentShop}
											follow={followCurrentShop}
											isFollower={isFollower}
											cartContent={cartContent}
											setShowCart={setShowCart}
											setProduct={setProduct}
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
												<Alert />
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
													setShop={setShop}
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
														setSections={setSections}
														setEdit={setEditSection}
														setCurrentProduct={setCurrentProduct}
														productSectionRef={productSectionRef}
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
																	setSections={setSections}
																	setEdit={setEditSection}
																	setCurrentProduct={setCurrentProduct}
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
																toggle={setOrderToShow}
																transaction={orderToShow}
																openProduct={setCurrentProduct}
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
																				setTransaction={setCurrentOrder}
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
																			setTransaction={setCurrentOrder}
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
																			setTransaction={setCurrentOrder}
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
																			setTransaction={setCurrentOrder}
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
																			setItem={setCurrentChartProduct}
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
															setCurrentProduct={setCurrentProduct}
															setProductToDelete={setProductToDelete}
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
															toggle={setTransactionToShow}
															transaction={transactionToShow}
															openProduct={setCurrentProduct}
														/>
													) : (
														<Fragment>
															{/**Transaction List */}
															{!transactionToShow &&
															transactions &&
															transactions.length > 0 ? (
																<DataViewComp
																	items={transactions}
																	setTransaction={setCurrentTransaction}
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
																onClick={() => onRate()}
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
	history: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	history: state.history,
	auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, logout })(withRouter(ShopDashboard));
