import axios from 'axios';
import { setAlert } from './alerts';
import {
	CLEAR_FEEDBACK,
	CLEAR_FEEDBACK_ERROR,
	CREATE_SHOP,
	CREATE_SHOP_ERROR,
	DELETE_ACCOUNT_SUCCESS,
	DELETE_ACCOUNT_ERROR,
	DELETE_TRANSACTION,
	DELETE_TRANSACTION_ERROR,
	EDIT_ORDER,
	EDIT_ORDER_ERROR,
	EDIT_USER,
	EDIT_USER_ERROR,
	GET_USER_SUCCESS,
	GET_USER_ERROR,
	GET_USER_BY_ID_SUCCESS,
	GET_USER_BY_ID_ERROR,
	RATE_USER,
	RATE_USER_ERROR,
	SET_CHART_PRODUCT,
	SET_CHART_PRODUCT_ERROR,
	SET_CHART_SHOP,
	SET_CHART_SHOP_ERROR,
	GET_ORDER_SALE,
	GET_ORDER_PURCHASE,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_TO_DELETE,
	GET_PRODUCT_ERROR,
	CLEAR_PRODUCT,
	CLEAR_PRODUCT_ERROR,
	CLEAR_TRANSACTION,
	CLEAR_TRANSACTION_ERROR,
	DELETE_PRODUCT,
	DELETE_PRODUCT_ERROR,
	GET_SHOP_TO_DELETE,
	GET_SHOP_TO_DELETE_ERROR,
	DELETE_SHOP,
	DELETE_SHOP_ERROR,
	GET_TRANSACTION_SALE,
	GET_TRANSACTION_PURCHASE,
	GET_TRANSACTION_ERROR,
	LOGOUT,
	REPLY_FEEDBACK_USER,
	REPLY_FEEDBACK_USER_ERROR,
	REPORT_FEEDBACK_USER,
	REPORT_FEEDBACK_USER_ERROR,
	SELECT_FEEDBACK,
	SELECT_FEEDBACK_ERROR,
	SELECT_REPORT_FEEDBACK,
	SELECT_REPORT_FEEDBACK_ERROR,
	CLEAR_TRANSACTION_SHOP,
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
		const res = await axios.delete(`/api/users/product/${id}`);
		// dispatch updated products and delete type
		dispatch({
			type: DELETE_PRODUCT,
			payload: res.data,
		});
		dispatch(setAlert('Product Deleted!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Deletion Failed', 'error')));
		}
		dispatch({
			type: DELETE_PRODUCT_ERROR,
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
			type: DELETE_SHOP,
			payload: res.data,
		});
		dispatch(setAlert('Shop Deleted!', 'success'));
		history.push('/user');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Deletion Failed', 'error')));
		}
		dispatch({
			type: DELETE_SHOP_ERROR,
		});
	}
};

/**
 * Delete a transaction by id
 * @param {*} id
 */
export const deleteTransaction = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/transactions/${id}`);
		// dispatch updated transactions and delete type
		dispatch({
			type: DELETE_TRANSACTION,
			payload: res.data,
		});
		dispatch(setAlert('Transaction Deleted!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Deletion Failed', 'error')));
		}
		dispatch({
			type: DELETE_TRANSACTION_ERROR,
		});
	}
};

/**
 * Delete a user account
 * @param {*} id
 */
export const deleteUser = (history) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/users/`);
		// dispatch updated products and delete type
		dispatch({ type: LOGOUT });
		dispatch({
			type: DELETE_ACCOUNT_SUCCESS,
		});
		dispatch(setAlert('Account Deleted!', 'success'));
		history.replace('/');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Deletion Failed', 'error')));
		}
		dispatch({
			type: DELETE_ACCOUNT_ERROR,
		});
	}
};

/***********************************************************************************************
 *
 *	 GET REQUESTS
 *
 ***********************************************************************************************/

/**
 *  Get current session user
 */
export const getCurrentUser = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/users/');
		// dispatch user info and success type
		dispatch({
			type: GET_USER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: GET_USER_ERROR,
		});
	}
};

/**
 *  Get current session user
 */
