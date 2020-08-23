import axios from 'axios';
import { setAlert } from './alerts';
import {
	CLEAR_FEEDBACK_SHOP,
	CLEAR_FEEDBACK_ERROR_SHOP,
	CLEAR_PRODUCT_SHOP,
	CLEAR_PRODUCT_ERROR_SHOP,
	CLEAR_TRANSACTION_SHOP,
	CLEAR_TRANSACTION_SHOP_ERROR,
	CREATE_PRODUCT,
	CREATE_PRODUCT_ERROR,
	CREATE_SECTION,
	CREATE_SECTION_ERROR,
	CREATE_SECTION_PRODUCT,
	CREATE_SECTION_ERROR_PRODUCT,
	DELETE_PRODUCT_SHOP,
	DELETE_PRODUCT_ERROR_SHOP,
	DELETE_SECTION,
	DELETE_SECTION_ERROR,
	DELETE_SECTION_PRODUCT,
	DELETE_SECTION_ERROR_PRODUCT,
	DELETE_TRANSACTION_SHOP,
	DELETE_TRANSACTION_ERROR_SHOP,
	DELETE_SHOP_SHOP,
	DELETE_SHOP_ERROR_SHOP,
	EDIT_ORDER_SHOP,
	EDIT_ORDER_ERROR_SHOP,
	EDIT_SECTION,
	EDIT_SECTION_ERROR,
	EDIT_SECTION_PRODUCT,
	EDIT_SECTION_ERROR_PRODUCT,
	EDIT_SHOP,
	EDIT_SHOP_ERROR,
	FOLLOW_SHOP,
	FOLLOW_SHOP_ERROR,
	UNFOLLOW_SHOP,
	GET_ORDER,
	GET_PRODUCT_SHOP_SUCCESS,
	GET_PRODUCT_SHOP_ERROR,
	GET_PRODUCT_TO_DELETE_SHOP,
	GET_SHOP_SUCCESS,
	GET_SHOP_ERROR,
	GET_TRANSACTION,
	GET_TRANSACTION_ERROR_SHOP,
	MOVE_SECTION,
	MOVE_SECTION_ERROR,
	RATE_SHOP,
	RATE_SHOP_ERROR,
	REPLY_FEEDBACK_SHOP,
	REPLY_FEEDBACK_SHOP_ERROR,
	REPORT_FEEDBACK_SHOP,
	REPORT_FEEDBACK_SHOP_ERROR,
	SELECT_FEEDBACK_SHOP,
	SELECT_FEEDBACK_ERROR_SHOP,
	SELECT_REPORT_FEEDBACK_SHOP,
	SELECT_REPORT_FEEDBACK_ERROR_SHOP,
	SET_CHART_PRODUCT_SHOP,
	SET_CHART_PRODUCT_ERROR_SHOP,
	SET_CUSTOMER_VIEW,
	SET_CUSTOMER_VIEW_ERROR,
	SWAP_IMG_SECTION,
	SWAP_IMG_SECTION_ERROR,
} from './types';

/***********************************************************************************************
 *
 *	 DELETE REQUESTS
 *
 ***********************************************************************************************/

/**
 * Delete a product by id
 * @param {*} id
 */
export const deleteProduct = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/shops/product/${id}`);
		// dispatch updated products and delete type
		dispatch({
			type: DELETE_PRODUCT_SHOP,
			payload: res.data,
		});
		dispatch(setAlert('Product Deleted!', 'success'));
	} catch (err) {
		dispatch(setAlert('Deletion Failed', 'error'));
		dispatch({
			type: DELETE_PRODUCT_ERROR_SHOP,
		});
	}
};

/**
 * Delete shop section
 * @param {*} id
 */
export const deleteSection = (shop_id, section_id, setSuccess, setDeleted) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/shops/section/${shop_id}/${section_id}`);

		if (setDeleted) {
			setDeleted(true);
		}
		setSuccess(true);

		// dispatch updated sections and delete type
		dispatch({
			type: DELETE_SECTION,
			payload: res.data,
		});
		dispatch(setAlert('Section Deleted!', 'success'));
	} catch (err) {
		dispatch(setAlert('Deletion Failed', 'error'));
		dispatch({
			type: DELETE_SECTION_ERROR,
		});
	}
};

/**
 * Delete a shop by id
 * @param {*} id
 */
