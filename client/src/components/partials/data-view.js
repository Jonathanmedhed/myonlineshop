import React, { Fragment, useState } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import CardHor from '../partials/card-hor';
import CardVer from '../partials/card-vert';

const DataViewComp = ({
	items,
	selectFeedback,
	type,
	transactionView,
	setCurrentProduct,
	removeItem,
	setTransaction,
	setProductToDelete,
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
	selectReportFeedback,
}) => {
	// Layout for items(list or grid)
	const [layout, setLayout] = useState('list');
	// Sort options
	const [sortKey, setSortKey] = useState(null);
	const [sortField, setSortField] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);

	// Sort data according to value
	let onSortChange = (event) => {
		const value = event.value;

		if (value.indexOf('!') === 0) {
			setSortOrder(-1);
			setSortField(value.substring(1, value.length));
			setSortKey(value);
		} else {
			setSortOrder(1);
			setSortField(value);
			setSortKey(value);
		}
	};

	/** List item layout */
	let renderListItem = (item) => {
		// Transaction and orders
		if (type === 'transactions' || type.includes('orders')) {
			return (
				<CardHor
					item={item}
					type={type}
					transactionView={transactionView}
					removeItem={removeItem}
					setTransaction={setTransaction}
					isOwner={isOwner}
					setApprove={setApprove}
					setPreparedDeliver={setPreparedDeliver}
					setPreparedPickup={setPreparedPickup}
					setReady={setReady}
					setDelivered={setDelivered}
					setCurrentOrderDialog={setCurrentOrderDialog}
					moveOrder={moveOrder}
					deleteOrder={deleteOrder}
					buyerView={buyerView}
					setReceived={setReceived}
				/>
			);
		} else {
			// Products, Shops and users
			return (
				<CardHor
					item={item}
					type={type}
					pic={true}
					transactionView={transactionView}
					setCurrentProduct={setCurrentProduct}
					setProductToDelete={setProductToDelete}
					setShopToDelete={setShopToDelete}
					removeItem={removeItem}
					isOwner={isOwner}
					selectFeedback={selectFeedback}
					selectReportFeedback={selectReportFeedback}
				/>
			);
		}
	};

	/** Grid item layout */
	let renderGridItem = (item) => {
		// Transaction and orders
		if (type === 'transactions' || type.includes('orders')) {
			return (
				<CardVer
					item={item}
					type={type}
					transactionView={transactionView}
					removeItem={removeItem}
					setTransaction={setTransaction}
					isOwner={isOwner}
					setApprove={setApprove}
					setPreparedDeliver={setPreparedDeliver}
					setPreparedPickup={setPreparedPickup}
					setReady={setReady}
					setDelivered={setDelivered}
					setCurrentOrderDialog={setCurrentOrderDialog}
					moveOrder={moveOrder}
					deleteOrder={deleteOrder}
					buyerView={buyerView}
					setReceived={setReceived}
				/>
			);
		} else {
			// Products, Shops and users
			return (
				<CardVer
					item={item}
					type={type}
					pic={true}
					transactionView={transactionView}
					setCurrentProduct={setCurrentProduct}
					setProductToDelete={setProductToDelete}
					setShopToDelete={setShopToDelete}
					removeItem={removeItem}
					isOwner={isOwner}
					selectFeedback={selectFeedback}
					selectReportFeedback={selectReportFeedback}
				/>
			);
		}
	};

	// Select view for data
	let itemTemplate = (item, layout) => {
		if (!item) {
			return <Fragment></Fragment>;
		}

		if (layout === 'list') return renderListItem(item);
		else if (layout === 'grid') return renderGridItem(item);
	};

	/** Data view header */
	let renderHeader = () => {
		const sortOptions =
			type === 'transactions' || type.includes('orders')
				? [
						{ label: 'Newest First', value: '!date' },
						{ label: 'Oldest First', value: 'date' },
				  ]
				: [
						{ label: 'Newest First', value: '!date' },
						{ label: 'Oldest First', value: 'date' },
						{ label: 'Name', value: 'name' },
				  ];

		return (
			<div className="p-grid">
				{/** Sorting options */}
				<div className="p-col-6" style={{ textAlign: 'left' }}>
					<Dropdown options={sortOptions} value={sortKey} placeholder="Sort By" onChange={onSortChange} />
				</div>
				<div className="hide-sm">
					{/** Layout options */}
					<div className="p-col-6" style={{ textAlign: 'right' }}>
						<DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
					</div>
				</div>
			</div>
		);
	};

	const header = renderHeader();

	return (
		<Fragment>
			{/** Desktop dataview */}
			<div className="hide-sm">
				<DataView
					alwaysShowPaginator={false}
					value={items}
					layout={layout}
					header={header}
					itemTemplate={itemTemplate}
					paginatorPosition={'both'}
					paginator={true}
					rows={20}
					sortOrder={sortOrder}
					sortField={sortField}
					emptyMessage={
						type === 'products'
							? 'No products found'
							: type === 'transactions'
							? 'No transactions found'
							: type === 'shops' && 'No shops found'
					}
				/>
			</div>
			{/** Mobile dataview */}
			<div className="show-sm">
				<DataView
					alwaysShowPaginator={false}
					value={items}
					layout={'grid'}
					header={header}
					itemTemplate={itemTemplate}
					paginatorPosition={'both'}
					paginator={true}
					rows={20}
					sortOrder={sortOrder}
					sortField={sortField}
					emptyMessage={
						type === 'products'
							? 'No products found'
							: type === 'transactions'
							? 'No transactions found'
							: type === 'shops' && 'No shops found'
					}
				/>
			</div>
		</Fragment>
	);
};
export default DataViewComp;
