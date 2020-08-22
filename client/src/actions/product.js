import axios from 'axios';
import { setAlert } from './alerts';
import {
	CLEAR_FEEDBACK_PRODUCT,
	CLEAR_FEEDBACK_ERROR_PRODUCT,
	CREATE_SECTION_PRODUCT_PRODUCT,
	CREATE_SECTION_ERROR_PRODUCT_PRODUCT,
	DELETE_SECTION_PRODUCT,
	DELETE_SECTION_ERROR_PRODUCT,
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

/**
 * Delete shop section
 * @param {*} id
 */
export const deleteSection = (product_id, section_id, setSuccess, setDeleted) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/products/section/${product_id}/${section_id}`);

		if (setDeleted) {
			setDeleted(true);
		}
		setSuccess(true);

		// dispatch updated sections and delete type
		dispatch({
			type: DELETE_SECTION_PRODUCT,
			payload: res.data,
		});
		dispatch(setAlert('Section Deleted!', 'success'));
	} catch (err) {
		dispatch(setAlert('Deletion Failed', 'error'));
		dispatch({
			type: DELETE_SECTION_ERROR_PRODUCT,
		});
	}
};

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
			type: CREATE_SECTION_PRODUCT_PRODUCT,
			payload: product,
		});

		dispatch(setAlert('Section Created', 'success'));
	} catch (err) {
		dispatch(setAlert('Section Creation Failed', 'error'));

		dispatch({
			type: CREATE_SECTION_ERROR_PRODUCT_PRODUCT,
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
