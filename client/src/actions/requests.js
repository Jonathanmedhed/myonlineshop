const axios = require('axios');

// General config for Json data submit
const configJson = {
	headers: {
		'Content-Type': 'application/json',
	},
};

// General config for MultiData Submit (Files)
const configMulti = {
	headers: {
		'content-type': 'multipart/form-data',
	},
};

/*****************************************************************************************************
 *  Delete Requests
 *****************************************************************************************************/

/*************************************** User Route Related ***************************************/

export const deleteUserProduct = async (id) => {
	const res = await axios.delete(`/api/users/product/${id}`);
	return res;
};

/*************************************** Shop Route Related ***************************************/

export const deleteShop = async (id) => {
	const res = await axios.delete(`/api/shops/${id}`);
	return res;
};

export const deleteShopProduct = async (id) => {
	const res = await axios.delete(`/api/shops/product/${id}`);
	return res;
};

export const deleteSection = async (shop_id, section_id) => {
	const res = await axios.delete(`/api/shops/section/${shop_id}/${section_id}`);
	return res;
};

/*************************************** Product Route Related ***************************************/

export const deleteProductSection = async (product_id, section_id) => {
	const res = await axios.delete(`/api/products/section/${product_id}/${section_id}`);
	return res;
};

/*************************************** Transaction Route Related ***************************************/

export const deleteTransaction = async (id) => {
	const res = await axios.delete(`/api/transactions/${id}`);
	return res;
};

/*************************************** Delete Route Related ***************************************/

export const deleteUser = async () => {
	const res = await axios.delete(`/api/users/`);
	return res;
};

/*****************************************************************************************************
 *  Get Requests
 *****************************************************************************************************/

/*************************************** Product Route Related ***************************************/

/**
 * Product by ID
 */
export const getProduct = async (id) => {
	const res = await axios.get(`/api/products/${id}`);
	return res;
};

/**
 * Product's sections
 */
export const getProductSections = async (id) => {
	const res = await axios.get(`/api/products/sections/${id}`);
	return res;
};

/**
 * Product feedback
 */
export const getProductFeedback = async (id) => {
	const res = await axios.get(`/api/products/feedback/${id}`);
	return res;
};

/*************************************** Shop Route Related ******************************************/

/**
 * Shop feedback
 */
export const getShopFeedback = async (id) => {
	const res = await axios.get(`/api/shops/feedback/${id}`);
	return res;
};

/**
 * Shop's sections
 */
export const getSections = async (id) => {
	const res = await axios.get(`/api/shops/sections/${id}`);
	return res;
};

/**
 * Shop by ID
 */
export const getShop = async (id) => {
	const res = await axios.get(`/api/shops/${id}`);
	return res;
};

/**
 * Shop by name
 */
export const getShopByName = async (name) => {
	const res = await axios.get(`/api/shops/name/${name}`);
	return res;
};

/**
 * Shop's products
 */
export const getShopProducts = async (id) => {
	const res = await axios.get(`/api/shops/products/${id}`);
	return res;
};

/**
 * Shop transactions
 */
export const getShopTransactions = async (id) => {
	const res = await axios.get(`/api/shops/transactions/${id}`);
	return res;
};

/*************************************** Transaction Route Related ******************************************/

/**
 * Shop transactions
 */
export const getTransaction = async (id) => {
	const res = await axios.get(`/api/transactions/${id}`);
	return res;
};

/*************************************** User Route Related ******************************************/

/**
 * User's feedback
 */
export const getFeedback = async () => {
	const res = await axios.get(`/api/feedback/`);
	return res;
};

/**
 * User feedback by user id
 */
export const getUserFeedback = async (id) => {
	const res = await axios.get(`/api/users/feedback/${id}`);
	return res;
};

/**
 * Current request's user
 */
export const getCurrentUser = async () => {
	const res = await axios.get('/api/users/');
	return res;
};

/**
 * Get user by Id
 */
export const getUserById = async (id) => {
	const res = await axios.get(`/api/users/${id}`);
	return res;
};

/**
 * User's shops
 */
export const getShops = async () => {
	const res = await axios.get(`/api/shops`);
	return res;
};

/**
 * User shops by user id
 */
export const getUserShops = async (id) => {
	const res = await axios.get(`/api/users/shops/${id}`);
	return res;
};

/**
 * User's products
 */
export const getProducts = async () => {
	const res = await axios.get(`/api/products`);
	return res;
};

/**
 * User products by user id
 */
export const getUserProducts = async (id) => {
	const res = await axios.get(`/api/users/products/${id}`);
	return res;
};

/**
 * User purchase transactions
 */
export const getTransactionsBought = async () => {
	const res = await axios.get(`/api/transactions/bought`);
	return res;
};

/**
 * User sell transactions
 */
export const getTransactionsSold = async () => {
	const res = await axios.get(`/api/transactions/sold`);
	return res;
};

/**
 * User purchase transactions by user id
 */
export const getUserTransacBought = async (id) => {
	const res = await axios.get(`/api/users/transactions-buy/${id}`);
	return res;
};

