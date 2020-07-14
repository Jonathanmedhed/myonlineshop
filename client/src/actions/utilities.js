/**
 * Rating Calculator
 * @param {*} feedback
 */
export const calculateRating = (feedback) => {
	let feedbackValue = 0;
	let feedbackCount = 0;
	feedback.forEach((feed) => {
		feedbackValue = feedbackValue + feed.stars;
		feedbackCount = feedbackCount + 1;
	});
	return feedbackValue / feedbackCount;
};

/**
 *  Returns active or inactive items
 * @param {*} items
 * @param {*} option true returns active, false returns inactives
 */
export const activeItems = (items, option) => {
	let active = 0;
	if (items.length > 0) {
		items.forEach((item) => {
			if (option === true) {
				if (item.active === true) {
					active = active + 1;
				}
			} else {
				if (item.active === false) {
					active = active + 1;
				}
			}
		});
		return active;
	} else {
		return active;
	}
};

/**
 *  Returns followers or visits
 * @param {*} items
 * @param {*} option "followers" returns followers, "visits" returns visits, "products" returs products,
 * "products_sold" returns products sold,
 */
export const getAmount = (item, option) => {
	let number = 0;
	switch (option) {
		case 'followers':
			item.followers.forEach((user) => {
				number = number + 1;
			});
			break;
		case 'visits':
			item.visits.forEach((user) => {
				number = number + 1;
			});
			break;
		case 'products':
			item.products.forEach((product) => {
				number = number + 1;
			});
			break;
		case 'products-sold':
			item.products_sold.forEach((product) => {
				number = number + 1;
			});
			break;
		case 'products-bought':
			item.products_bought.forEach((product) => {
				number = number + 1;
			});
			break;
		default:
		// code block
	}

	return number;
};

/**
 * Checkif string is valid url
 * @param {*} string
 */
export const isValidHttpUrl = (string) => {
	return string.includes('http:') || string.includes('https:');
};

/**
 * Returs a list of products from all transactions
 */
export const transProductsQty = (transactions) => {
	let products = [];
	transactions.forEach((transaction) => {
		transaction.products.forEach((trans_product) => {
			if (products.length === 0 || !products.find((product) => product.product === trans_product.product)) {
				products.push(trans_product);
			} else if (products.find((product) => product.product === trans_product.product)) {
				let foundIndex = products.findIndex((product) => product.product === trans_product.product);
				products[foundIndex].quantity = products[foundIndex].quantity + trans_product.quantity;
			}
		});
	});
	return products;
};

/**
 * Returs the quantity of a product by id, from all transactions
 */
export const transProductsQtyById = (transactions, id) => {
	let products = [];
	transactions.forEach((transaction) => {
		transaction.products.forEach((trans_product) => {
			if (trans_product.product === id) {
				trans_product.date = transaction.date;
				products.push(trans_product);
			}
		});
	});
	return products;
};

/**
 * Returs the quantity of product of a transaction
 */
export const productsQtyTransaction = (transaction) => {
	let products = 0;
	transaction.products.forEach((product) => {
		products = products + product.quantity;
	});
	return products;
};

/**
 * Returs product's quantity sold
 */
export const productsSold = (products) => {
	let quantity = 0;
	products.forEach((product) => {
		quantity = quantity + product.quantity;
	});
	return quantity;
};

/**
 * Create Order email to send
 */
export const createEmail = (shop, products, user) => {
	let emailToSend = '';
	let productsString = '';

	products.forEach((product) => {
		productsString = productsString + '\n' + product.name + ' Qty: ' + product.quantity;
	});

	emailToSend =
		'Dear ' +
		shop.name +
		'\n' +
		'\n' +
		user.name +
		' would like to order the following items: \n' +
		productsString +
		'\n\nThis is an auto generated email. \nPlease contact us if there are any issues with the order. \nRegards \n\n' +
		user.name +
		'\n' +
		user.email;

	return emailToSend;
};

/**
 * Orders to approve
 */
export const getOrders = (transactions) => {
	let toApprove = [];
	let toPrepare = [];
	let ready = [];
	let delivered = [];
	let paid = [];
	transactions.forEach((transaction) => {
		if (!transaction.approved && !transaction.paid) {
			toApprove.push(transaction);
		}
		if (transaction.approved && !transaction.ready_f_delivery && !transaction.ready_f_pickup && !transaction.paid) {
			toPrepare.push(transaction);
		}
		if (
			transaction.approved &&
			!transaction.delivered &&
			!transaction.paid &&
			(transaction.ready_f_delivery || transaction.ready_f_pickup)
		) {
			ready.push(transaction);
		}
		if (transaction.approved && transaction.delivered && !transaction.paid) {
			delivered.push(transaction);
		}
		if (transaction.paid) {
			paid.push(transaction);
		}
	});
	return { toApprove: toApprove, toPrepare: toPrepare, ready: ready, delivered: delivered, paid: paid };
};
