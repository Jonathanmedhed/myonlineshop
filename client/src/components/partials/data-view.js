import React, { Fragment, useState } from 'react';
import { Dialog } from 'primereact/dialog';
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
	const [layout, setLayout] = useState('list');
	const [selectedCar, setSelectedCar] = useState(null);
	const [visible, setVisible] = useState(false);
	const [sortKey, setSortKey] = useState(null);
	const [sortField, setSortField] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);

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

	let renderListItem = (car) => {
		if (type === 'transactions' || type.includes('orders')) {
			return (
				<CardHor
					item={car}
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
			return (
				<CardHor
					item={car}
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

	let renderGridItem = (car) => {
		if (type === 'transactions' || type.includes('orders')) {
			return (
				<CardVer
					item={car}
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
			return (
				<CardVer
					item={car}
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

	let itemTemplate = (car, layout) => {
		if (!car) {
			return <Fragment></Fragment>;
		}

		if (layout === 'list') return renderListItem(car);
		else if (layout === 'grid') return renderGridItem(car);
	};

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
				<div className="p-col-6" style={{ textAlign: 'left' }}>
					<Dropdown options={sortOptions} value={sortKey} placeholder="Sort By" onChange={onSortChange} />
				</div>
				<div className="hide-sm">
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
