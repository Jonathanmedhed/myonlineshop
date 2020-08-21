import axios from 'axios';
import { setAlert } from './alerts';
import {
	CLEAR_FEEDBACK_PRODUCT,
	CLEAR_FEEDBACK_ERROR_PRODUCT,
	RATE_PRODUCT,
	RATE_PRODUCT_ERROR,
	REPLY_FEEDBACK_PRODUCT,
	REPLY_FEEDBACK_PRODUCT_ERROR,
	REPORT_FEEDBACK_PRODUCT,
	REPORT_FEEDBACK_PRODUCT_ERROR,
	REPORT_PRODUCT,
	REPORT_PRODUCT_ERROR,
	SELECT_FEEDBACK_PRODUCT,
	SELECT_FEEDBACK_ERROR_PRODUCT,
	SELECT_REPORT_FEEDBACK_PRODUCT,
	SELECT_REPORT_FEEDBACK_ERROR_PRODUCT,
	SET_PRODUCT,
	SET_PRODUCT_ERROR,
} from './types';

/***********************************************************************************************
 *
 *	 DELETE REQUESTS
 *
 ***********************************************************************************************/

/***********************************************************************************************
 *
 *	 GET REQUESTS
 *
 ***********************************************************************************************/

/***********************************************************************************************
 *
 *	 POST REQUESTS
 *
 ***********************************************************************************************/

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
export const rateProduct = (formData, id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/products/feedback/${id}`, formData, config);

		dispatch({
			type: RATE_PRODUCT,
			payload: res.data,
		});

		dispatch(setAlert('Feedback posted!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Feedback posting failed!', 'error')));
		}

		dispatch({
			type: RATE_PRODUCT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Reply to user feedback
 * @param {*} formData
 * @param {*} product_id
 * @param {*} feedback_id
 */
export const replyFeedback = (formData, product_id, feedback_id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/products/feedback-response/${product_id}/${feedback_id}`, formData, config);

		dispatch({
			type: REPLY_FEEDBACK_PRODUCT,
			payload: res.data,
		});

		dispatch(setAlert('Reply posted!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Reply posting failed!', 'error')));
		}

		dispatch({
			type: REPLY_FEEDBACK_PRODUCT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Report feedback
 * @param {*} formData
 * @param {*} product_id
 * @param {*} feedback_id
 */
export const reportFeedback = (formData, product_id, feedback_id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/products/feedback-report/${product_id}/${feedback_id}`, formData, config);

		dispatch({
			type: REPORT_FEEDBACK_PRODUCT,
			payload: res.data,
		});

		dispatch(setAlert('Feedback Reported!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Reporting failed!', 'error')));
		}

		dispatch({
			type: REPORT_FEEDBACK_PRODUCT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

/**
 * Report product
 * @param {*} formData
 * @param {*} product_id
 */
export const reportProduct = (formData, product_id, close) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/products/report/${product_id}`, formData, config);

		close();

		dispatch({
			type: REPORT_PRODUCT,
			payload: res.data,
		});

		dispatch(setAlert('Product Reported!', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert('Reporting failed!', 'error')));
		}

		dispatch({
			type: REPORT_PRODUCT_ERROR,
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
			type: CLEAR_FEEDBACK_PRODUCT,
		});
	} catch (err) {
		dispatch({
			type: CLEAR_FEEDBACK_ERROR_PRODUCT,
		});
	}
};

/**
 * Set Product
 * @param {*} product
 */
export const setProduct = (product) => async (dispatch) => {
	try {
		dispatch({
			type: SET_PRODUCT,
			payload: product,
		});
	} catch (err) {
		dispatch(setAlert('Product not found', 'error'));

		dispatch({
			type: SET_PRODUCT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
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
			type: SELECT_FEEDBACK_PRODUCT,
			payload: feedback,
		});
	} catch (err) {
		dispatch(setAlert('Feedback Selection Failed', 'error'));
		dispatch({
			type: SELECT_FEEDBACK_ERROR_PRODUCT,
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
			type: SELECT_REPORT_FEEDBACK_PRODUCT,
			payload: feedback,
		});
	} catch (err) {
		dispatch(setAlert('Feedback Selection Failed', 'error'));
		dispatch({
			type: SELECT_REPORT_FEEDBACK_ERROR_PRODUCT,
		});
	}
};