export const deleteShop = (history, id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/shops/${id}`);
		// dispatch updated shops and delete type
		dispatch({
			type: DELETE_SHOP_SHOP,
			payload: res.data,
		});
		dispatch(setAlert('Shop Deleted!', 'success'));
		history.push('/user');
	} catch (err) {
		dispatch(setAlert('Deletion Failed', 'error'));
		dispatch({
			type: DELETE_SHOP_ERROR_SHOP,
		});
	}
};

/**
 * Delete a transaction by id
 * @param {*} id
 */
export const deleteTransaction = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/transactions/shop/${id}`);
		// dispatch updated transactions and delete type
		dispatch({
			type: DELETE_TRANSACTION_SHOP,
			payload: res.data,
		});
		dispatch(setAlert('Transaction Deleted!', 'success'));
	} catch (err) {
		dispatch(setAlert('Deletion Failed', 'error'));
		dispatch({
			type: DELETE_TRANSACTION_ERROR_SHOP,
		});
	}
};

/***********************************************************************************************
 *
 *	 GET REQUESTS
 *
 ***********************************************************************************************/

/**
 * Get order using id
 * @param {*} id
 */
export const getOrder = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/transactions/${id}`);
		// dispatch transaction info and success type
		dispatch({
			type: GET_ORDER,
			payload: res.data,
		});
	} catch (err) {
		dispatch(setAlert('Order not found', 'error'));
		dispatch({
			type: GET_TRANSACTION_ERROR_SHOP,
		});
	}
};

/**
 * Get product using id
 * @param {*} id
 */
export const getProduct = (id) => async (dispatch) => {
	try {
		let product = null;
		const res = await axios.get(`/api/products/${id}`);
		product = res.data;
		// Get product sections
		const sections = await axios.get(`/api/products/sections/${id}`);
		if (sections) {
			product.sections = sections.data;
		}
		// Get Transactions
		const transactions = await axios.get(`/api/shops/transactions/${product.shop._id}`);
		// dispatch product, transactions info and success type
		dispatch({
			type: GET_PRODUCT_SHOP_SUCCESS,
			payload: { product: product, transactions: transactions },
		});
	} catch (err) {
		dispatch(setAlert('Product not found', 'error'));
		dispatch({
			type: GET_PRODUCT_SHOP_ERROR,
		});
	}
};

/**
 * Get product to delete using id
 * @param {*} id
 */
export const getProductToDelete = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/products/${id}`);
		// dispatch product info and success type
		dispatch({
			type: GET_PRODUCT_TO_DELETE_SHOP,
			payload: res.data,
		});
	} catch (err) {
		dispatch(setAlert('Product not found', 'error'));
		dispatch({
			type: GET_PRODUCT_SHOP_ERROR,
		});
	}
};

/**
 * Set product for chart
 * @param {*} product
 */
export const getProductChart = (product, transactionsSold) => async (dispatch) => {
	try {
		product.transactionsSold = transactionsSold;
		dispatch({
			type: SET_CHART_PRODUCT_SHOP,
			payload: product,
		});
	} catch (err) {
		dispatch(setAlert('Product Selection Failed', 'error'));
		dispatch({
			type: SET_CHART_PRODUCT_ERROR_SHOP,
		});
	}
};

/**
 * Get shop using name
 * @param {*} id
 */
export const getShop = (name) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/shops/name/${name}`);
		// Shop products
		const products = await axios.get(`/api/shops/products/${res.data._id}`);
		// Get sections
		const sections = await axios.get(`/api/shops/sections/${res.data._id}`);
		let hasProductSection = false;
		if (sections) {
			sections.data.forEach((section) => {
				if (section.type === 'data-view') {
					hasProductSection = true;
				}
			});
		}
		// Check if owner
		const user = await axios.get('/api/users/');
		let isOwner = false;
		// transactions
		let transactions = [];
		if (user && user.data && user.data._id === res.data.user) {
			isOwner = true;
			// Get Transactions
			const transactionsData = await axios.get(`/api/shops/transactions/${res.data._id}`);
			if (transactionsData) {
				transactions = transactionsData.data;
			}
		}
		// Set isFollower
		let isFollower = false;
		if (user) {
			user.data.shops_followed.forEach((shop) => {
				if (shop.shop === res.data._id) {
					isFollower = true;
				}
			});
			// Also update shop auth visit count
			const authVisit = await axios.put(`/api/shops/visit-auth/${res.data._id}`);
		} else {
			// Update not auth visit count
			const notAuthVisit = await axios.put(`/api/shops/visit/${res.data._id}`);
		}
		// dispatch shop info and success type
		dispatch({
			type: GET_SHOP_SUCCESS,
			payload: {
				feedback: res.data.feedback,
				products: products.data,
				hasProductSection: hasProductSection,
				isOwner: isOwner,
				isFollower: isFollower,
				sections: sections.data,
				shop: res.data,
				transactions: transactions,
				currentUser: user.data,
			},
		});
	} catch (err) {
		dispatch({
			type: GET_SHOP_ERROR,
		});
	}
};

/**
 * Get transaction using id
 * @param {*} id
 */
export const getTransaction = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/transactions/${id}`);
		// dispatch transaction info and success type
		dispatch({
			type: GET_TRANSACTION,
			payload: res.data,
		});
	} catch (err) {
		dispatch(setAlert('Transaction not found', 'error'));
		dispatch({
			type: GET_TRANSACTION_ERROR_SHOP,
		});
	}
};

