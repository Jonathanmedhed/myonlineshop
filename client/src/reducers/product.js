import {
	CLEAR_FEEDBACK_PRODUCT,
	CLEAR_FEEDBACK_ERROR_PRODUCT,
	CREATE_SECTION_PRODUCT_PRODUCT,
	CREATE_SECTION_ERROR_PRODUCT_PRODUCT,
	DELETE_SECTION_PRODUCT,
	DELETE_SECTION_ERROR_PRODUCT,
	EDIT_PRODUCT,
	EDIT_PRODUCT_ERROR,
	RATE_PRODUCT,
	RATE_PRODUCT_ERROR,
	REPLY_FEEDBACK_PRODUCT,
	REPLY_FEEDBACK_PRODUCT_ERROR,
	REPORT_PRODUCT,
	REPORT_PRODUCT_ERROR,
	REPORT_FEEDBACK_PRODUCT,
	REPORT_FEEDBACK_PRODUCT_ERROR,
	SELECT_FEEDBACK_PRODUCT,
	SELECT_FEEDBACK_ERROR_PRODUCT,
	SELECT_REPORT_FEEDBACK_PRODUCT,
	SELECT_REPORT_FEEDBACK_ERROR_PRODUCT,
	SET_PRODUCT,
	SET_PRODUCT_ERROR,
} from '../actions/types';
const initialState = {
	currentFeedback: null,
	loading: true,
	feedback: [],
	product: null,
	sections: [],
	showFeedback: false,
	showReportFeedback: false,
	showReportProduct: false,
	error: {},
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CLEAR_FEEDBACK_PRODUCT:
			return {
				...state,
				showFeedback: false,
				showReportFeedback: false,
				currentFeedback: null,
				loading: false,
			};
		case CREATE_SECTION_PRODUCT_PRODUCT:
			return {
				...state,
				product: payload,
				sections: payload.sections,
				loading: false,
			};
		case DELETE_SECTION_PRODUCT:
			return {
				...state,
				sections: payload,
				loading: false,
			};
		case EDIT_PRODUCT:
			return {
				...state,
				product: payload.product,
				loading: false,
			};
		case RATE_PRODUCT:
			return {
				...state,
				feedback: payload,
				loading: false,
			};
		case REPLY_FEEDBACK_PRODUCT:
			return {
				...state,
				feedback: payload.shopFeedback,
				currentFeedback: payload.feedback,
				loading: false,
			};
		case REPORT_FEEDBACK_PRODUCT:
			return {
				...state,
				feedback: payload.shopFeedback,
				currentFeedback: payload.feedback,
				loading: false,
			};
		case SELECT_FEEDBACK_PRODUCT:
			return {
				...state,
				currentFeedback: payload,
				showFeedback: true,
				loading: false,
			};
		case SELECT_REPORT_FEEDBACK_PRODUCT:
			return {
				...state,
				currentFeedback: payload,
				showReportFeedback: true,
				loading: false,
			};
		case SET_PRODUCT:
			return {
				...state,
				feedback: payload.feedback,
				product: payload,
				sections: payload.sections,
				loading: false,
			};
		case CLEAR_FEEDBACK_ERROR_PRODUCT:
		case CREATE_SECTION_ERROR_PRODUCT_PRODUCT:
		case DELETE_SECTION_ERROR_PRODUCT:
		case RATE_PRODUCT_ERROR:
		case REPLY_FEEDBACK_PRODUCT_ERROR:
		case REPORT_FEEDBACK_PRODUCT_ERROR:
		case SELECT_FEEDBACK_ERROR_PRODUCT:
		case SELECT_REPORT_FEEDBACK_ERROR_PRODUCT:
		case REPORT_PRODUCT:
		case REPORT_PRODUCT_ERROR:
		case SET_PRODUCT_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
}