export const getUserById = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/users/${id}`);
		// dispatch user info and success type
		dispatch({
			type: GET_USER_BY_ID_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: GET_USER_BY_ID_ERROR,
		});
	}
};

/**
 * Get purchase order using id
 * @param {*} id
 */
export const getOrderPurchase = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/transactions/${id}`);
		// dispatch transaction info and success type
		dispatch({
			type: GET_ORDER_PURCHASE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: GET_TRANSACTION_ERROR,
		});
	}
};

/**
 * Get sale order using id
 * @param {*} id
 */
export const getOrderSale = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/transactions/${id}`);
		// dispatch transaction info and success type
		dispatch({
			type: GET_ORDER_SALE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: GET_TRANSACTION_ERROR,
		});
	}
};

/**
 * Get purchase transaction using id
 * @param {*} id
 */
export const getTransactionPurchase = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/transactions/${id}`);
		// dispatch transaction info and success type
		dispatch({
			type: GET_TRANSACTION_PURCHASE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: GET_TRANSACTION_ERROR,
		});
	}
};

/**
 * Get sale transaction using id
 * @param {*} id
 */
export const getTransactionSale = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/transactions/${id}`);
		// dispatch transaction info and success type
		dispatch({
			type: GET_TRANSACTION_SALE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: GET_TRANSACTION_ERROR,
		});
	}
};

/**
 * Get user using id
 * @param {*} id
 */
export const getUserByID = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/users/${id}`);
		// dispatch user info and success type
		dispatch({
			type: GET_USER_BY_ID_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: GET_USER_BY_ID_ERROR,
		});
	}
};

/**
 * Get product using id
 * @param {*} id
 */
export const getProduct = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/products/${id}`);
		// dispatch user info and success type
		dispatch({
			type: GET_PRODUCT_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: GET_PRODUCT_ERROR,
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
		// dispatch user info and success type
		dispatch({
			type: GET_PRODUCT_TO_DELETE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Product Selection Failed', 'error')));
		}
		dispatch({
			type: GET_PRODUCT_ERROR,
		});
	}
};

/**
 * Get shop to delete using id
 * @param {*} id
 */
export const getShopToDelete = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/shops/${id}`);
		// dispatch shop to be deleted
		dispatch({
			type: GET_SHOP_TO_DELETE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Shop Selection Failed', 'error')));
		}
		dispatch({
			type: GET_SHOP_TO_DELETE_ERROR,
		});
	}
};

/**
 * Get shop transactions, and dispatch shop with transactions
 * @param {*} shop
 */
