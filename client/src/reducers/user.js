import {
	CLEAR_FEEDBACK,
	CLEAR_FEEDBACK_ERROR,
	CREATE_SHOP,
	CREATE_SHOP_ERROR,
	DELETE_ACCOUNT_SUCCESS,
	DELETE_ACCOUNT_ERROR,
	DELETE_PRODUCT,
	DELETE_PRODUCT_ERROR,
	DELETE_TRANSACTION,
	DELETE_TRANSACTION_ERROR,
	EDIT_ORDER,
	EDIT_ORDER_ERROR,
	EDIT_USER,
	EDIT_USER_ERROR,
	GET_USER_ERROR,
	GET_USER_SUCCESS,
	GET_USER_BY_ID_ERROR,
	GET_USER_BY_ID_SUCCESS,
	RATE_USER,
	RATE_USER_ERROR,
	SET_CHART_PRODUCT,
	SET_CHART_PRODUCT_ERROR,
	SET_CHART_SHOP,
	SET_CHART_SHOP_ERROR,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_TO_DELETE,
	GET_PRODUCT_ERROR,
	CLEAR_PRODUCT,
	CLEAR_PRODUCT_ERROR,
	CLEAR_TRANSACTION,
	GET_SHOP_TO_DELETE,
	GET_SHOP_TO_DELETE_ERROR,
	DELETE_SHOP,
	DELETE_SHOP_ERROR,
	GET_TRANSACTION_SALE,
	GET_TRANSACTION_PURCHASE,
	GET_TRANSACTION_ERROR,
	GET_ORDER_SALE,
	GET_ORDER_PURCHASE,
	REPLY_FEEDBACK_USER,
	REPLY_FEEDBACK_USER_ERROR,
	REPORT_FEEDBACK_USER,
	REPORT_FEEDBACK_USER_ERROR,
	SELECT_FEEDBACK,
	SELECT_FEEDBACK_ERROR,
	SELECT_REPORT_FEEDBACK,
	SELECT_REPORT_FEEDBACK_ERROR,
} from '../actions/types';
import { getOrders, transProductsQtyById } from '../actions/utilities';
const initialState = {
	loading: true,
	user: null,
	createdShop: null,
	currentFeedback: null,
	feedback: [],
	orderToShowSale: null,
	orderToShowPurchase: null,
	ordersApprovePurchase: null,
	ordersPreparePurchase: null,
	ordersReadyPurchase: null,
	ordersDeliveredPurchase: null,
	ordersApproveSale: null,
	ordersPrepareSale: null,
	ordersReadySale: null,
	ordersDeliveredSale: null,
	product: null,
	products: [],
	productsInTransactions: [],
	productToShow: null,
	productToDelete: null,
	shops: [],
	shop: null,
	shopToDelete: null,
	showFeedback: false,
	showReportFeedback: false,
	transactionsSold: [],
	transactionToShowSale: null,
	transactionToShowPurchase: null,
	isOwner: false,
	error: {},
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CLEAR_FEEDBACK:
			return {
				...state,
				showFeedback: false,
				showReportFeedback: false,
				currentFeedback: null,
				loading: false,
			};
		case CREATE_SHOP:
			return {
				...state,
				shops: payload,
				createdShop: payload[payload.length - 1],
				loading: false,
			};
		case DELETE_ACCOUNT_SUCCESS:
			return {
				...state,
				user: null,
				loading: false,
			};
		case DELETE_TRANSACTION:
			return {
				...state,
				transactionsSold: getOrders(payload).paid,
				orderToShowSale: null,
				orderToShowPurchase: null,
				ordersApprovePurchase: getOrders(payload).toApprove,
				ordersPreparePurchase: getOrders(payload).toPrepare,
				ordersReadyPurchase: getOrders(payload).ready,
				ordersDeliveredPurchase: getOrders(payload).delivered,
				ordersApproveSale: getOrders(payload).toApprove,
				ordersPrepareSale: getOrders(payload).toPrepare,
				ordersReadySale: getOrders(payload).ready,
				ordersDeliveredSale: getOrders(payload).delivered,
				loading: false,
			};
		case CLEAR_PRODUCT:
			return {
				...state,
				productToShow: null,
				loading: false,
			};
		case CLEAR_TRANSACTION:
			return {
				...state,
				transactionToShowSale: null,
				transactionToShowPurchase: null,
				orderToShowSale: null,
				orderToShowPurchase: null,
				loading: false,
			};
		case DELETE_PRODUCT:
			return {
				...state,
				products: payload,
				productToShow: null,
				productToDelete: null,
				loading: false,
			};
		case DELETE_SHOP:
			return {
				...state,
				shops: payload,
				loading: false,
			};
		case EDIT_ORDER:
			return {
				...state,
				transactionsSold: getOrders(payload).paid,
				orderToShowSale: null,
				orderToShowPurchase: null,
				ordersApprovePurchase: getOrders(payload).toApprove,
				ordersPreparePurchase: getOrders(payload).toPrepare,
				ordersReadyPurchase: getOrders(payload).ready,
				ordersDeliveredPurchase: getOrders(payload).delivered,
				ordersApproveSale: getOrders(payload).toApprove,
				ordersPrepareSale: getOrders(payload).toPrepare,
				ordersReadySale: getOrders(payload).ready,
				ordersDeliveredSale: getOrders(payload).delivered,
				loading: false,
			};
		case EDIT_USER:
			return {
				...state,
				user: payload,
				loading: false,
			};
		case GET_ORDER_SALE:
			return {
				...state,
				orderToShowSale: payload,
				loading: false,
			};
		case GET_ORDER_PURCHASE:
			return {
				...state,
				orderToShowPurchase: payload,
				loading: false,
			};
		case GET_TRANSACTION_SALE:
			return {
				...state,
				transactionToShowSale: payload,
				loading: false,
			};
		case GET_TRANSACTION_PURCHASE:
			return {
				...state,
				transactionToShowPurchase: payload,
				loading: false,
			};
		case GET_USER_SUCCESS:
			return {
				...state,
				user: payload,
				shops: payload.shops_owned,
				shop: payload.shops_owned[0],
				transactionsSold: getOrders(payload.transactions_sale).paid,
				orderToShowSale: null,
				orderToShowPurchase: null,
				ordersApprovePurchase: getOrders(payload.transactions_purchase).toApprove,
				ordersPreparePurchase: getOrders(payload.transactions_purchase).toPrepare,
				ordersReadyPurchase: getOrders(payload.transactions_purchase).ready,
				ordersDeliveredPurchase: getOrders(payload.transactions_purchase).delivered,
				ordersApproveSale: getOrders(payload.transactions_sale).toApprove,
				ordersPrepareSale: getOrders(payload.transactions_sale).toPrepare,
				ordersReadySale: getOrders(payload.transactions_sale).ready,
				ordersDeliveredSale: getOrders(payload.transactions_sale).delivered,
				product: payload.products[0],
				productsInTransactions:
					payload.transactions_sale &&
					payload.transactions_sale.length > 0 &&
					payload.products &&
					payload.products.length > 0 &&
					transProductsQtyById(getOrders(payload.transactions_sale).paid, payload.products[0]._id),
				products: payload.products,
				feedback: payload.feedback,
				isOwner: true,
				loading: false,
			};
		case GET_USER_BY_ID_SUCCESS:
			return {
				...state,
				user: payload,
				shops: payload.shops_owned,
				products: payload.products,
				feedback: payload.feedback,
				isOwner: null,
				loading: false,
			};
		case GET_PRODUCT_SUCCESS:
			return {
				...state,
				productToShow: payload,
				loading: false,
			};
		case GET_PRODUCT_TO_DELETE:
			return {
				...state,
				productToDelete: payload,
				loading: false,
			};
		case GET_SHOP_TO_DELETE:
			return {
				...state,
				shopToDelete: payload,
				loading: false,
			};
		case RATE_USER:
			return {
				...state,
				feedback: payload,
				loading: false,
			};
		case REPLY_FEEDBACK_USER:
			return {
				...state,
				feedback: payload.userFeedback,
				currentFeedback: payload.feedback,
				loading: false,
			};
		case REPORT_FEEDBACK_USER:
			return {
				...state,
				feedback: payload.userFeedback,
				currentFeedback: payload.feedback,
				loading: false,
			};
		case SELECT_FEEDBACK:
			return {
				...state,
				currentFeedback: payload,
				showFeedback: true,
				loading: false,
			};
		case SELECT_REPORT_FEEDBACK:
			return {
				...state,
				currentFeedback: payload,
				showReportFeedback: true,
				loading: false,
			};
		case SET_CHART_SHOP:
			return {
				...state,
				shop: payload,
				loading: false,
			};
		case SET_CHART_PRODUCT:
			return {
				...state,
				product: payload,
				productsInTransactions: transProductsQtyById(payload.transactionsSold, payload._id),
				loading: false,
			};
		case CREATE_SHOP_ERROR:
		case CLEAR_FEEDBACK_ERROR:
		case CLEAR_PRODUCT_ERROR:
		case DELETE_ACCOUNT_ERROR:
		case DELETE_TRANSACTION_ERROR:
		case EDIT_ORDER_ERROR:
		case EDIT_USER_ERROR:
		case GET_USER_ERROR:
		case GET_USER_BY_ID_ERROR:
		case RATE_USER_ERROR:
		case SET_CHART_SHOP_ERROR:
		case SET_CHART_PRODUCT_ERROR:
		case GET_PRODUCT_ERROR:
		case GET_SHOP_TO_DELETE_ERROR:
		case DELETE_PRODUCT_ERROR:
		case DELETE_SHOP_ERROR:
		case GET_TRANSACTION_ERROR:
		case REPLY_FEEDBACK_USER_ERROR:
		case REPORT_FEEDBACK_USER_ERROR:
		case SELECT_FEEDBACK_ERROR:
		case SELECT_REPORT_FEEDBACK_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
}
