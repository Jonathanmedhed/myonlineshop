import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// Functions
import { calculateRating, getAmount, productsSold } from '../../actions/utilities';
// Components
import { Rating } from 'primereact/rating';

const CardHor = ({
	item,
	type,
	transactionView,
	setCurrentProduct,
	setProductToDelete,
	removeItem,
	setTransaction,
	setShopToDelete,
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
	setReceived,
	selectFeedback,
	selectReportFeedback,
}) => {
	// Open item
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
	/** Open by setting product */
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
			case 'orders-shop-delivered-purchase':
				setReceived(true);
				break;
			default:
				break;
		}
	};

	return (
		<Fragment>
			{item && (
				<Fragment>
					<div className="card-item">
						<div className="card-review">
							{/**
							 * Left Side (img/name/stars)
							 *
							 */}
							{/** Response to feedback */}
							{type === 'response' && (
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
									</div>
								</div>
							)}
							{/** Feedback */}
							{type === 'feedback' && (
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
							)}
							{/** Product */}
							{type === 'products' && (
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
							)}
							{/** Product Checkout section */}
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
							{/** Shop */}
							{type === 'shops' && (
								<div className="card-shop-info">
									<Link to={open(item.name)}>
										<img
											src={item.pic_logo ? item.pic_logo : require('../../img/default-shop.png')}
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
							)}
							{/**
							 * Right Side (info and buttons)
							 */}
							<div className="vertical just-items-center">
								<div className="card-item-inner">
									{/**
									 * Left Side of Right Side :D
									 */}
									{/** Feedback */}
									{type === 'feedback' && (
										<div className="vertical just-items-center">
											<div className="message">"{item.comment}"</div>
										</div>
									)}
									{/** Product (Info) */}
									{type === 'products' && (
										<Fragment>
											<div className="horizontal">
												<div className="vertical">
													<div className="horizontal just-items-between">
														<div className="bold">Price:</div>
														<div className="ml-1">$ {item.price}</div>
													</div>
													<div className="horizontal just-items-between">
														<div className="bold">Visits:</div>
														<div className="ml-1">{getAmount(item, 'visits')}</div>
													</div>
												</div>
												<div className="vertical ml-1">
													<div className="horizontal just-items-between">
														<div className="bold">Quantity:</div>
														<div className="ml-1">{item.quantity}</div>
													</div>
													<div className="horizontal just-items-between">
														<div className="bold">Sold:</div>
														<div className="ml-1">{productsSold(item.quantity_sold)}</div>
													</div>
												</div>
											</div>
										</Fragment>
									)}
									{/** Product checkout section (Info) */}
									{type === 'products-checkout' && (
										<Fragment>
											<div className="vertical">
												<div className="horizontal just-items-between">
													<div className="bold">Price</div>
													<div className="ml-1">$ {item.price}</div>
												</div>
												<div className="horizontal just-items-between">
													<div className="bold">Quantity</div>
													<div className="ml-1">{item.quantity}</div>
												</div>
											</div>
										</Fragment>
									)}
									{/** Response for feedback (Comment) */}
									{type === 'response' && (
										<div className="vertical just-items-center">
											<div className="message">"{item.comment}"</div>
										</div>
									)}
									{/** Shop (info) */}
									{type === 'shops' && (
										<Fragment>
											<div className="vertical">
												<div className="horizontal just-items-between">
													<div className="bold">Visits:</div>
													<div className="ml-1">{getAmount(item, 'visits')}</div>
												</div>
												<div className="horizontal just-items-between">
													<div className="bold">Followers:</div>
													<div className="ml-1">{getAmount(item, 'followers')}</div>
												</div>
											</div>
											<div className="vertical ml-1">
												<div className="horizontal just-items-between">
													<div className="bold">Products:</div>
													<div className="ml-1">{getAmount(item, 'products')}</div>
												</div>
												<div className="horizontal just-items-between">
													<div className="bold">Products Sold:</div>
													<div className="ml-1">{getAmount(item, 'products_sold')}</div>
												</div>
											</div>
										</Fragment>
									)}
									{/** Transaction */}
									{type === 'transactions' && (
										<Fragment>
											<div className="status-table">
												{/** Status */}
												<div className="status-cont">
													<div className="status">
														<div className="bold">Payed</div>
														<div
															className={
																item.paid === true ? 'text-success' : 'text-danger'
															}
														>
															<i className="fas fa-circle mx-1"></i>
														</div>
													</div>
													<div className="status">
														<div className="bold">Delivered</div>
														<div
															className={
																item.delivered === true ? 'text-success' : 'text-danger'
															}
														>
															<i className="fas fa-circle mx-1"></i>
														</div>
													</div>
													{item.delivered !== true && (
														<div className="status">
															<div className="bold">in-Transit</div>
															<div
																className={
																	'right-data ' + item.in_transit !== true
																		? 'text-success'
																		: 'text-danger'
																}
															>
																<i className="fas fa-circle mx-1"></i>
															</div>
														</div>
													)}
												</div>
												{/** Transaction Data */}
												<div className="tables">
													<div className="table-container">
														<table className="table hide-sm">
															<thead className="bg-primary">
																<tr className="custom-row">
																	<th>Date</th>
																	<th>Amount</th>
																	<th>Shop</th>
																	<th>Buyer</th>
																</tr>
															</thead>
															<tbody>
																<tr className="custom-row">
																	<td>
																		{moment(item.date).format('DD-MM-YYYY, h:mm a')}
																	</td>
																	<td>${item.total}</td>
																	<td>{item.shop_name}</td>
																	<td>{item.buyer_name}</td>
																	<td>
																		<button
																			onClick={() => setTransaction(item._id)}
																			className="btn btn-primary"
																		>
																			<i className="fas fa-eye text-white"></i>
																		</button>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</Fragment>
									)}
									{/** Order */}
									{type.includes('orders') && (
										<Fragment>
											<div className="status-table">
												<div className="status-cont">
													{/** Order status */}
													{type === 'orders-shop-approve' && (
														<div className="status">
															<div className="bold">Approved</div>
															<div
																className={
																	item.approved === true
																		? 'text-success'
																		: 'text-danger'
																}
															>
																<i className="fas fa-circle mx-1"></i>
															</div>
														</div>
													)}
													{type === 'orders-shop-prepare' && (
														<Fragment>
															<div className="status">
																<div className="bold">Approved</div>
																<div
																	className={
																		item.approved === true
																			? 'text-success'
																			: 'text-danger'
																	}
																>
																	<i className="fas fa-circle mx-1"></i>
																</div>
															</div>
															<div className="status">
																<div className="bold">Ready to deliver</div>
																<div
																	className={
																		item.ready_f_delivery === true
																			? 'text-success'
																			: 'text-danger'
																	}
																>
																	<i className="fas fa-circle mx-1"></i>
																</div>
															</div>
															<div className="status">
																<div className="bold">Ready for pickup</div>
																<div
																	className={
																		item.ready_f_pickup === true
																			? 'text-success'
																			: 'text-danger'
																	}
																>
																	<i className="fas fa-circle mx-1"></i>
																</div>
															</div>
														</Fragment>
													)}
													{type === 'orders-shop-ready' && (
														<Fragment>
															<div className="status">
																<div className="bold">Delivered</div>
																<div
																	className={
																		item.delivered === true
																			? 'text-success'
																			: 'text-danger'
																	}
																>
																	<i className="fas fa-circle mx-1"></i>
																</div>
															</div>
															{item.ready_f_delivery && (
																<div className="status">
																	<div className="bold">Ready to Deliver</div>
																	<div
																		className={
																			item.ready_f_delivery === true
																				? 'text-success'
																				: 'text-danger'
																		}
																	>
																		<i className="fas fa-circle mx-1"></i>
																	</div>
																</div>
															)}
															{item.ready_f_pickup && (
																<div className="status">
																	<div className="bold">Ready for Pickup</div>
																	<div
																		className={
																			item.ready_f_pickup === true
																				? 'text-success'
																				: 'text-danger'
																		}
																	>
																		<i className="fas fa-circle mx-1"></i>
																	</div>
																</div>
															)}
														</Fragment>
													)}
													{type === 'orders-shop-delivered' && (
														<Fragment>
															<div className="status">
																<div className="bold">Paid</div>
																<div
																	className={
																		item.paid === true
																			? 'text-success'
																			: 'text-danger'
																	}
																>
																	<i className="fas fa-circle mx-1"></i>
																</div>
															</div>
															<div className="status">
																<div className="bold">Delivered</div>
																<div
																	className={
																		item.delivered === true
																			? 'text-success'
																			: 'text-danger'
																	}
																>
																	<i className="fas fa-circle mx-1"></i>
																</div>
															</div>
														</Fragment>
													)}
												</div>
												{/** Order data */}
												<div className="tables">
													<div className="table-container">
														<table className="table hide-sm">
															<thead className="bg-primary">
																<tr className="custom-row">
																	<th>Date</th>
																	<th>Amount</th>
																	<th>Buyer</th>
																	<th>Options</th>
																</tr>
															</thead>
															<tbody>
																{/** Order Data */}
																<tr className="custom-row">
																	<td>
																		{moment(item.date).format('DD-MM-YYYY, h:mm a')}
																	</td>
																	<td>${item.total}</td>
																	<td>{item.buyer_name}</td>
																	<td>
																		{/** Order to approve options */}
																		{type === 'orders-shop-approve' && (
																			<Fragment>
																				<div className="vertical align-items-center">
																					<div className="horizontal">
																						{/** Open */}
																						<button
																							onClick={() =>
																								setTransaction(item._id)
																							}
																							className="btn-icon btn-primary"
																						>
																							<i className="fas fa-eye text-white"></i>
																						</button>
																						{/** Approve button for seller */}
																						{!buyerView && (
																							<button
																								onClick={() =>
																									orderOption(
																										item,
																										'orders-shop-approve'
																									)
																								}
																								className="btn-icon btn-success ml-qter"
																							>
																								<i className="fas fa-check-circle"></i>
																							</button>
																						)}
																						{/** Remove */}
																						<button
																							onClick={() =>
																								deleteOrder(
																									item,
																									'orders-shop-approve'
																								)
																							}
																							className="btn-icon btn-danger ml-qter"
																						>
																							<i className="fas fa-times-circle"></i>
																						</button>
																					</div>
																				</div>
																			</Fragment>
																		)}
																		{/** Order to prepare */}
																		{type === 'orders-shop-prepare' && (
																			<Fragment>
																				<div className="vertical align-items-center">
																					{!buyerView && (
																						<div className="horizontal">
																							{/** Set order as ready to deliver */}
																							<button
																								onClick={() =>
																									orderOption(
																										item,
																										'orders-shop-prepare-deliver'
																									)
																								}
																								className="btn-icon btn-success"
																							>
																								<i className="fas fa-truck-loading"></i>
																							</button>
																							{/** Set order as ready for pickup */}
																							<button
																								onClick={() =>
																									orderOption(
																										item,
																										'orders-shop-prepare-pickup'
																									)
																								}
																								className="btn-icon btn-success ml-qter"
																							>
																								<i className="fas fa-hand-holding-heart"></i>
																							</button>
																						</div>
																					)}
																					<div
																						className={
																							!buyerView
																								? 'horizontal mt-qter'
																								: 'horizontal'
																						}
																					>
																						{/** Open order */}
																						<button
																							onClick={() =>
																								setTransaction(item._id)
																							}
																							className="btn-icon btn-primary"
																						>
																							<i className="fas fa-eye text-white"></i>
																						</button>
																						{/** Move back to approval */}
																						{!buyerView && (
																							<button
																								onClick={() =>
																									moveOrder(
																										item,
																										'orders-shop-prepare'
																									)
																								}
																								className="btn-icon btn-caution ml-qter"
																							>
																								<i className="fas fa-undo-alt"></i>
																							</button>
																						)}
																						{/** Remove order */}
																						<button
																							onClick={() =>
																								deleteOrder(
																									item,
																									'orders-shop-prepare'
																								)
																							}
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
																					{!buyerView && (
																						<Fragment>
																							<div className="horizontal">
																								{/** Open */}
																								<button
																									onClick={() =>
																										setTransaction(
																											item._id
																										)
																									}
																									className="btn-icon btn-primary"
																								>
																									<i className="fas fa-eye text-white"></i>
																								</button>
																								{/** move back to prepare */}
																								<button
																									onClick={() =>
																										moveOrder(
																											item,
																											'orders-shop-ready'
																										)
																									}
																									className="btn-icon btn-caution ml-qter"
																								>
																									<i className="fas fa-undo-alt"></i>
																								</button>
																							</div>
																							<div className="horizontal mt-qter">
																								{/** Set as delivered */}
																								<button
																									onClick={() =>
																										orderOption(
																											item,
																											'orders-shop-ready'
																										)
																									}
																									className="btn-icon btn-success"
																								>
																									<i className="fas fa-check-circle"></i>
																								</button>
																								{/** Remove order */}
																								<button
																									onClick={() =>
																										deleteOrder(
																											item,
																											'orders-shop-ready'
																										)
																									}
																									className="btn-icon btn-danger ml-qter"
																								>
																									<i className="fas fa-times-circle"></i>
																								</button>
																							</div>
																						</Fragment>
																					)}
																					{/** options for buyer */}
																					{buyerView && (
																						<Fragment>
																							<div className="horizontal">
																								{/** Open */}
																								<button
																									onClick={() =>
																										setTransaction(
																											item._id
																										)
																									}
																									className="btn-icon btn-primary"
																								>
																									<i className="fas fa-eye text-white"></i>
																								</button>
																								{/** Remove order */}
																								<button
																									onClick={() =>
																										deleteOrder(
																											item,
																											'orders-shop-ready'
																										)
																									}
																									className="btn-icon btn-danger ml-qter"
																								>
																									<i className="fas fa-times-circle"></i>
																								</button>
																							</div>
																						</Fragment>
																					)}
																				</div>
																			</Fragment>
																		)}
																		{/** Order delivered options */}
																		{type === 'orders-shop-delivered' && (
																			<Fragment>
																				<div className="vertical align-items-center">
																					{/** Shop owner options */}
																					{!buyerView && (
																						<Fragment>
																							<div className="horizontal">
																								{/** Open */}
																								<button
																									onClick={() =>
																										setTransaction(
																											item._id
																										)
																									}
																									className="btn-icon btn-primary"
																								>
																									<i className="fas fa-eye text-white"></i>
																								</button>
																								{/** Move bar to orders ready */}
																								<button
																									onClick={() =>
																										moveOrder(
																											item,
																											'orders-shop-delivered'
																										)
																									}
																									className="btn-icon btn-caution ml-qter"
																								>
																									<i className="fas fa-undo-alt"></i>
																								</button>
																							</div>
																							<div className="horizontal mt-qter">
																								{/** Set as payed */}
																								<button
																									onClick={() =>
																										orderOption(
																											item,
																											'orders-shop-delivered'
																										)
																									}
																									className="btn-icon btn-success"
																								>
																									<i className="fas fa-hand-holding-usd"></i>
																								</button>
																								{/** Remove order */}
																								<button
																									onClick={() =>
																										deleteOrder(
																											item,
																											'orders-shop-delivered'
																										)
																									}
																									className="btn-icon btn-danger ml-qter"
																								>
																									<i className="fas fa-times-circle"></i>
																								</button>
																							</div>
																						</Fragment>
																					)}
																					{/** Buyer options */}
																					{buyerView && (
																						<Fragment>
																							<div className="horizontal">
																								{/** Open */}
																								<button
																									onClick={() =>
																										setTransaction(
																											item._id
																										)
																									}
																									className="btn-icon btn-primary"
																								>
																									<i className="fas fa-eye text-white"></i>
																								</button>
																								{/** Set order as received */}
																								<button
																									onClick={() =>
																										orderOption(
																											item,
																											'orders-shop-delivered-purchase'
																										)
																									}
																									className="btn-icon btn-success ml-qter"
																								>
																									<i className="fas fa-hand-holding-heart"></i>
																								</button>
																								{/** Remove order */}
																								<button
																									onClick={() =>
																										deleteOrder(
																											item,
																											'orders-shop-delivered'
																										)
																									}
																									className="btn-icon btn-danger ml-qter"
																								>
																									<i className="fas fa-times-circle"></i>
																								</button>
																							</div>
																						</Fragment>
																					)}
																				</div>
																			</Fragment>
																		)}
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</Fragment>
									)}
									{/** Options Section (Buttons) */}
									<div className="m-auto">
										{/** Product in checkout section */}
										{type === 'products-checkout' && transactionView === false ? (
											<Fragment>
												{/** Remove option for cart*/}
												<button
													onClick={() => removeItem(item)}
													className="btn btn-danger ml-1"
												>
													Remove
												</button>
											</Fragment>
										) : (
											transactionView === true && (
												<Fragment>
													{/** Open product option*/}
													<button
														onClick={() => setCurrentProduct(item.product)}
														className="btn btn-primary ml-1"
													>
														<i className="fas fa-eye"></i>
													</button>
												</Fragment>
											)
										)}
										{/** Feedback */}
										{type === 'feedback' && (
											<div className="review-buttons">
												<i onClick={() => selectFeedback(item)} class="fas fa-comment-dots"></i>
												<i
													onClick={() => selectReportFeedback(item)}
													class="fas fa-exclamation-circle"
												></i>
											</div>
										)}
										{/** Product */}
										{type === 'products' && (
											<Fragment>
												<button
													onClick={() => openProduct(item._id)}
													className="btn btn-primary ml-1"
												>
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
										{/** feedback response */}
										{type === 'response' && (
											<div className="review-buttons">
												<i class="fas fa-exclamation-circle"></i>
											</div>
										)}
										{/** shop */}
										{type === 'shops' && (
											<Fragment>
												<button className="btn btn-primary ml-1">
													<Link to={open(item.name)}>
														<i className="fas fa-eye text-white"></i>
													</Link>
												</button>
												{/** Delete option */}
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
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="line"></div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default CardHor;