export const getShopChart = (shop) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/shops/transactions/${shop._id}`);
		// dispatch shop info and success type
		shop.transactions = res.data;
		dispatch({
			type: SET_CHART_SHOP,
			payload: shop,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Shop Selection Failed', 'error')));
		}
		dispatch({
			type: SET_CHART_SHOP_ERROR,
		});
	}
};

/***********************************************************************************************
 *
 *	 POST REQUESTS
 *
 ***********************************************************************************************/

/**
 * Create Shop
 * @param {*} formData
 */
export const createShop = (formData, setSuccess) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/shops', formData, config);
		console.log(res.data);
		if (res.status === 200 && res.data.name) {
			const res = await axios.get(`/api/shops`);
			setSuccess(true);
			dispatch({
				type: CREATE_SHOP,
				payload: res.data,
			});
			dispatch(setAlert('Shop Created', 'success'));
		} else if (res.data === 'Shop name already in use') {
			dispatch(setAlert('Name already in use', 'error'));
			dispatch({
				type: CREATE_SHOP_ERROR,
			});
		} else if (res.data === 'Shop email already in use') {
			dispatch(setAlert('Email already in use', 'error'));
			dispatch({
				type: CREATE_SHOP_ERROR,
			});
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Creation Failed', 'error')));
		}

		dispatch({
			type: CREATE_SHOP_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Edit user
 * @param {*} formData
 * @param {*} id
 */
export const editUser = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/users/edit', formData, config);

		dispatch({
			type: EDIT_USER,
			payload: res.data,
		});

		dispatch(setAlert('User Updated', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Edition Failed', 'error')));
		}

		dispatch({
			type: EDIT_USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

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
			type: EDIT_ORDER,
			payload: res.data,
		});

		dispatch(setAlert(reverse ? 'Order Approval Reversed' : 'Order Approved', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) =>
				dispatch(setAlert(reverse ? 'Approval Reversal Failed' : 'Approval Failed', 'error'))
			);
		}

		dispatch({
			type: EDIT_ORDER_ERROR,
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
			type: EDIT_ORDER,
			payload: res.data,
		});

		dispatch(setAlert(reverse ? 'Order is not ready' : 'Order is now ready', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Edition Failed', 'error')));
		}

		dispatch({
			type: EDIT_ORDER_ERROR,
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
			type: EDIT_ORDER,
			payload: res.data,
		});

		dispatch(setAlert(reverse ? 'Order is not Delivered' : 'Order set as Delivered', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Edition Failed', 'error')));
		}

		dispatch({
			type: EDIT_ORDER_ERROR,
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
			type: EDIT_ORDER,
			payload: res.data,
		});

		dispatch(setAlert('Order paid and delivered', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Edition Failed', 'error')));
		}

		dispatch({
			type: EDIT_ORDER_ERROR,
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
 * Rate user
 * @param {*} formData
 * @param {*} id
 */
export const rateUser = (formData, id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/users/feedback/${id}`, formData, config);

		dispatch({
			type: RATE_USER,
			payload: res.data,
		});

		dispatch(setAlert('Feedback posted!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Feedback posting failed!', 'error')));
		}

		dispatch({
			type: RATE_USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Reply to user feedback
 * @param {*} formData
 * @param {*} user_id
 * @param {*} feedback_id
 */
export const replyFeedback = (formData, user_id, feedback_id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/users/feedback-response/${user_id}/${feedback_id}`, formData, config);

		dispatch({
			type: REPLY_FEEDBACK_USER,
			payload: res.data,
		});

		dispatch(setAlert('Reply posted!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Reply posting failed!', 'error')));
		}

		dispatch({
			type: REPLY_FEEDBACK_USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Report feedback
 * @param {*} formData
 * @param {*} user_id
 * @param {*} feedback_id
 */
export const reportFeedback = (formData, user_id, feedback_id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/users/feedback-report/${user_id}/${feedback_id}`, formData, config);

		dispatch({
			type: REPORT_FEEDBACK_USER,
			payload: res.data,
		});

		dispatch(setAlert('Feedback Reported!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Reporting failed!', 'error')));
		}

		dispatch({
			type: REPORT_FEEDBACK_USER_ERROR,
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
			type: CLEAR_FEEDBACK,
		});
	} catch (err) {
		dispatch({
			type: CLEAR_FEEDBACK_ERROR,
		});
	}
};

/**
 * Close product
 */
export const closeProduct = () => async (dispatch) => {
	try {
		dispatch({
			type: CLEAR_PRODUCT,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: CLEAR_PRODUCT_ERROR,
		});
	}
};

/**
 * Close transaction
 */
export const closeTransaction = () => async (dispatch) => {
	try {
		dispatch({
			type: CLEAR_TRANSACTION,
		});
	} catch (err) {
		dispatch({
			type: CLEAR_TRANSACTION_ERROR,
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
			type: SET_CHART_PRODUCT,
			payload: product,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Product Selection Failed', 'error')));
		}
		dispatch({
			type: SET_CHART_PRODUCT_ERROR,
		});
	}
};

/**
 * Select feedback to open
 * @param {*} feedback
 */
export const selectFeedback = (feedback) => async (dispatch) => {
	console.log('working');
	try {
		dispatch({
			type: SELECT_FEEDBACK,
			payload: feedback,
		});
	} catch (err) {
		dispatch(setAlert('Feedback Selection Failed', 'error'));
		dispatch({
			type: SELECT_FEEDBACK_ERROR,
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
			type: SELECT_REPORT_FEEDBACK,
			payload: feedback,
		});
	} catch (err) {
		dispatch(setAlert('Feedback Selection Failed', 'error'));
		dispatch({
			type: SELECT_REPORT_FEEDBACK_ERROR,
		});
	}
};
