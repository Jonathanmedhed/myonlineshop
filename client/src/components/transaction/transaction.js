import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

/** Partials */
import DataViewComp from '../partials/data-view';
import Table from '../partials/table';

const TransactionView = ({ toggle, transaction, openProduct, orderView }) => {
	return (
		<Fragment>
			<div>
				{/** Change title depending on data */}
				<h1 className="page-title">{orderView ? 'Order Info' : 'Transaction Info'}</h1>
				<div className="dashboard mt-half">
					{/** Go Back Button */}
					<button className="btn btn-danger m-auto" onClick={() => toggle()}>
						Back
					</button>
					{/** List of products with pic and stuff*/}
					<div className="cart mt-half">
						<DataViewComp
							items={transaction.products}
							type="products-checkout"
							transactionView={true}
							setCurrentProduct={openProduct}
						/>
						{/** Payment succesful message */}
						<div className="cart-invoice">
							<div className="inner">
								<div>
									{/** Product and Amount to pay breakdown */}
									<h1 className="page-title mt-half">Payment Breakdown</h1>
									<Table
										data={'products'}
										list={transaction.products}
										headers={['Name', 'Price', 'Quantity', 'Total']}
										wOptions={false}
										wSearch={false}
										transactionView={true}
									/>
								</div>
								{/** Status */}
								<div className="status-cont">
									<h1 className="page-title my-1">Status</h1>
									<div className="horizontal">
										{/** Order Status */}
										{orderView && (
											<div className="vertical">
												<div className="status-hor-sm">
													<div className="bold">Approved</div>
													<div
														className={
															transaction.approved === true
																? 'text-success'
																: 'text-danger'
														}
													>
														<i className="fas fa-circle mx-1"></i>
													</div>
												</div>
												<div className="status-hor-sm">
													<div className="bold">Ready to deliver</div>
													<div
														className={
															transaction.ready_f_delivery === true
																? 'text-success'
																: 'text-danger'
														}
													>
														<i className="fas fa-circle mx-1"></i>
													</div>
												</div>
												<div className="status-hor-sm">
													<div className="bold">Ready for pickup</div>
													<div
														className={
															transaction.ready_f_pickup === true
																? 'text-success'
																: 'text-danger'
														}
													>
														<i className="fas fa-circle mx-1"></i>
													</div>
												</div>
											</div>
										)}
										{/** Order and Transaction Status */}
										<div className="vertical">
											<div className={orderView ? 'status-hor-sm' : 'status-hor'}>
												<div className="bold">Paid</div>
												<div
													className={
														transaction.paid === true ? 'text-success' : 'text-danger'
													}
												>
													<i className="fas fa-circle mx-1"></i>
												</div>
											</div>
											<div className={orderView ? 'status-hor-sm' : 'status-hor'}>
												<div className="bold">Delivered</div>
												<div
													className={
														transaction.delivered === true ? 'text-success' : 'text-danger'
													}
												>
													<i className="fas fa-circle mx-1"></i>
												</div>
											</div>
											{transaction.delivered !== true &&
												(transaction.ready_f_delivery || transaction.ready_f_pickup) && (
													<div className={orderView ? 'status-hor-sm' : 'status-hor'}>
														<div className="bold">in-Transit</div>
														<div
															className={
																'right-data ' + transaction.in_transit !== true
																	? 'text-success'
																	: 'text-danger'
															}
														>
															<i className="fas fa-circle mx-1"></i>
														</div>
													</div>
												)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

TransactionView.propTypes = {
	history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	history: state.history,
});

export default withRouter(TransactionView);
