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
	DELETE_SHOP_SHOP,
	DELETE_SHOP_ERROR_SHOP,
	DELETE_TRANSACTION_SHOP,
	DELETE_TRANSACTION_ERROR_SHOP,
	EDIT_ORDER_SHOP,
	EDIT_ORDER_ERROR_SHOP,
	EDIT_PRODUCT_SHOP,
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
} from '../actions/types';
import { getOrders, transProductsQtyById } from '../actions/utilities';
const initialState = {
	loading: true,
	shop: null,
	chartProduct: null,
	createdProduct: null,
	currentFeedback: null,
	currentUser: null,
	feedback: [],
	hasProductSection: false,
	isOwner: false,
	isFollower: false,
	orderToShow: null,
	ordersApprove: [],
	ordersPrepare: [],
	ordersReady: [],
	ordersDelivered: [],
	orderToShow: null,
	product: null,
	products: [],
	productsInTransactions: [],
	productToDelete: null,
	showFeedback: false,
	showReportFeedback: false,
	showProductDeletion: false,
	sections: [],
	tags: [],
	transactions: [],
	transactionToShow: null,
	type: null,
	error: {},
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CLEAR_FEEDBACK_SHOP:
			return {
				...state,
				showFeedback: false,
				showReportFeedback: false,
				currentFeedback: null,
				loading: false,
			};
		case CLEAR_PRODUCT_SHOP:
			return {
				...state,
				product: null,
				loading: false,
			};
		case CLEAR_TRANSACTION_SHOP:
			return {
				...state,
				orderToShow: null,
				transactionToShow: null,
				loading: false,
			};
		case CREATE_PRODUCT:
			return {
				...state,
				createdProduct: payload.products[payload.products.length - 1],
				products: payload.products,
				sections: payload.sections,
				loading: false,
			};
		case CREATE_SECTION:
			return {
				...state,
				sections: payload,
				loading: false,
			};
		case CREATE_SECTION_PRODUCT:
			return {
				...state,
				product: payload,
				loading: false,
			};
		case DELETE_PRODUCT_SHOP:
			return {
				...state,
				product: null,
				products: payload,
				productToDelete: null,
				showProductDeletion: false,
				loading: null,
			};
		case DELETE_SECTION:
			return {
				...state,
				sections: payload,
				loading: false,
			};
		case DELETE_SHOP_SHOP:
			return {
				...state,
				shop: null,
				chartProduct: null,
				currentUser: null,
				feedback: [],
				hasProductSection: false,
				isOwner: false,
				isFollower: false,
				orderToShow: null,
				ordersApprove: [],
				ordersPrepare: [],
				ordersReady: [],
				ordersDelivered: [],
				orderToShow: null,
				product: null,
				products: [],
				productsInTransactions: [],
				productToDelete: null,
				showProductDeletion: false,
				sections: [],
				tags: [],
				transactions: [],
				transactionToShow: null,
				type: null,
			};
		case DELETE_TRANSACTION_SHOP:
			return {
				...state,
				transactions: getOrders(payload).paid,
				orderToShow: null,
				ordersApprove: getOrders(payload).toApprove,
				ordersPrepare: getOrders(payload).toPrepare,
				ordersReady: getOrders(payload).ready,
				ordersDelivered: getOrders(payload).delivered,
				loading: false,
			};
		case EDIT_ORDER_SHOP:
			return {
				...state,
				transactions: getOrders(payload).paid,
				orderToShow: null,
				ordersApprove: getOrders(payload).toApprove,
				ordersPrepare: getOrders(payload).toPrepare,
				ordersReady: getOrders(payload).ready,
				ordersDelivered: getOrders(payload).delivered,
				loading: false,
			};
		case EDIT_PRODUCT_SHOP:
			return {
				...state,
				products: payload.products,
				loading: false,
			};
		case EDIT_SECTION:
			return {
				...state,
				sections: payload,
				loading: false,
			};
		case EDIT_SECTION_PRODUCT:
			return {
				...state,
				product: payload,
				loading: false,
			};
		case EDIT_SHOP:
			return {
				...state,
				shop: payload,
				tags: payload.tags,
				type: payload.type,
				loading: false,
			};
		case FOLLOW_SHOP:
			return {
				...state,
				isFollower: true,
				loading: false,
			};
		case UNFOLLOW_SHOP:
			return {
				...state,
				isFollower: false,
				loading: false,
			};
		case GET_ORDER:
			return {
				...state,
				orderToShow: payload,
				loading: false,
			};
		case GET_PRODUCT_SHOP_SUCCESS:
			return {
				...state,
				product: payload.product,
				productsInTransactions:
					payload.transactions &&
					payload.transactions.length > 0 &&
					transProductsQtyById(getOrders(payload.transactions).paid, payload.product._id),
				loading: false,
			};
		case GET_PRODUCT_TO_DELETE_SHOP:
			return {
				...state,
				productToDelete: payload,
				showProductDeletion: true,
				loading: false,
			};
		case GET_SHOP_SUCCESS:
			return {
				...state,
				currentUser: payload.currentUser,
				feedback: payload.feedback,
				hasProductSection: payload.hasProductSection,
				isOwner: payload.isOwner,
				isFollower: payload.isFollower,
				ordersApprove: getOrders(payload.transactions).toApprove,
				ordersPrepare: getOrders(payload.transactions).toPrepare,
				ordersReady: getOrders(payload.transactions).ready,
				ordersDelivered: getOrders(payload.transactions).delivered,
				chartProduct: payload.products[0],
				productsInTransactions:
					payload.transactions &&
					payload.transactions.length > 0 &&
					payload.products &&
					payload.products.length > 0 &&
					transProductsQtyById(getOrders(payload.transactions).paid, payload.products[0]._id),
				products: payload.products,
				sections: payload.sections,
				shop: payload.shop,
				tags: payload.shop.tags,
				transactions: getOrders(payload.transactions).paid,
				type: payload.shop.type,
				loading: false,
			};
		case GET_TRANSACTION:
			return {
				...state,
				transactionToShow: payload,
				loading: false,
			};
		case MOVE_SECTION:
			return {
				...state,
				sections: payload,
				loading: false,
			};
		case RATE_SHOP:
			return {
				...state,
				feedback: payload,
				loading: false,
			};
		case REPLY_FEEDBACK_SHOP:
			return {
				...state,
				feedback: payload.shopFeedback,
				currentFeedback: payload.feedback,
				loading: false,
			};
		case REPORT_FEEDBACK_SHOP:
			return {
				...state,
				feedback: payload.shopFeedback,
				currentFeedback: payload.feedback,
				loading: false,
			};
		case SELECT_FEEDBACK_SHOP:
			return {
				...state,
				currentFeedback: payload,
				showFeedback: true,
				loading: false,
			};
		case SELECT_REPORT_FEEDBACK_SHOP:
			return {
				...state,
				currentFeedback: payload,
				showReportFeedback: true,
				loading: false,
			};
		case SET_CHART_PRODUCT_SHOP:
			return {
				...state,
				chartProduct: payload,
				productsInTransactions: transProductsQtyById(payload.transactionsSold, payload._id),
				loading: false,
			};
		case SET_CUSTOMER_VIEW:
			return {
				...state,
				isOwner: false,
				loading: false,
			};
		case SWAP_IMG_SECTION:
			return {
				...state,
				sections: payload,
				loading: false,
			};
		case CLEAR_FEEDBACK_ERROR_SHOP:
		case CLEAR_PRODUCT_ERROR_SHOP:
		case CREATE_PRODUCT_ERROR:
		case CLEAR_TRANSACTION_SHOP_ERROR:
		case CREATE_SECTION_ERROR:
		case CREATE_SECTION_ERROR_PRODUCT:
		case DELETE_PRODUCT_ERROR_SHOP:
		case DELETE_SECTION_ERROR:
		case DELETE_SHOP_ERROR_SHOP:
		case DELETE_TRANSACTION_ERROR_SHOP:
		case EDIT_ORDER_ERROR_SHOP:
		case EDIT_SECTION_ERROR:
		case EDIT_SECTION_ERROR_PRODUCT:
		case EDIT_SHOP_ERROR:
		case FOLLOW_SHOP_ERROR:
		case GET_PRODUCT_SHOP_ERROR:
		case GET_SHOP_ERROR:
		case GET_TRANSACTION_ERROR_SHOP:
		case MOVE_SECTION_ERROR:
		case RATE_SHOP_ERROR:
		case REPLY_FEEDBACK_SHOP_ERROR:
		case REPORT_FEEDBACK_SHOP_ERROR:
		case SELECT_FEEDBACK_ERROR_SHOP:
		case SELECT_REPORT_FEEDBACK_ERROR_SHOP:
		case SET_CHART_PRODUCT_ERROR_SHOP:
		case SET_CUSTOMER_VIEW_ERROR:
		case SWAP_IMG_SECTION_ERROR:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
}