/**
 * User sold transactions by user id
 */
export const getUserTransacSold = async (id) => {
	const res = await axios.get(`/api/users/transactions-sold/${id}`);
	return res;
};

/*****************************************************************************************************
 *  Post Requests
 *****************************************************************************************************/

/*************************************** IMG Related ******************************************/

/**
 * IMG upload, and assign to user
 *
 * @param {*} formData Img/Imgs
 */
export const uploadImg = async (formData) => {
	const res = await axios.post('/api/users/upload', formData, configMulti);
	return res;
};

/**
 * IMG upload, and return path
 *
 * @param {*} formData Img/Imgs
 */
export const uploadImgOnly = async (formData) => {
	const res = await axios.post('/api/users/upload-only', formData, configMulti);
	return res;
};

/*************************************** Product Route Related ******************************************/

/*************************************** IMG Related ******************************************/

/**
 * IMG logo upload, and assign to shop
 *
 * @param {*} formData Img/Imgs
 */
export const uploadProductImgs = async (formData, id) => {
	const res = await axios.post(`/api/products/upload/${id}`, formData, configMulti);
	return res;
};

/**
 * Create Product
 * @param {*} formData
 */
export const createProduct = async (formData, id) => {
	const res = await axios.post(`/api/shops/product/${id}`, formData, configJson);
	return res;
};

/**
 * Edit Product
 * @param {*} formData
 */
export const editProduct = async (formData, id) => {
	const res = await axios.post(`/api/shops/product/edit/${id}`, formData, configJson);
	return res;
};

/**
 * Sold out Product
 * @param {*} formData
 */
export const soldOutProduct = async (id) => {
	const res = await axios.post(`/api/shops/product/soldout/${id}`);
	return res;
};

/**
 * Create Product Section
 * @param {*} formData
 */
export const createProductSection = async (formData, id) => {
	const res = await axios.post(`/api/products/section/${id}`, formData, configJson);
	return res;
};

/**
 * Edit Section
 * @param {*} formData
 */
export const editProductSection = async (formData, id) => {
	const res = await axios.post(`/api/products/section/edit/${id}`, formData, configJson);
	return res;
};

/**
 * Move Section
 * @param {*} formData
 */
export const moveProductSection = async (formData, id) => {
	const res = await axios.post(`/api/products/section/move/${id}`, formData, configJson);
	return res;
};

/*************************************** Shop Route Related ******************************************/

/*************************************** IMG Related ******************************************/

/**
 * IMG logo upload, and assign to shop
 *
 * @param {*} formData Img/Imgs
 */
export const uploadShopLogo = async (formData, id) => {
	const res = await axios.post(`/api/shops/upload_logo/${id}`, formData, configMulti);
	return res;
};

/**
 * IMG jumbo upload, and assign to shop
 *
 * @param {*} formData Img/Imgs
 */
export const uploadShopJumbo = async (formData, id) => {
	const res = await axios.post(`/api/shops/upload_jumbo/${id}`, formData, configMulti);
	return res;
};

/******************************************************************************************** */
/**
 * Create Shop Section
 * @param {*} formData
 */
export const createSection = async (formData, id) => {
	const res = await axios.post(`/api/shops/section/${id}`, formData, configJson);
	return res;
};

/**
 * Create Shop
 * @param {*} formData
 */
export const createShop = async (formData) => {
	const res = await axios.post('/api/shops', formData, configJson);
	return res;
};

/**
 * Edit Shop
 * @param {*} formData
 */
export const editShop = async (formData, id) => {
	const res = await axios.post(`/api/shops/edit/${id}`, formData, configJson);
	return res;
};

/**
 * Remove Shop Logo
 * @param {*} formData
 */
export const removeLogo = async (id) => {
	const res = await axios.post(`/api/shops/remove-logo/${id}`);
	return res;
};

/**
 * Edit Section
 * @param {*} formData
 */
export const editSection = async (formData, id) => {
	const res = await axios.post(`/api/shops/section/edit/${id}`, formData, configJson);
	return res;
};

/**
 * Move Section
 * @param {*} formData
 */
export const moveSection = async (formData, id) => {
	const res = await axios.post(`/api/shops/section/move/${id}`, formData, configJson);
	return res;
};

/**
 * Swap Section's img position
 * @param {*} formData
 */
export const swapImgSection = async (id) => {
	const res = await axios.post(`/api/shops/section/swap/${id}`);
	return res;
};
/*************************************** Shop Route Related ******************************************/

/**
 * Create Transaction
 * @param {*} formData
 * @param {*} shop_id
 * @param {*} seller_id //User
 * @param {*} buyer_id
 */
export const createTransaction = async (formData, shop_id) => {
	const res = await axios.post(`/api/transactions/purchase/${shop_id}`, formData, configJson);
	return res;
};

/*************************************** Transaction Route Related ******************************************/

/**
 * Edit Transaction
 * @param {*} formData
 * @param {*} id
 */
