import React, { Fragment, useState } from 'react';

const Table = ({ selectItem, data, list, headers, wOptions, wSearch, transactionView }) => {
	/** Search box query */
	const [formData, setFormData] = useState({
		query: '',
	});
	const { query } = formData;

	/** Change for data */
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	/** Filtered list items */
	let filteredItems = [];

	if (list) {
		// if sections
		if (data === 'positions') {
			filteredItems = list.filter((item) => {
				return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
			});
		} else {
			filteredItems = list.filter((item) => {
				return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
			});
		}
	}

	/**
	 * Calculate tax and total
	 */
	let total = 0;
	let taxes = 0;

	if (list && data !== 'positions') {
		list.forEach((item) => {
			total = total + item.price * item.quantity;
		});
		taxes = total * 0.15;
		total = total * 1.15;
	}

	return (
		<Fragment>
			<div>
				{/** Search box */}
				{wSearch === true && (
					<div class="search">
						<input
							name="query"
							value={query}
							placeholder="Search by Name"
							type="text"
							className="searchTerm"
							onChange={(e) => onChange(e)}
						></input>
						<button type="submit" class="searchButton">
							<i class="fa fa-search"></i>
						</button>
					</div>
				)}
				<div className="tables">
					<div className="table-container">
						<table className="table">
							<thead className="bg-primary">
								<tr>
									{/** Table headers */}
									{headers && headers.map((head) => <th>{head}</th>)}
									{wOptions === true && <th>Options</th>}
								</tr>
							</thead>
							<tbody>
								{/** Body */}
								{filteredItems.map((item) => (
									<tr key={item._id}>
										{/** Sections positions */}
										{data === 'positions' && (
											<Fragment>
												<td className="bold">{item.position}</td>
												<td className="bold">{item.title}</td>
											</Fragment>
										)}
										{/** Products */}
										{data === 'products' && (
											<Fragment>
												<td>{item.name}</td>
												<td>${Math.round(item.price * 100) / 100}</td>
												<td>{item.quantity}</td>
												<td>${Math.round(item.price * item.quantity * 100) / 100}</td>
											</Fragment>
										)}
										{/** Products for mobile */}
										{data === 'products-mobile' && (
											<Fragment>
												<td>{item.name}</td>
												<td>
													${Math.round(item.price * 100) / 100}
													{' x '}
													{item.quantity}
												</td>
												<td>${Math.round(item.price * item.quantity * 100) / 100}</td>
											</Fragment>
										)}
										{/** Show options */}
										{wOptions === true && (
											<td>
												{transactionView === false ? (
													<button onClick={() => selectItem(item)} className="btn btn-danger">
														<i className="far fa-trash-alt"></i>
													</button>
												) : (
													<button className="btn btn-primary ml-1">
														<i class="fas fa-eye"></i>
													</button>
												)}
											</td>
										)}
									</tr>
								))}
								<tr>
									{/** Product tax */}
									{data === 'products' && (
										<Fragment>
											<td className="bg-white"></td>
											<td className="bg-white"></td>
											<th>Tax(15%)</th>
											<td className="border-dark">${Math.round(taxes * 100) / 100}</td>
										</Fragment>
									)}
								</tr>
								<tr>
									{/** Product tax mobile */}
									{data === 'products-mobile' && (
										<Fragment>
											<td className="bg-white"></td>
											<th>Tax(15%)</th>
											<td className="border-dark">${Math.round(taxes * 100) / 100}</td>
											<td className="bg-white"></td>
										</Fragment>
									)}
								</tr>
								<tr>
									{/** Product total */}
									{data === 'products' && (
										<Fragment>
											<td className="bg-white"></td>
											<td className="bg-white"></td>
											<th>Total</th>
											<td className="border-primary bg-white bold">
												${Math.round(total * 100) / 100}
											</td>
										</Fragment>
									)}
								</tr>
								<tr>
									{/** Product total mobile */}
									{data === 'products-mobile' && (
										<Fragment>
											<td className="bg-white"></td>
											<th>Total</th>
											<td className="border-primary bg-white bold">
												${Math.round(total * 100) / 100}
											</td>
											<td className="bg-white"></td>
										</Fragment>
									)}
								</tr>
							</tbody>
						</table>
						{/** 
						 <table className="table show-sm">
							<tbody>
								<td>
									{data === 'products' && (
										<Fragment>
											<tr>
												<th className="table-header bg-primary">{headers[0]}</th>
												{filteredItems.map((item) => (
													<td className="td-sm">{item.name}</td>
												))}
											</tr>
											<tr>
												<th className="table-header bg-primary">{headers[1]}</th>
												{filteredItems.map((item) => (
													<td className="td-sm">{item.price}</td>
												))}
											</tr>
											<tr>
												<th className="table-header bg-primary">{headers[2]}</th>
												{filteredItems.map((item) => (
													<td className="td-sm">{item.quantity}</td>
												))}
											</tr>
											<tr>
												<th className="table-header bg-primary">{headers[3]}</th>
												{filteredItems.map((item) => (
													<td className="td-sm">{item.price * item.quantity}</td>
												))}
											</tr>
										</Fragment>
									)}
									{wOptions === true && (
										<tr>
											<th className="table-header bg-primary">Options</th>
											{filteredItems.map((item) => (
												<td className="td-sm">
													{transactionView === false ? (
														<button
															onClick={() => selectItem(item)}
															className="btn btn-danger"
														>
															<i className="far fa-trash-alt"></i>
														</button>
													) : (
														<button className="btn btn-primary ml-1">
															<i class="fas fa-eye"></i>
														</button>
													)}
												</td>
											))}
										</tr>
									)}
								</td>
							</tbody>
						</table>
						 */}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Table;