/***********************************************************************************************
 *
 *	 POST REQUESTS
 *
 ***********************************************************************************************/

/**
 * Set order as approved, if reverse true, set approved as false
 * @param {*} formData
 * @param {*} reverse
 * @param {*} id
 */
export const approveOrder = (formData, reverse, id, hide, setTabIndex) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// clear form fields
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

		const res = await axios.post(`/api/transactions/${id}`, formData, config);

		// Set tab index in order view
		if (reverse) {
			setTabIndex(0);
		} else {
			setTabIndex(1);
		}
		// close dialog
		hide();

		dispatch({
			type: EDIT_ORDER_SHOP,
			payload: res.data,
		});

		dispatch(setAlert(reverse ? 'Order Approval Reversed' : 'Order Approved', 'success'));
	} catch (err) {
		dispatch(setAlert(reverse ? 'Approval Reversal Failed' : 'Approval Failed', 'error'));

		dispatch({
			type: EDIT_ORDER_ERROR_SHOP,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Create a product
 * @param {*} formData
 * @param {*} id
 */
export const createProduct = (formData, id, setSuccess) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/shops/product/${id}`, formData, config);

		setSuccess(true);

		dispatch({
			type: CREATE_PRODUCT,
			payload: res.data,
		});

		dispatch(setAlert('Product Created', 'success'));
	} catch (err) {
		dispatch(setAlert('Product Creation Failed', 'error'));

		dispatch({
			type: CREATE_PRODUCT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Create section
 * @param {*} formData
 * @param {*} id
 * @param {*} setSuccess
 */
export const createSection = (formData, id, setSuccess, setCreated) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/shops/section/${id}`, formData, config);

		setSuccess(true);
		setCreated(true);

		dispatch({
			type: CREATE_SECTION,
			payload: res.data,
		});

		dispatch(setAlert('Section Created', 'success'));
	} catch (err) {
		dispatch(setAlert('Section Creation Failed', 'error'));

		dispatch({
			type: CREATE_SECTION_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Create product section
 * @param {*} formData
 * @param {*} id
 * @param {*} setSuccess
 */
export const createProductSection = (formData, id, setSuccess, setCreated) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/products/section/${id}`, formData, config);

		let product = null;
		const productData = await axios.get(`/api/products/${id}`);
		product = productData.data;
		product.sections = res.data;

		setSuccess(true);
		setCreated(true);

		dispatch({
			type: CREATE_SECTION_PRODUCT,
			payload: product,
		});

		dispatch(setAlert('Section Created', 'success'));
	} catch (err) {
		dispatch(setAlert('Section Creation Failed', 'error'));

		dispatch({
			type: CREATE_SECTION_ERROR_PRODUCT,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Edit shop
 * @param {*} formData
 * @param {*} id
 * @param {*} setSuccess
 */
export const editShop = (formData, id, setSuccess) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/shops/edit/${id}`, formData, config);

		if (res.status === 200 && res.data !== 'Shop name already in use' && res.data !== 'Shop email already in use') {
			if (setSuccess) {
				setSuccess(true);
			}

			dispatch(setAlert('Shop Edited', 'success'));

			dispatch({
				type: EDIT_SHOP,
				payload: res.data,
			});
		} else if (res.data === 'Shop name already in use') {
			dispatch(setAlert('Name already in use', 'error'));
		} else if (res.data === 'Shop email already in use') {
			dispatch(setAlert('Email already in use', 'error'));
		} else {
			dispatch(setAlert('Edition Failed', 'error'));
		}
	} catch (err) {
		dispatch(setAlert('Shop Edition Failed', 'error'));

		dispatch({
			type: EDIT_SHOP_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Edit section
 * @param {*} formData
 * @param {*} id
 * @param {*} setSuccess
 */
export const editShopSection = (formData, id, setSuccess, setEdited) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/shops/section/edit/${id}`, formData, config);

		setSuccess(true);
		setEdited(true);

		dispatch({
			type: EDIT_SECTION,
			payload: res.data,
		});

		dispatch(setAlert('Section Edited', 'success'));
	} catch (err) {
		dispatch(setAlert('Section Edition Failed', 'error'));

		dispatch({
			type: EDIT_SECTION_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Edit product section
 * @param {*} formData
 * @param {*} id
 * @param {*} setSuccess
 */
export const editProductSection = (formData, id, setSuccess, setEdited) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/products/section/edit/${id}`, formData, config);

		let product = null;
		const productData = await axios.get(`/api/products/${id}`);
		product = productData.data;
		product.sections = res.data;

		setSuccess(true);
		setEdited(true);

		dispatch({
			type: EDIT_SECTION_PRODUCT,
			payload: product,
		});

		dispatch(setAlert('Section Edited', 'success'));
	} catch (err) {
		dispatch(setAlert('Section Edition Failed', 'error'));

		dispatch({
			type: EDIT_SECTION_ERROR_PRODUCT,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Move shop section
 * @param {*} formData
 * @param {*} id
 */
export const moveSection = (formData, id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/shops/section/move/${id}`, formData, config);

		dispatch({
			type: MOVE_SECTION,
			payload: res.data,
		});

		dispatch(setAlert('Section Moved', 'success'));
	} catch (err) {
		dispatch(setAlert('Section Modification Failed', 'error'));

		dispatch({
			type: MOVE_SECTION_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Set order as ready, if reverse true, set ready as false
 * @param {*} formData
 * @param {*} reverse
 * @param {*} id
 */
export const setOrderReady = (formData, reverse, id, option, hide, setTabIndex) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// clear form fields
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

		const res = await axios.post(`/api/transactions/${id}`, formData, config);

		// Set tab index in order view
		if (reverse) {
			setTabIndex(1);
		} else {
			setTabIndex(2);
		}
		// close dialog
		hide();

		dispatch({
			type: EDIT_ORDER_SHOP,
			payload: res.data,
		});

		dispatch(setAlert(reverse ? 'Order is not ready' : 'Order is now ready', 'success'));
	} catch (err) {
		dispatch(setAlert('Edition Failed', 'error'));

		dispatch({
			type: EDIT_ORDER_ERROR_SHOP,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Set order as delivered, if reverse true, set delivered as false
 * @param {*} formData
 * @param {*} reverse
 * @param {*} id
 */
export const setOrderDelivered = (formData, reverse, id, hide, setTabIndex) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// clear form fields
		formData.ready_f_pickup = null;
		formData.ready_f_delivery = null;
		formData.paid = null;

		// set false if revelsal
		if (reverse) {
			formData.delivered = false;
		} else {
			formData.delivered = true;
		}

		const res = await axios.post(`/api/transactions/${id}`, formData, config);

		// Set tab index in order view
		if (reverse) {
			setTabIndex(2);
		} else {
			setTabIndex(3);
		}
		// close dialog
		hide();

		dispatch({
			type: EDIT_ORDER_SHOP,
			payload: res.data,
		});

		dispatch(setAlert(reverse ? 'Order is not Delivered' : 'Order set as Delivered', 'success'));
	} catch (err) {
		dispatch(setAlert('Edition Failed', 'error'));

		dispatch({
			type: EDIT_ORDER_ERROR_SHOP,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Set order as paid
 * @param {*} formData
 * @param {*} reverse
 * @param {*} id
 */
export const setOrderPaid = (formData, id, hide) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// clear form fields
		formData.ready_f_pickup = null;
		formData.ready_f_delivery = null;
		formData.delivered = null;
		formData.paid = true;

		const res = await axios.post(`/api/transactions/${id}`, formData, config);

		// close dialog
		hide();

		dispatch({
			type: EDIT_ORDER_SHOP,
			payload: res.data,
		});

		dispatch(setAlert('Order paid and delivered', 'success'));
	} catch (err) {
		dispatch(setAlert('Edition Failed', 'error'));

		dispatch({
			type: EDIT_ORDER_ERROR_SHOP,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Swap img position in section
 * @param {*} id
 */
export const swapImgSection = (id) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/shops/section/swap/${id}`);

		dispatch({
			type: SWAP_IMG_SECTION,
			payload: res.data,
		});

		dispatch(setAlert('Image position swaped', 'success'));
	} catch (err) {
		dispatch(setAlert('Section Modification Failed', 'error'));

		dispatch({
			type: SWAP_IMG_SECTION_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/***********************************************************************************************
 *
 *	 PUT REQUESTS
 *
 ***********************************************************************************************/

/**
 * Follow a shop
 * @param {*} id
 */
export const followShop = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/shops/follow/${id}`);

		dispatch({
			type: FOLLOW_SHOP,
			payload: res.data,
		});

		dispatch(setAlert('Following Shop', 'success'));
	} catch (err) {
		dispatch(setAlert("Can't Follow Shop", 'error'));

		dispatch({
			type: FOLLOW_SHOP_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Unfollow a shop
 * @param {*} id
 */
export const unFollowShop = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/shops/unfollow/${id}`);

		dispatch({
			type: UNFOLLOW_SHOP,
			payload: res.data,
		});

		dispatch(setAlert('Following Shop', 'success'));
	} catch (err) {
		dispatch(setAlert('Error Happened', 'error'));

		dispatch({
			type: FOLLOW_SHOP_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Rate shop
 * @param {*} formData
 * @param {*} id
 */
export const rateShop = (formData, id) => async (dispatch) => {
	console.log(FormData);
	console.log(id);
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/shops/feedback/${id}`, formData, config);
		console.log(res);

		dispatch({
			type: RATE_SHOP,
			payload: res.data,
		});

		dispatch(setAlert('Feedback posted!', 'success'));
	} catch (err) {
		dispatch(setAlert('Feedback posting failed!', 'error'));

		dispatch({
			type: RATE_SHOP_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Reply to user feedback
 * @param {*} formData
 * @param {*} shop_id
 * @param {*} feedback_id
 */
export const replyFeedback = (formData, shop_id, feedback_id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/shops/feedback-response/${shop_id}/${feedback_id}`, formData, config);

		dispatch({
			type: REPLY_FEEDBACK_SHOP,
			payload: res.data,
		});

		dispatch(setAlert('Reply posted!', 'success'));
	} catch (err) {
		dispatch(setAlert('Reply posting failed!', 'error'));

		dispatch({
			type: REPLY_FEEDBACK_SHOP_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Report feedback
 * @param {*} formData
 * @param {*} shop_id
 * @param {*} feedback_id
 */
export const reportFeedback = (formData, shop_id, feedback_id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/shops/feedback-report/${shop_id}/${feedback_id}`, formData, config);

		dispatch({
			type: REPORT_FEEDBACK_SHOP,
			payload: res.data,
		});

		dispatch(setAlert('Feedback Reported!', 'success'));
	} catch (err) {
		dispatch(setAlert('Reporting failed!', 'error'));

		dispatch({
			type: REPORT_FEEDBACK_SHOP_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/***********************************************************************************************
 *
 *	 NOT REQUESTS
 *
 ***********************************************************************************************/

/**
 * Close feedback
 */
export const closeFeedback = () => async (dispatch) => {
	try {
		dispatch({
			type: CLEAR_FEEDBACK_SHOP,
		});
	} catch (err) {
		dispatch({
			type: CLEAR_FEEDBACK_ERROR_SHOP,
		});
	}
};

/**
 * Close product
 */
export const closeProduct = () => async (dispatch) => {
	try {
		dispatch({
			type: CLEAR_PRODUCT_SHOP,
		});
	} catch (err) {
		dispatch({
			type: CLEAR_PRODUCT_ERROR_SHOP,
		});
	}
};

/**
 * Close transaction
 */
export const closeTransaction = () => async (dispatch) => {
	try {
		dispatch({
			type: CLEAR_TRANSACTION_SHOP,
		});
	} catch (err) {
		dispatch({
			type: CLEAR_TRANSACTION_SHOP_ERROR,
		});
	}
};

/**
 * Select feedback to open
 * @param {*} feedback
 */
export const selectFeedback = (feedback) => async (dispatch) => {
	try {
		dispatch({
			type: SELECT_FEEDBACK_SHOP,
			payload: feedback,
		});
	} catch (err) {
		dispatch(setAlert('Feedback Selection Failed', 'error'));
		dispatch({
			type: SELECT_FEEDBACK_ERROR_SHOP,
		});
	}
};

/**
 * Select report feedback
 * @param {*} feedback
 */
export const selectReportFeedback = (feedback) => async (dispatch) => {
	try {
		dispatch({
			type: SELECT_REPORT_FEEDBACK_SHOP,
			payload: feedback,
		});
	} catch (err) {
		dispatch(setAlert('Feedback Selection Failed', 'error'));
		dispatch({
			type: SELECT_REPORT_FEEDBACK_ERROR_SHOP,
		});
	}
};

/**
 * Set customer view
 */
export const setCustomerView = () => async (dispatch) => {
	try {
		dispatch(setAlert('Customer View Activated', 'success'));
		dispatch({
			type: SET_CUSTOMER_VIEW,
		});
	} catch (err) {
		dispatch(setAlert('Error, Try Again', 'error'));
		dispatch({
			type: SET_CUSTOMER_VIEW_ERROR,
		});
	}
};