export const editTransaction = async (formData, id) => {
	const res = await axios.post(`/api/transactions/${id}`, formData, configJson);
	return res;
};

/*************************************** User Route Related ******************************************/

/**
 * Edit User
 * @param {*} formData
 */
export const editUser = async (formData) => {
	const res = await axios.post('/api/users/edit', formData, configJson);
	return res;
};

export const sendEmail = async (email, subject, text) => {
	const emailToSend = {
		from: '',
		to: email,
		subject: subject,
		text: text,
	};

	const body = JSON.stringify({ emailToSend });

	await axios.post(`/api/users/send-email`, body, configJson);
};

/*****************************************************************************************************
 *  Put Requests
 *****************************************************************************************************/

/*************************************** Product Route Related ******************************************/

/**
 * Give Fideback to a product
 * @param {*} formData
 * @param {*} id
 */
export const rateProduct = async (formData, id) => {
	const res = await axios.put(`/api/products/feedback/${id}`, formData, configJson);
	return res;
};

/**
 * Replay to a feedback
 * @param {*} formData
 * @param {*} product_id
 * @param {*} feedback_id
 */
export const replayFeedbackProduct = async (formData, product_id, feedback_id) => {
	const res = await axios.put(`/api/products/feedback-response/${product_id}/${feedback_id}`, formData, configJson);
	return res;
};

/**
 * Report a feedback
 * @param {*} formData
 * @param {*} product_id
 * @param {*} feedback_id
 */
export const reportFeedbackProduct = async (formData, product_id, feedback_id) => {
	const res = await axios.put(`/api/products/feedback-report/${product_id}/${feedback_id}`, formData, configJson);
	return res;
};

/**
 * Report product
 * @param {*} formData
 * @param {*} product_id
 */
export const reportProductRequest = async (formData, product_id) => {
	const res = await axios.put(`/api/products/report/${product_id}`, formData, configJson);
	return res;
};

/**
 * Update Product visits of not logged in visitor
 * @param {*} id
 */
export const visitProduct = async (id) => {
	const res = await axios.put(`/api/products/visit/${id}`);
	return res;
};

/**
 * Update Product visits of logged in visitor
 * @param {*} id
 */
export const visitProductAuth = async (id) => {
	const res = await axios.put(`/api/products/visit-auth/${id}`);
	return res;
};

/*************************************** Shop Route Related ******************************************/

/**
 * Follow Shop
 * @param {*} formData
 * @param {*} id
 */
export const followShop = async (id) => {
	const res = await axios.put(`/api/shops/follow/${id}`);
	return res;
};

/**
 * Unfollow Shop
 * @param {*} formData
 * @param {*} id
 */
export const unFollowShop = async (id) => {
	const res = await axios.put(`/api/shops/unfollow/${id}`);
	return res;
};

/**
 * Rate Shop
 * @param {*} formData
 * @param {*} id
 */
export const rateShop = async (formData, id) => {
	const res = await axios.put(`/api/shops/feedback/${id}`, formData, configJson);
	return res;
};

/**
 * Replay to a feedback
 * @param {*} formData
 * @param {*} shop_id
 * @param {*} feedback_id
 */
export const replayFeedbackShop = async (formData, shop_id, feedback_id) => {
	const res = await axios.put(`/api/shops/feedback-response/${shop_id}/${feedback_id}`, formData, configJson);
	return res;
};

/**
 * Report a feedback
 * @param {*} formData
 * @param {*} shop_id
 * @param {*} feedback_id
 */
export const reportFeedbackShop = async (formData, shop_id, feedback_id) => {
	const res = await axios.put(`/api/shops/feedback-report/${shop_id}/${feedback_id}`, formData, configJson);
	return res;
};

/**
 * Update Shop visits of not logged in visitor
 * @param {*} id
 */
export const visitShop = async (id) => {
	const res = await axios.put(`/api/shops/visit/${id}`);
	return res;
};

/**
 * Update Shop visits of logged in visitor
 * @param {*} id
 */
export const visitShopAuth = async (id) => {
	const res = await axios.put(`/api/shops/visit-auth/${id}`);
	return res;
};

/*************************************** User Route Related ******************************************/

/**
 * Rate an user
 * @param {} formData
 * @param {*} id
 */
export const rateUser = async (formData, id) => {
	const res = await axios.put(`/api/users/feedback/${id}`, formData, configJson);
	return res;
};

/**
 * Replay to a feedback
 * @param {*} formData
 * @param {*} user_id
 * @param {*} feedback_id
 */
export const replayFeedbackUser = async (formData, user_id, feedback_id) => {
	const res = await axios.put(`/api/users/feedback-response/${user_id}/${feedback_id}`, formData, configJson);
	return res;
};

/**
 * Report a feedback
 * @param {*} formData
 * @param {*} user_id
 * @param {*} feedback_id
 */
export const reportFeedbackUser = async (formData, user_id, feedback_id) => {
	const res = await axios.put(`/api/users/feedback-report/${user_id}/${feedback_id}`, formData, configJson);
	return res;
};
