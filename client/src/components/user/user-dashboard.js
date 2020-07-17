import React, { useEffect, useState, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// Components
import Alert from '../alerts/alert';
import Cart from '../cart/cart';
import ProductDashboard from '../product/product-dashboard';
import TransactionView from '../transaction/transaction';
// Functions
import {
	deleteShop,
	deleteTransaction,
	deleteUser,
	editTransaction,
	getFeedback,
	getCurrentUser,
	getProducts,
	getUserById,
	getShop,
	rateUser,
	getShopTransactions,
	getProduct,
	getTransaction,
	deleteUserProduct,
} from '../../actions/requests';
import { transProductsQty, transProductsQtyById, getOrders } from '../../actions/utilities';
import { logout } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';
// Partials
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import FeedbackComp from '../feedback/feedback';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputSwitch } from 'primereact/inputswitch';
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

const UserDashboard = ({ match, setAlert, history, auth: { isAuthenticated, loading }, logout }) => {
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
	// show report feedback
	const [showReportFeedback, setShowReportFeedback] = useState(false);
	// show reply feedback
	const [showFeedback, setShowFeedback] = useState(false);
	const [currentFeedback, setCurrentFeedback] = useState(null);
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
	// Orders to approve (purchase)
	const [ordersApprovePurchase, setOrdersApprovePurchase] = useState([]);
	// Orders to prepare (purchase)
	const [ordersPreparePurchase, setOrdersPreparePurchase] = useState([]);
	// Orders that are ready (purchase)
	const [ordersReadyPurchase, setOrdersReadyPurchase] = useState([]);
	// Orders delivered (purchase)
	const [ordersDeliveredPurchase, setOrdersDeliveredPurchase] = useState([]);
	// Orders to approve (sale)
	const [ordersApproveSale, setOrdersApproveSale] = useState([]);
	// Orders to prepare (sale)
	const [ordersPrepareSale, setOrdersPrepareSale] = useState([]);
	// Orders that are ready (sale)
	const [ordersReadySale, setOrdersReadySale] = useState([]);
	// Orders delivered (sale)
	const [ordersDeliveredSale, setOrdersDeliveredSale] = useState([]);
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

	// User Data
	const [currentUser, setCurrentUser] = useState(null);
	const [feedback, setFeedback] = useState([]);
	const [products, setProducts] = useState([]);
	const [soldProducts, setSoldProducts] = useState([]);
	const [purchasedProducts, setPurchasedProducts] = useState([]);
	const [shops, setShops] = useState([]);
	// Chart
	const [userChartOption, setUserChartOption] = useState('Sold Items');
	const [productChartOption, setProductChartOption] = useState('Sold Items');
	const [shopChartOption, setShopChartOption] = useState('Sold Items');
	const [shop, setShop] = useState(null);
	const [transactionsSold, setTransactionsSold] = useState([]);
	const [transactionsBought, setTransactionsBought] = useState([]);
	const [productsInTransactions, setProductsInTransactions] = useState([]);
	const [product, setProduct] = useState(null);

	// Showing a product
	const [productToShow, setProductToShow] = useState(null);
	const [productSelected, setProductSelected] = useState(false);

	// Showing Transaction
	const [transactionToShowBought, setTransactionToShowBought] = useState(null);
	const [transactionToShowSold, setTransactionToShowSold] = useState(null);

	const [checked1, setChecked1] = useState(false);
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
	const [isOwner, setIsOwner] = useState(false);
	const [visitor, setVisitor] = useState(false);

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

	const onRate = async () => {
		const feedBackGiven = await rateUser(formData, currentUser._id);
		if (feedBackGiven) {
			setFeedback(feedBackGiven.data);
		}
	};

	// Set current shop for chart
	const setCurrentShop = async (shop) => {
		setSubmition(true);
		const transactions = await getShopTransactions(shop._id);
		shop.transactions = transactions.data;
		setShop(shop);
		setSubmition(false);
	};

	// Set current product for chart
	const setCurrentProduct = async (product) => {
		if (product) {
			setSubmition(true);
			if (transactionsSold) {
				setProductsInTransactions(transProductsQtyById(transactionsSold, product._id));
			}
			setProduct(product);
			setSubmition(false);
		}
	};

	// Set current product to show on top
	const setCurrentProductToShow = async (id) => {
		setProductSelected(true);
		if (productToShow) {
			setProductToShow(null);
		}
		const product = await getProduct(id);
		if (transactionsSold) {
			setProductsInTransactions(transProductsQtyById(transactionsSold, id));
		}
		setProductToShow(product.data);
		//window.scrollTo(0, topRef.current.offsetTop);
		setProductSelected(false);
	};

	/**
	 * Product Deletion
	 */
	const setProductToDelete = async (id) => {
		setSuccess(false);
		setProductSelected(true);
		const result = await getProduct(id);
		setCurrentProductToDelete(result.data);
		setProductSelected(false);
		setShowProductDeletion(true);
	};

	const productDelete = async (id) => {
		setSubmition(true);
		const result = await deleteUserProduct(id);
		if (result.status === 200) {
			setSuccess(true);
			setProducts(result.data);
			setAlert('Product Deleted', 'success');
		}
		setSubmition(false);
	};

	/**
	 * Shop Deletion
	 */
	const setShopToDelete = async (id) => {
		setSuccess(false);
		setShopSelected(true);
		const result = await getShop(id);
		setCurrentShopToDelete(result.data);
		setShopSelected(false);
		setShowShopDeletion(true);
	};

	const shopDelete = async (id) => {
		setSubmition(true);
		const result = await deleteShop(id);
		if (result.status === 200) {
			// Update products
			const products = await getProducts();
			if (products.status === 200) {
				setProducts(products.data);
				setAlert('Products Updated', 'success');
			}
			// Update Shops
			setShops(result.data);
			setAlert('Shop Deleted', 'success');
			setSubmition(false);
			setSuccess(true);
		}
	};

	const setCurrentTransactionSold = async (id) => {
		setSubmition(true);
		const result = await getTransaction(id);
		setTransactionToShowSold(result.data);
		setSubmition(false);
	};

	const setCurrentTransactionBought = async (id) => {
		setSubmition(true);
		const result = await getTransaction(id);
		setTransactionToShowBought(result.data);
		setSubmition(false);
	};

	const setTabIndex = (index) => {
		setActiveIndex(index);
		return true;
	};

	// Action after header option selection
	const setHeaderOption = async (option) => {
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
		setShowFeedback(false);
		setShowReportFeedback(false);
	};

	// Approve order or reverse approval
	const approveOrder = async (reverse) => {
		setSubmition(true);
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
				var removeIndex = ordersPrepareSale
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersPrepareSale.splice(removeIndex, 1);
				// add to prepare
				ordersApproveSale.unshift(orderApproved.data);
				setAlert('Order Unapproved!', 'success');
				hideOrderDialog();
				setTabActiveIndex2(0);
			} else {
				// get index of order
				var removeIndex = ordersApproveSale
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersApproveSale.splice(removeIndex, 1);
				// add to prepare
				ordersPrepareSale.unshift(orderApproved.data);
				setTabActiveIndex2(1);
				setAlert('Order Approved!', 'success');
				hideOrderDialog();
			}
		} else {
			setAlert('Approval Failed!', 'error');
		}
		setSubmition(false);
	};

	// Set order as ready or reverse ready
	const readyOrder = async (option, reverse) => {
		setSubmition(true);
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
				var removeIndex = ordersReadySale
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersReadySale.splice(removeIndex, 1);
				// add to prepare
				ordersPrepareSale.unshift(orderReady.data);
				setTabActiveIndex2(1);
				setAlert('Order is not ready!', 'success');
			} else {
				// get index of order
				var removeIndex = ordersPrepareSale
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersPrepareSale.splice(removeIndex, 1);
				// add to prepare
				ordersReadySale.unshift(orderReady.data);
				setTabActiveIndex2(2);
			}
			setAlert('Order is now ready!', 'success');
			hideOrderDialog();
		} else {
			setAlert('Modification Failed!', 'error');
		}
		setSubmition(false);
	};

	// Set order as delivered
	const deliveredOrder = async (reverse) => {
		setSubmition(true);
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
				var removeIndex = ordersDeliveredSale
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersDeliveredSale.splice(removeIndex, 1);
				// add to prepare
				ordersReadySale.unshift(orderDelivered.data);
				setTabActiveIndex2(2);
				setAlert('Order is not delivered!', 'success');
			} else {
				// get index of order
				var removeIndex = ordersReadySale
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersReadySale.splice(removeIndex, 1);
				// add to prepare
				ordersDeliveredSale.unshift(orderDelivered.data);
				setTabActiveIndex2(3);
				setAlert('Order is delivered!', 'success');
			}
			hideOrderDialog();
		} else {
			setAlert('Modification Failed!', 'error');
		}
		setSubmition(false);
	};

	// Set order as paid
	const paidOrder = async (option) => {
		setSubmition(true);
		formData.ready_f_pickup = null;
		formData.ready_f_delivery = null;
		formData.delivered = null;
		formData.paid = true;
		// Edit Order
		const orderPaid = await editTransaction(formData, currentOrderDialog._id);
		if (orderPaid.status === 200) {
			if (option === 'purchase') {
				// get index of order
				var removeIndex = ordersDeliveredPurchase
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersDeliveredPurchase.splice(removeIndex, 1);
				// add to prepare
				transactionsBought.unshift(orderPaid.data);
				setAlert('Order Received!', 'success');
			} else {
				// get index of order
				var removeIndex = ordersDeliveredSale
					.map(function (item) {
						return item._id;
					})
					.indexOf(currentOrderDialog._id);
				// remove object
				ordersDeliveredSale.splice(removeIndex, 1);
				// add to prepare
				transactionsSold.unshift(orderPaid.data);
				setAlert('Order is paid!', 'success');
			}
			hideOrderDialog();
		} else {
			setAlert('Modification Failed!', 'error');
		}
		setSubmition(false);
	};

	// open 'move order' dialog
	const moveOrder = (order, type) => {
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

	// open 'delete account' dialog
	const deleteAccountFunc = async () => {
		const user = await deleteUser();
		if (user.status === 200) {
			logout();
			history.replace('/');
		}
	};

	// open 'delete order' dialog
	const deleteOrder = (order, type) => {
		setCurrentOrderDialog(order);
		setOrderDeletion(true);
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
	const deleteOrderFunction = async (option) => {
		setSubmition(true);
		// Edit Order
		const orderToDelete = await deleteTransaction(currentOrderDialog._id);
		if (orderToDelete.status === 200) {
			if (option === 'purchase') {
				switch (orderType) {
					case 'orders-shop-approve':
						// get index of order
						var removeIndex = ordersApprovePurchase
							.map(function (item) {
								return item._id;
							})
							.indexOf(currentOrderDialog._id);
						// remove object
						ordersApprovePurchase.splice(removeIndex, 1);
						break;
					case 'orders-shop-prepare':
						// get index of order
						var removeIndex = ordersPreparePurchase
							.map(function (item) {
								return item._id;
							})
							.indexOf(currentOrderDialog._id);
						// remove object
						ordersPreparePurchase.splice(removeIndex, 1);
						break;
					case 'orders-shop-ready':
						// get index of order
						var removeIndex = ordersReadyPurchase
							.map(function (item) {
								return item._id;
							})
							.indexOf(currentOrderDialog._id);
						// remove object
						ordersReadyPurchase.splice(removeIndex, 1);
						break;
					case 'orders-shop-delivered':
						// get index of order
						var removeIndex = ordersDeliveredPurchase
							.map(function (item) {
								return item._id;
							})
							.indexOf(currentOrderDialog._id);
						// remove object
						ordersDeliveredPurchase.splice(removeIndex, 1);
						break;
					default:
						break;
				}
			} else {
				switch (orderType) {
					case 'orders-shop-approve':
						// get index of order
						var removeIndex = ordersApproveSale
							.map(function (item) {
								return item._id;
							})
							.indexOf(currentOrderDialog._id);
						// remove object
						ordersApproveSale.splice(removeIndex, 1);
						break;
					case 'orders-shop-prepare':
						// get index of order
						var removeIndex = ordersPrepareSale
							.map(function (item) {
								return item._id;
							})
							.indexOf(currentOrderDialog._id);
						// remove object
						ordersPrepareSale.splice(removeIndex, 1);
						break;
					case 'orders-shop-ready':
						// get index of order
						var removeIndex = ordersReadySale
							.map(function (item) {
								return item._id;
							})
							.indexOf(currentOrderDialog._id);
						// remove object
						ordersReadySale.splice(removeIndex, 1);
						break;
					case 'orders-shop-delivered':
						// get index of order
						var removeIndex = ordersDeliveredSale
							.map(function (item) {
								return item._id;
							})
							.indexOf(currentOrderDialog._id);
						// remove object
						ordersDeliveredSale.splice(removeIndex, 1);
						break;
					default:
						break;
				}
			}
			setAlert('Order Deleted', 'success');
			hideOrderDialog();
		} else {
			setAlert('Deletion Failed', 'error');
		}
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
			if (match.params.id) {
				let user = await getUserById(match.params.id);
				setFeedback(user.data.feedback);
				setProducts(user.data.products);
				setShops(user.data.shops_owned);
				try {
					let visitor = await getCurrentUser();
					if (visitor && visitor._id === user._id) {
						setIsOwner(false);
					}
					if (visitor) {
						setVisitor(visitor.data);
					}
				} catch (error) {}
				setCurrentUser(user.data);
			} else {
				const userFeedback = await getFeedback();
				setFeedback(userFeedback.data);
				let user = await getCurrentUser();
				let userObject = user.data;
				setFeedback(user.data.feedback);
				setProducts(user.data.products);
				setShops(user.data.shops_owned);
				// Set Orders Purchase
				setOrdersApprovePurchase(getOrders(user.data.transactions_purchase).toApprove);
				setOrdersPreparePurchase(getOrders(user.data.transactions_purchase).toPrepare);
				setOrdersReadyPurchase(getOrders(user.data.transactions_purchase).ready);
				setOrdersDeliveredPurchase(getOrders(user.data.transactions_purchase).delivered);
				// Set Transactions Purchase
				setTransactionsBought(getOrders(user.data.transactions_purchase).paid);
				// Set Orders Sale
				setOrdersApproveSale(getOrders(user.data.transactions_sale).toApprove);
				setOrdersPrepareSale(getOrders(user.data.transactions_sale).toPrepare);
				setOrdersReadySale(getOrders(user.data.transactions_sale).ready);
				setOrdersDeliveredSale(getOrders(user.data.transactions_sale).delivered);
				// Set Transactions Sale
				setTransactionsSold(getOrders(user.data.transactions_sale).paid);
				setIsOwner(true);
				setPurchasedProducts(transProductsQty(user.data.transactions_purchase));
				setSoldProducts(transProductsQty(user.data.transactions_sale));
				//Set shop for chart
				if (user.data.shops_owned.length > 0) {
					setCurrentShop(user.data.shops_owned[0]);
				}
				//Set products for chart
				if (user.data.products.length > 0 && user.data.transactions_sale.length > 0) {
					setProduct(user.data.products[0]);
					setProductsInTransactions(
						transProductsQtyById(user.data.transactions_sale, user.data.products[0]._id)
					);
				}
				setCurrentUser(userObject);
			}
		};
		fetchData();
	}, [match.params.id]);

	return currentUser === null ? (
		<PrimeSpinner />
	) : (
		<Fragment>
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
				user={currentUser}
				shops={shops}
				products={products}
				selectOption={setHeaderOption}
				selectProduct={setCurrentProductToShow}
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
					{deleteAccount && (
						<div className="message-button-sm">
							<div className="message">Delete your account?</div>
							<div className="options">
								<button onClick={() => deleteAccountFunc()} className="btn btn-success">
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
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
					{showFeedback && (
						<FeedbackComp
							user={currentUser}
							setCurrentFeedback={setCurrentFeedback}
							setFeedback={setFeedback}
							feedback={currentFeedback}
							setAlert={setAlert}
						/>
					)}
					{showReportFeedback && (
						<Report
							user={currentUser}
							setCurrentFeedback={setCurrentFeedback}
							setFeedback={setFeedback}
							feedback={currentFeedback}
							setAlert={setAlert}
							close={setShowReportFeedback}
							type={'user'}
						/>
					)}
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
					{received && (
						<div className="message-button-sm">
							<div className="message">Order Received?</div>
							<div className="options">
								<button onClick={() => paidOrder('purchase')} className="btn btn-success">
									Yes
								</button>
								<button onClick={() => hideOrderDialog()} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					)}
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
				{(shopSelected || productSelected || submition) && <PrimeSpinner />}
				{/** Create Shop suggestion */}
				{shopSuggestion && currentUser && currentUser.shops_owned.length === 0 && isOwner && (
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
				<Dialog header={'Product Information'} visible={productToShow} onHide={() => setProductToShow(null)}>
					<ProductDashboard
						productObject={productToShow}
						isOwner={isOwner}
						setIsOwner={setIsOwner}
						transactionInfo={productsInTransactions}
						backButton={false}
						products={products}
					/>
				</Dialog>
				{/**
				 * Delete Product
				 */}
				<Dialog header={'Deletion'} visible={showProductDeletion} onHide={() => setShowProductDeletion(false)}>
					{!success && currentProductToDelete && (
						<h1 className="text-center mt-1">
							Delete Product? {<div className="text-danger">{currentProductToDelete.name}</div>}
						</h1>
					)}
					{success && currentProductToDelete && (
						<h1 className="text-center mt-1">
							{<div className="text-danger">{currentProductToDelete.name}</div>} Product Deleted!
						</h1>
					)}
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
										onClick={() => productDelete(currentProductToDelete._id)}
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
					{!success && currentShopToDelete && (
						<h1 className="text-center mt-1">
							Delete Shop? {<div className="text-danger">{currentShopToDelete.name}</div>}
						</h1>
					)}
					{success && currentShopToDelete && (
						<h1 className="text-center mt-1">
							{<div className="text-danger">{currentShopToDelete.name}</div>} Shop Deleted!
						</h1>
					)}
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
										onClick={() => shopDelete(currentShopToDelete._id)}
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
						toggle={setShopCreation}
						setAlert={setAlert}
						history={history}
						setShops={setShops}
						setSubmition={setSubmition}
					/>
				)}
				{productCreation === true && (
					<ProductCreation toggle={setProductCreation} setAlert={setAlert} history={history} />
				)}
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
								user={currentUser}
								setCurrentUser={setCurrentUser}
								isOwner={isOwner}
								feedback={feedback}
							/>
						</div>
						{/** Top Right */}
						<div className="m-auto hide-sm">
							<UserData
								user={currentUser}
								isOwner={isOwner}
								shops={shops}
								products={products}
								feedback={feedback}
							/>
						</div>
						<div className="show-sm mt-1">
							<Inplace closable={true}>
								<InplaceDisplay>More...</InplaceDisplay>
								<InplaceContent>
									<UserData
										user={currentUser}
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
					{/** Accordion */}
					{isOwner ? (
						<Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
							<AccordionTab
								header={
									<div ref={statisticsRef}>
										<i className="fas fa-chart-line"></i> Statistics
									</div>
								}
							>
								<div>
									<TabView
										activeIndex={tabActiveIndex}
										onTabChange={(e) => setTabActiveIndex(e.index)}
									>
										<TabPanel header="My Data" leftIcon="far fa-user">
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
											<ChartComp
												data={
													userChartOption === 'Purchased Items' ||
													userChartOption === 'Spendings'
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
										<TabPanel header="Shops" leftIcon="fas fa-shopping-cart">
											{shops.length > 0 ? (
												<div className="chart-search">
													<div className="vertical">
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
													<ListBoxIMG
														itemType={'shop'}
														item={shop}
														setItem={setCurrentShop}
														items={shops}
													/>
												</div>
											) : (
												<h1>You don't have any shops</h1>
											)}
										</TabPanel>
										<TabPanel header="Products" leftIcon="fas fa-shopping-basket">
											{products.length > 0 ? (
												<div className="chart-search">
													<div className="vertical">
														<div className="buttons-form-free mb-1">
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
													<ListBoxIMG
														itemType={'product'}
														item={product}
														setItem={setCurrentProduct}
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
							<AccordionTab
								header={
									<div ref={shopsRef}>
										<i className="fas fa-store"></i> Shops
									</div>
								}
							>
								{/**Shop List */}
								<button onClick={() => setShopCreation(true)} className="btn btn-primary mb-1">
									<i className="fas fa-plus-circle mr-1"></i>New
								</button>
								{shops.length > 0 ? (
									<DataViewComp items={shops} type="shops" setShopToDelete={setShopToDelete} />
								) : (
									<h1>You don't have any shops</h1>
								)}
							</AccordionTab>
							<AccordionTab
								header={
									<div ref={productsRef}>
										<i className="fas fa-boxes"></i> Products
									</div>
								}
							>
								{/**Product List */}
								{products.length > 0 ? (
									<DataViewComp
										items={products}
										setCurrentProduct={setCurrentProductToShow}
										setProductToDelete={setProductToDelete}
										type="products"
									/>
								) : (
									<h1>You don't have any products</h1>
								)}
							</AccordionTab>
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
									 * Transaction View
									 */}
									{transactionToShowSold && (
										<TransactionView
											toggle={setTransactionToShowSold}
											transaction={transactionToShowSold}
											openProduct={setCurrentProduct}
											orderView={true}
										/>
									)}
									<TabView
										activeIndex={tabActiveIndex2}
										onTabChange={(e) => setTabActiveIndex2(e.index)}
									>
										<TabPanel header="To Approve" leftIcon="far fa-clock">
											{/**Transaction List */}
											{ordersApproveSale && ordersApproveSale.length > 0 ? (
												<Fragment>
													<DataViewComp
														items={ordersApproveSale}
														setTransaction={setCurrentTransactionSold}
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
										<TabPanel header="To Prepare" leftIcon="fas fa-wrench">
											{/**Transaction List */}
											{ordersPrepareSale && ordersPrepareSale.length > 0 ? (
												<DataViewComp
													items={ordersPrepareSale}
													setTransaction={setCurrentTransactionSold}
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
										<TabPanel header="Ready" leftIcon="fas fa-gift">
											{/**Transaction List */}
											{ordersReadySale && ordersReadySale.length > 0 ? (
												<DataViewComp
													items={ordersReadySale}
													setTransaction={setCurrentTransactionSold}
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
										<TabPanel header="Delivered" leftIcon="far fa-check-square">
											{/**Transaction List */}
											{ordersDeliveredSale && ordersDeliveredSale.length > 0 ? (
												<DataViewComp
													items={ordersDeliveredSale}
													setTransaction={setCurrentTransactionSold}
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
								</div>
							</AccordionTab>
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
									 * Transaction View
									 */}
									{transactionToShowBought && (
										<TransactionView
											toggle={setTransactionToShowBought}
											transaction={transactionToShowBought}
											openProduct={setCurrentProduct}
											orderView={true}
										/>
									)}
									<TabView
										activeIndex={tabActiveIndex3}
										onTabChange={(e) => setTabActiveIndex3(e.index)}
									>
										<TabPanel header="To Approve" leftIcon="far fa-clock">
											{/**Transaction List */}
											{ordersApprovePurchase && ordersApprovePurchase.length > 0 ? (
												<Fragment>
													<DataViewComp
														items={ordersApprovePurchase}
														setTransaction={setCurrentTransactionBought}
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
										<TabPanel header="To Prepare" leftIcon="fas fa-wrench">
											{/**Transaction List */}
											{ordersPreparePurchase && ordersPreparePurchase.length > 0 ? (
												<DataViewComp
													items={ordersPreparePurchase}
													setTransaction={setCurrentTransactionBought}
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
										<TabPanel header="Ready" leftIcon="fas fa-gift">
											{/**Transaction List */}
											{ordersReadyPurchase && ordersReadyPurchase.length > 0 ? (
												<DataViewComp
													items={ordersReadyPurchase}
													setTransaction={setCurrentTransactionBought}
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
										<TabPanel header="Received" leftIcon="far fa-check-square">
											{/**Transaction List */}
											{ordersDeliveredPurchase && ordersDeliveredPurchase.length > 0 ? (
												<DataViewComp
													items={ordersDeliveredPurchase}
													setTransaction={setCurrentTransactionBought}
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
								</div>
							</AccordionTab>
							<AccordionTab
								header={
									<div ref={transSaleRef}>
										<i className="fas fa-hand-holding-usd"></i> Transactions (Sale)
									</div>
								}
							>
								{/**
								 * Transaction View
								 */}
								{transactionToShowSold && (
									<TransactionView
										toggle={setTransactionToShowSold}
										transaction={transactionToShowSold}
										openProduct={setCurrentProductToShow}
									/>
								)}
								{/**Transaction List */}
								{!transactionToShowSold && transactionsSold && transactionsSold.length > 0 ? (
									<DataViewComp
										items={transactionsSold}
										setTransaction={setCurrentTransactionSold}
										type="transactions"
									/>
								) : (
									!transactionToShowSold && <h1>You haven't sold any items</h1>
								)}
							</AccordionTab>
							<AccordionTab
								header={
									<div ref={transPurchaseRef}>
										<i className="fas fa-wallet"></i> Transactions (Purchase)
									</div>
								}
							>
								{/**
								 * Transaction View
								 */}
								{transactionToShowBought && (
									<TransactionView
										toggle={setTransactionToShowBought}
										transaction={transactionToShowBought}
										openProduct={setCurrentProductToShow}
									/>
								)}
								{/**Transaction List */}
								{!transactionToShowBought && transactionsBought && transactionsBought.length > 0 ? (
									<DataViewComp
										items={transactionsBought}
										setTransaction={setCurrentTransactionBought}
										type="transactions"
									/>
								) : (
									!transactionToShowBought && <h1>You haven't purchased any items</h1>
								)}
							</AccordionTab>
							<AccordionTab
								header={
									<div ref={feedbackRef}>
										<i className="fas fa-star-half-alt"></i> Feedback
									</div>
								}
							>
								{/**Review List */}
								<div className="accord-list">
									{/**Review card */}
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
							<Accordion>
								<AccordionTab
									header={
										<div ref={shopsRef}>
											<i className="fas fa-store"></i> Shops
										</div>
									}
								>
									{/**Shop List */}
									<div className="card-list">
										{shops.length > 0 ? (
											<DataViewComp items={shops} type="shops" />
										) : (
											<h1>Doesn't have any shops</h1>
										)}
									</div>
								</AccordionTab>
								<AccordionTab
									header={
										<div ref={productsRef}>
											<i className="fas fa-boxes"></i> Products
										</div>
									}
								>
									{/**Product List */}
									<div className="card-list">
										{products.length > 0 ? (
											<DataViewComp
												items={products}
												setCurrentProduct={setCurrentProductToShow}
												type="products"
											/>
										) : (
											<h1>Doesn't have any products</h1>
										)}
									</div>
								</AccordionTab>
								<AccordionTab
									header={
										<div ref={feedbackRef}>
											<i className="fas fa-star-half-alt"></i> Feedback
										</div>
									}
								>
									{/**Review List */}
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
												<button onClick={() => onRate()} className="btn btn-primary my-1">
													Leave Review
												</button>
											</div>
										)}
										{/**Review card */}
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
				</div>
			</section>
		</Fragment>
	);
};

UserDashboard.propTypes = {
	history: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	history: state.history,
	auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, logout })(withRouter(UserDashboard));
