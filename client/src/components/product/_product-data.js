import React, { Fragment, useState } from 'react';
import { Rating } from 'primereact/rating';

// Funcions
import { calculateRating } from '../../actions/utilities';

// Components
import { InputNumber } from 'primereact/inputnumber';
import ItemEdition from '../partials/item-edition';
import { Dialog } from 'primereact/dialog';

const ProductData = ({
	feedback,
	hideProduct,
	product,
	isOwner,
	setAlert,
	setProduct,
	purchaseQty,
	setPurchaseQty,
	cartContent,
	setCartContent,
	setItemAdded,
	isAuthenticated,
	toggleRegister,
	toggleLogin,
	setProducts,
	soldOutProduct,
	setShowReportProduct,
}) => {
	// Show set as sold out button
	const [showSoldOut, setShowSoldOut] = useState(false);

	// To show something on successful actions
	const [success, setSuccess] = useState(false);

	// Change Shop Values States
	const [edit, setEdit] = useState(false);
	const [editField, setEditField] = useState(null);

	// Edit a field
	const selectEdit = (field) => {
		setEditField(field);
		setEdit(true);
	};

	/** Add product to cart  */
	const addToCart = () => {
		hideProduct(null);
		product.quantity = purchaseQty;
		setCartContent([...cartContent, product]);
		setItemAdded(true);
	};

	// Sold out product
	const soldOutItem = async () => {
		const res = await soldOutProduct(product._id);
		if (res.status === 200) {
			setProduct(res.data.product);
			setProducts(res.data.products);
			setAlert('Product Edited', 'success');
			setSuccess(true);
		}
	};

	return (
		<Fragment>
			<Dialog header={showSoldOut && 'Sold Out'} visible={showSoldOut} onHide={() => setShowSoldOut(false)}>
				<div className="message-button-sm">
					{/** Sold out confirmation */}
					{!success && (
						<Fragment>
							<div className="message">{product.name + ' sold out?'}</div>
							<div className="options">
								<button onClick={() => soldOutItem()} className="btn btn-success">
									Yes
								</button>
								<button onClick={() => setShowSoldOut(false)} className="btn btn-danger">
									No
								</button>
							</div>
						</Fragment>
					)}
					{/** Sold out success message */}
					{success === true && (
						<Fragment>
							<div className="form-confirm-vert">
								<div className="success-message">
									<i className="fas fa-check-square fa-4x text-success"></i>
									<h1>Product Modified!</h1>
									<div className="buttons-form mt-1">
										<button className="btn btn-danger" onClick={() => setShowSoldOut(false)}>
											Exit
										</button>
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</Dialog>
			{/** Edit Product */}
			{edit === true && (
				<ItemEdition
					field={editField}
					item={product}
					itemType={'product'}
					setAlert={setAlert}
					toggle={setEdit}
					setItem={setProduct}
					setProducts={setProducts}
				/>
			)}
			{/** Product Data */}
			<div className="user-card">
				<div className="data">
					<div className="bold">Name:</div>
					<div className="data-field">
						{product.name}
						{/** Edit button if owner */}
						{isOwner && <i onClick={() => selectEdit('Name')} className="far fa-edit"></i>}
					</div>
				</div>
				<div className="data">
					<div className="bold">Price:</div>
					<div className="data-field">
						$ {product.price}
						{/** Edit button if owner */}
						{isOwner && <i onClick={() => selectEdit('Price')} className="far fa-edit"></i>}
					</div>
				</div>
				<div className="data">
					<div className="bold">Feedback:</div>
					<div className="data-field">
						<div className="product-review-section-disabled">
							<Rating value={calculateRating(feedback)} readonly={true} stars={5} cancel={false} />
						</div>
					</div>
				</div>
				<div className="data">
					<div className="bold">Quantity Left:</div>
					<div className="data-field">
						{product.quantity}
						{/** Edit button if owner */}
						{isOwner && <i onClick={() => selectEdit('Quantity')} className="far fa-edit"></i>}
					</div>
				</div>
				<Fragment>
					<div className="data-vert">
						<div className="bold">Description:</div>
						<div className="description">
							{product.description}
							{/** Edit button if owner */}
							{isOwner && <i onClick={() => selectEdit('Description')} className="far fa-edit"></i>}
						</div>
					</div>
					{/** Button to set as sold out */}
					{product.quantity > 0 && isOwner && (
						<div className="data m-auto">
							<div onClick={() => setShowSoldOut(true)} className="btn btn-danger">
								Sold Out
							</div>
						</div>
					)}
					{/** Show purchase options */}
					{!isOwner && product.active && isAuthenticated && (
						<div className="purchase-options">
							<div className="data">
								<div className="bold">Purchase:</div>
								<div className="">
									<InputNumber
										value={purchaseQty}
										onChange={(e) => setPurchaseQty(e.value)}
										showButtons
										buttonLayout="horizontal"
										spinnerMode="horizontal"
										step={1}
										min={1}
										max={product.quantity}
										incrementButtonIcon="pi pi-plus"
										decrementButtonIcon="pi pi-minus"
									/>
								</div>
							</div>
							<div className="buttons">
								<button onClick={() => addToCart()} className="btn btn-primary mr-1">
									Add to Cart
								</button>
								<button className="btn btn-danger">Report</button>
							</div>
						</div>
					)}
					{/** Login/Register option */}
					{!isAuthenticated && !isOwner && (
						<div className="purchase-options">
							<div className="review-login-sug">
								<div onClick={() => toggleLogin(true)} className="solid">
									Login
								</div>{' '}
								or{' '}
								<div onClick={() => toggleRegister(true)} className="solid">
									register
								</div>{' '}
								to purchase
							</div>
						</div>
					)}
					{!isOwner && !product.active && (
						<button onClick={() => setShowReportProduct(true)} className="btn btn-danger mt-1">
							Report
						</button>
					)}
				</Fragment>
			</div>
		</Fragment>
	);
};

export default ProductData;
