import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { calculateRating, getAmount, productsSold } from '../../actions/utilities';
import { Rating } from 'primereact/rating';
import PrimeSpinner from '../partials/spinner';

const CardVer = ({
	item,
	type,
	transactionView,
	setCurrentProduct,
	setProductToDelete,
	setShopToDelete,
	removeItem,
	setTransaction,
	isOwner,
	setApprove,
	setPreparedDeliver,
	setPreparedPickup,
	setReady,
	setDelivered,
	setCurrentOrderDialog,
	moveOrder,
	deleteOrder,
	buyerView,
	selectFeedback,
	selectReportFeedback,
}) => {
	/** Open item */
	const open = (id) => {
		switch (type) {
			case 'shops':
				return `/shop/${id}`;
			case 'products':
				return `/product/${id}`;
			case 'users':
				return `/user/${id}`;
			case 'transactions':
				return `/user/${id}`;
			default:
				break;
		}
	};

	/** Select and set product */
	const openProduct = (id) => {
		setCurrentProduct(item._id);
	};

	/**
	 * Options for selected order (show a dialog)
	 * @param {*} item
	 * @param {*} option
	 */
	const orderOption = (item, option) => {
		setCurrentOrderDialog(item);
		switch (option) {
			case 'orders-shop-approve':
				setApprove(true);
				break;
			case 'orders-shop-prepare-deliver':
				setPreparedDeliver(true);
				break;
			case 'orders-shop-prepare-pickup':
				setPreparedPickup(true);
				break;
			case 'orders-shop-ready':
				setReady(true);
				break;
			case 'orders-shop-delivered':
				setDelivered(true);
				break;
			default:
				break;
		}
	};

	return (
		<Fragment>
			{item && (
				<Fragment>
					{/** Add border to ard if transaction */}
					<div className={type !== 'transactions' ? 'card-review-vert' : 'card-review-vert-border'}>
						{/**
						 * Top Part (img/name/stars)
						 *
						 */}
						{/** Transaction/Order header */}
						{(type === 'transactions' || type.includes('orders')) && (
							<div className="page-title-absolute">
								<div className="bold">Id:</div>
								<div className="bold">{item._id}</div>
							</div>
						)}
						{/** Feedback */}
						{type === 'feedback' && (
							<div className="top">
								<div className="card-user-info">
									<Link to={`/user/${item.user}`}>
										<img
											src={
												item.user_pic
													? require('../../../../public/uploads/' + item.user_pic)
													: require('../../img/default-profile.png')
											}
											alt="user-img"
											className="hover-point"
										></img>
									</Link>
									<div className="review-section-card">
										<Link to={`/user/${item.user}`}>
											<h3 className="hover-point">{item.user_name}</h3>
										</Link>
										<div className="product-review-section-disabled-sm">
											<Rating
												value={
													type === 'feedback' ? item.stars : calculateRating(item.feedback)
												}
												readonly={true}
												stars={5}
												cancel={false}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
						{/** Product */}
						{type === 'products' && (
							<div className="top">
								<div className="card-product-info">
									<div className="relative" onClick={() => openProduct(item._id)}>
										<img
											src={
												item.pics && item.pics.length > 0
													? require('../../../../public/uploads/' + item.pics[0])
													: require('../../img/default-product.png')
											}
											alt=""
										></img>
										{!item.active && <div className="sold-out">Sold Out</div>}
									</div>
									<div className="review-section-card">
										<div onClick={() => openProduct(item._id)}>
											<h3>{item.name}</h3>
										</div>
										<Rating
											value={type === 'feedback' ? item.stars : calculateRating(item.feedback)}
											readonly={true}
											stars={5}
											cancel={false}
										/>
									</div>
								</div>
							</div>
						)}
						{/** Product in checkout section */}
						{type === 'products-checkout' && (
							<div className="card-product-info-sm">
								<div onClick={() => openProduct(item._id)}>
									<img
										src={
											item.pics && item.pics.length > 0
												? require('../../../../public/uploads/' + item.pics[0])
												: require('../../img/default-product.png')
										}
										alt=""
									></img>
								</div>
								<div className="review-section-card">
									<div onClick={() => openProduct(item._id)}>
										<h3>{item.name}</h3>
									</div>
								</div>
							</div>
						)}
						{/** Response for feedback */}
						{type === 'response' && (
							<div className="top">
								<div className="card-user-info">
									<div className="vertical align-items-center">
										<Link to={`/user/${item.user}`}>
											<img
												src={
													item.user_pic
														? require('../../../../public/uploads/' + item.user_pic)
														: require('../../img/default-profile.png')
												}
												alt="user-img"
												className="page-example-xs hover-point"
											></img>
										</Link>
										<div className="review-section-card">
											<Link to={`/user/${item.user}`}>
												<h3 className="hover-point">{item.user_name}</h3>
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
						{/** Shop */}
						{type === 'shops' && (
							<div className="top">
								<div className="card-shop-info">
									<Link to={open(item.name)}>
										<img
											src={
												item.pic_logo
													? require('../../../../public/uploads/' + item.pic_logo)
													: require('../../img/default-shop.png')
											}
											alt=""
										></img>
									</Link>
									<div className="review-section-card">
										<Link to={open(item.name)}>
											<h3>{item.name}</h3>
										</Link>
										<Rating
											value={type === 'feedback' ? item.stars : calculateRating(item.feedback)}
											readonly={true}
											stars={5}
											cancel={false}
										/>
									</div>
								</div>
							</div>
						)}
						{/**Bottom part (info and buttons)*/}
						<div className="vertical just-items-center">
							<div className="card-item-inner">
								{/** Feedback comment*/}
								{type === 'feedback' && (
									<div className="vertical just-items-center">
										<div className="message">
											<div className="m-auto">"{item.comment}"</div>
										</div>
									</div>
								)}
								{/** Product data */}
								{type === 'products' && (
									<Fragment>
										<div className="card-data">
											<div className="left">
												<div className="card-data-item">
													<div className="bold">Visits:</div>
													<div className="ml-1">{getAmount(item, 'visits')}</div>
												</div>
												<div className="card-data-item">
													<div className="bold">Status:</div>
													<div className="ml-1">
														{item.active === true ? 'Active' : 'Inactive'}
													</div>
												</div>
											</div>
											<div className="right">
												<div className="card-data-item">
													<div className="bold">Quantity:</div>
													<div className="ml-1">{item.quantity}</div>
												</div>
												<div className="card-data-item">
													<div className="bold">Sold:</div>
													<div className="ml-1">{productsSold(item.quantity_sold)}</div>
												</div>
											</div>
										</div>
									</Fragment>
								)}
								{/** Product in checkout section data */}
								{type === 'products-checkout' && (
									<Fragment>
										<div className="card-data">
											<div className="left">
												<div className="card-data-item">
													<div className="bold">Price</div>
													<div className="ml-1">$ {item.price}</div>
												</div>
											</div>
											<div className="right">
												<div className="card-data-item">
													<div className="bold">Quantity:</div>
													<div className="ml-1">{item.quantity}</div>
												</div>
											</div>
										</div>
									</Fragment>
								)}
								{/** Response to feedback comment */}
								{type === 'response' && (
									<div className="vertical just-items-center">
										<div className="message">
											<div className="m-auto">"{item.comment}"</div>
										</div>
									</div>
								)}
								{/** Shop data */}
								{type === 'shops' && (
									<Fragment>
										<div className="card-data">
											<div className="left">
												<div className="card-data-item">
													<div className="bold">Visits:</div>
													<div className="ml-1">{getAmount(item, 'visits')}</div>
												</div>
												<div className="card-data-item">
													<div className="bold">Followers:</div>
													<div className="ml-1">{getAmount(item, 'followers')}</div>
												</div>
											</div>
											<div className="right">
												<div className="card-data-item">
													<div className="bold">Products:</div>
													<div className="ml-1">{getAmount(item, 'products')}</div>
												</div>
												<div className="card-data-item">
													<div className="bold">Products Sold:</div>
													<div className="ml-1">{getAmount(item, 'products_sold')}</div>
												</div>
											</div>
										</div>
									</Fragment>
								)}
								{/** Transaction Data */}
								{type === 'transactions' && (
									<Fragment>
										<div className="inner-small mt-1">
											<div className="horizontal just-items-between">
												<div className="bold">Date:</div>
												<div className="right-data">
													{moment(item.date).format('DD-MM-YYYY, h:mm a')}
												</div>
											</div>
											<div className="horizontal just-items-between">
												<div className="bold">Amount:</div>
												<div className="right-data">${item.total}</div>
											</div>
											<div className="horizontal just-items-between">
												<div className="bold">Shop:</div>
												<div className="right-data">{item.shop_name}</div>
											</div>
											<div className="horizontal just-items-between">
												<div className="bold">Buyer:</div>
												<div className="right-data">{item.buyer_name}</div>
											</div>
											<div className="horizontal just-items-between">
												<div className="bold">Payed:</div>
												<div
													className={
														item.paid === true
															? 'right-data text-success'
															: 'right-data text-danger'
													}
												>
													<i className="fas fa-circle"></i>
												</div>
											</div>
											<div className="horizontal just-items-between">
												<div className="bold">Delivered:</div>
												<div
													className={
														item.delivered === true
															? 'right-data text-success'
															: 'right-data text-danger'
													}
												>
													<i className="fas fa-circle"></i>
												</div>
											</div>
											{item.delivered !== true && (
												<div className="horizontal just-items-between">
													<div className="bold">in-Transit:</div>
													<div
														className={
															item.in_transit !== true
																? 'right-data text-success'
																: 'right-data text-danger'
														}
													>
														<i className="fas fa-circle"></i>
													</div>
												</div>
											)}
										</div>
									</Fragment>
								)}
								{/** Order data */}
								{type.includes('orders') && (
									<Fragment>
										<div className="inner-small mt-1">
											<div className="horizontal just-items-between">
												<div className="bold">Date:</div>
												<div className="right-data">
													{moment(item.date).format('DD-MM-YYYY, h:mm a')}
												</div>
											</div>
											<div className="horizontal just-items-between">
												<div className="bold">Amount:</div>
												<div className="right-data">${item.total}</div>
											</div>
											<div className="horizontal just-items-between">
												<div className="bold">Buyer:</div>
												<div className="right-data">{item.buyer_name}</div>
											</div>
											{/** Status for order to approve and approved */}
											{(type === 'orders-shop-approve' || type === 'orders-shop-prepare') && (
												<div className="horizontal just-items-between">
													<div className="bold">Approved:</div>
													<div
														className={
															item.approved === true
																? 'right-data text-success'
																: 'right-data text-danger'
														}
													>
														<i className="fas fa-circle"></i>
													</div>
												</div>
											)}
											{/** Status for approved orders */}
											{type === 'orders-shop-prepare' && (
												<Fragment>
													<div className="horizontal just-items-between">
														<div className="bold">Ready to deliver:</div>
														<div
															className={
																item.ready_f_delivery === true
																	? 'right-data text-success'
																	: 'right-data text-danger'
															}
														>
															<i className="fas fa-circle"></i>
														</div>
													</div>
													<div className="horizontal just-items-between">
														<div className="bold">Ready for pickup:</div>
														<div
															className={
																item.ready_f_pickup === true
																	? 'right-data text-success'
																	: 'right-data text-danger'
															}
														>
															<i className="fas fa-circle"></i>
														</div>
													</div>
												</Fragment>
											)}
											{/** Status for orders ready and delivered */}
											{(type === 'orders-shop-ready' || type === 'orders-shop-delivered') && (
												<Fragment>
													<div className="horizontal just-items-between">
														<div className="bold">Delivered:</div>
														<div
															className={
																item.delivered === true
																	? 'right-data text-success'
																	: 'right-data text-danger'
															}
														>
															<i className="fas fa-circle"></i>
														</div>
													</div>
													{/** Show ready for delivery status */}
													{item.ready_f_delivery && type === 'orders-shop-ready' && (
														<div className="horizontal just-items-between">
															<div className="bold">Ready to deliver:</div>
															<div
																className={
																	item.ready_f_delivery === true
																		? 'right-data text-success'
																		: 'right-data text-danger'
																}
															>
																<i className="fas fa-circle"></i>
															</div>
														</div>
													)}
													{/** Show ready for pickup status */}
													{item.ready_f_pickup && type === 'orders-shop-ready' && (
														<div className="horizontal just-items-between">
															<div className="bold">Ready for pickup:</div>
															<div
																className={
																	item.ready_f_pickup === true
																		? 'right-data text-success'
																		: 'right-data text-danger'
																}
															>
																<i className="fas fa-circle"></i>
															</div>
														</div>
													)}
													{/** Order delivered status */}
													{type === 'orders-shop-delivered' && (
														<div className="horizontal just-items-between">
															<div className="bold">Paid:</div>
															<div
																className={
																	item.paid === true
																		? 'right-data text-success'
																		: 'right-data text-danger'
																}
															>
																<i className="fas fa-circle"></i>
															</div>
														</div>
													)}
												</Fragment>
											)}
										</div>
									</Fragment>
								)}
							</div>
							{/** Option section (Buttons) */}
							<div className="m-auto">
								{/** Product in checkout section
								 *  Remove from cart option
								 */}
								{type === 'products-checkout' && transactionView === false ? (
									<button onClick={() => removeItem(item)} className="btn btn-danger ml-1">
										Remove
									</button>
								) : (
									transactionView === true && (
										<button
											onClick={() => setCurrentProduct(item.product)}
											className="btn btn-primary ml-1"
										>
											<i className="fas fa-eye"></i>
										</button>
									)
								)}
								{/** Feedback */}
								{type === 'feedback' && (
									<div className="review-buttons-hor">
										<i onClick={() => selectFeedback(item)} className="fas fa-comment-dots"></i>
										<i
											onClick={() => selectReportFeedback(item)}
											className="fas fa-exclamation-circle"
										></i>
									</div>
								)}
								{/** Product */}
								{type === 'products' && (
									<Fragment>
										<button onClick={() => openProduct(item._id)} className="btn btn-primary ml-1">
											<i className="fas fa-eye text-white"></i>
										</button>
										{isOwner && (
											<button
												onClick={() => setProductToDelete(item._id)}
												className="btn btn-danger ml-1"
											>
												<i className="far fa-trash-alt"></i>
											</button>
										)}
									</Fragment>
								)}
								{/** Response to feedback */}
								{type === 'response' && (
									<div className="review-buttons-hor">
										<i className="fas fa-exclamation-circle"></i>
									</div>
								)}
								{/** Shop */}
								{type === 'shops' && (
									<Fragment>
										<button className="btn btn-primary ml-1">
											<Link to={open(item.name)}>
												<i className="fas fa-eye text-white"></i>
											</Link>
										</button>
										{isOwner && (
											<button
												onClick={() => setShopToDelete(item._id)}
												className="btn btn-danger ml-1"
											>
												<i className="far fa-trash-alt"></i>
											</button>
										)}
									</Fragment>
								)}
								{/** Transaction */}
								{type === 'transactions' && (
									<button onClick={() => setTransaction(item._id)} className="btn btn-primary">
										View
									</button>
								)}
								{/** Order */}
								{type.includes('orders') && (
									<Fragment>
										{/** Order to approve options */}
										{type === 'orders-shop-approve' && (
											<Fragment>
												<div className="horizontal">
													{/** Open */}
													<button
														onClick={() => setTransaction(item._id)}
														className="btn-icon btn-primary"
													>
														<i className="fas fa-eye text-white"></i>
													</button>
													{/** Shop option to approve */}
													{!buyerView && (
														<button
															onClick={() => orderOption(item, 'orders-shop-approve')}
															className="btn-icon btn-success ml-qter"
														>
															<i className="fas fa-check-circle"></i>
														</button>
													)}
													{/** Remove order */}
													<button
														onClick={() => deleteOrder(item, 'orders-shop-approve')}
														className="btn-icon btn-danger ml-qter"
													>
														<i className="fas fa-times-circle"></i>
													</button>
												</div>
											</Fragment>
										)}
										{/** Order to prepare */}
										{type === 'orders-shop-prepare' && (
											<Fragment>
												<div className="vertical align-items-center">
													<div className="horizontal">
														{/** Shop owner options */}
														{!buyerView && (
															<Fragment>
																{/** Set order as ready to deliver */}
																<button
																	onClick={() =>
																		orderOption(item, 'orders-shop-prepare-deliver')
																	}
																	className="btn-icon btn-success"
																>
																	<i className="fas fa-truck-loading"></i>
																</button>
																{/** Set order as ready for pickup */}
																<button
																	onClick={() =>
																		orderOption(item, 'orders-shop-prepare-pickup')
																	}
																	className="btn-icon btn-success ml-qter"
																>
																	<i className="fas fa-hand-holding-heart"></i>
																</button>
															</Fragment>
														)}
														{/** Open */}
														<button
															onClick={() => setTransaction(item._id)}
															className="btn-icon btn-primary ml-qter"
														>
															<i className="fas fa-eye text-white"></i>
														</button>
														{/** Move back to approval */}
														{!buyerView && (
															<button
																onClick={() => moveOrder(item, 'orders-shop-prepare')}
																className="btn-icon btn-caution ml-qter"
															>
																<i className="fas fa-undo-alt"></i>
															</button>
														)}
														{/** Remove order */}
														<button
															onClick={() => deleteOrder(item, 'orders-shop-prepare')}
															className="btn-icon btn-danger ml-qter"
														>
															<i className="fas fa-times-circle"></i>
														</button>
													</div>
												</div>
											</Fragment>
										)}
										{/** Order that are ready options */}
										{type === 'orders-shop-ready' && (
											<Fragment>
												<div className="vertical align-items-center">
													<div className="horizontal">
														{/** Open */}
														<button
															onClick={() => setTransaction(item._id)}
															className="btn-icon btn-primary"
														>
															<i className="fas fa-eye text-white"></i>
														</button>
														{/** Shop owner options */}
														{!buyerView && (
															<Fragment>
																{/** Move order back */}
																<button
																	onClick={() => moveOrder(item, 'orders-shop-ready')}
																	className="btn-icon btn-caution ml-qter"
																>
																	<i className="fas fa-undo-alt"></i>
																</button>
																{/** Set as elivered */}
																<button
																	onClick={() =>
																		orderOption(item, 'orders-shop-ready')
																	}
																	className="btn-icon btn-success ml-qter"
																>
																	<i className="fas fa-check-circle"></i>
																</button>
															</Fragment>
														)}
														{/** Remove */}
														<button
															onClick={() => deleteOrder(item, 'orders-shop-ready')}
															className="btn-icon btn-danger ml-qter"
														>
															<i className="fas fa-times-circle"></i>
														</button>
													</div>
												</div>
											</Fragment>
										)}
										{/** Order delivered options */}
										{type === 'orders-shop-delivered' && (
											<div className="vertical align-items-center">
												<div className="horizontal">
													{/** Open */}
													<button
														onClick={() => setTransaction(item._id)}
														className="btn-icon btn-primary"
													>
														<i className="fas fa-eye text-white"></i>
													</button>
													{/** Move order back */}
													{!buyerView && (
														<button
															onClick={() => moveOrder(item, 'orders-shop-delivered')}
															className="btn-icon btn-caution ml-qter"
														>
															<i className="fas fa-undo-alt"></i>
														</button>
													)}
													{/** Set order as received or payed */}
													<button
														onClick={() => orderOption(item, 'orders-shop-delivered')}
														className="btn-icon btn-success ml-qter"
													>
														<i
															className={
																!buyerView
																	? 'fas fa-hand-holding-usd'
																	: 'fas fa-hand-holding-heart'
															}
														></i>
													</button>
													{/** Remove order */}
													<button
														onClick={() => deleteOrder(item, 'orders-shop-delivered')}
														className="btn-icon btn-danger ml-qter"
													>
														<i className="fas fa-times-circle"></i>
													</button>
												</div>
											</div>
										)}
									</Fragment>
								)}
							</div>
						</div>
					</div>
					<div className="line"></div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default CardVer;
