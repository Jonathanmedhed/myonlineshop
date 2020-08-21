import React, { useState, Fragment } from 'react';

// Components
import Alert from '../alerts/alert';
import InputChips from '../partials/input-chips';
import InputDropdownComp from '../partials/dropdown';
import StepsComp from '../partials/steps';
import UploadComp from '../partials/file-uploader';
import { InputNumber } from 'primereact/inputnumber';
import PrimeSpinner from '../partials/spinner';

const ProductCreation = ({
	history,
	createdProduct,
	createProduct,
	toggle,
	setAlert,
	shop_id,
	setProducts,
	setCurrentProduct,
	setSections,
}) => {
	/** Loading Submition */
	const [submition, setSubmition] = useState(false);
	/** Operation success */
	const [success, setSuccess] = useState(false);
	/** Created item (Created object after submition) */
	/** Product pics */
	const [productPics, setProductPics] = useState([]);
	/** Selected product type (Asign to form on submit) */
	const [selectedType, setSelectedType] = useState('');
	/** Selected product tags (Asign to form on submit) */
	const [selectedTags, setSelectedTags] = useState([]);
	/** Form data */
	const [formData, setFormData] = useState({
		email: '',
		email2: '',
		name: '',
		price: 0,
		quantity: 0,
		tags: selectedTags ? selectedTags : [],
		type: selectedType ? selectedType : '',
		pics: [],
	});

	// Form Values Variables
	const { name, price, quantity } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Form submition
	const onSubmit = async () => {
		setSubmition(true);
		// Asign selected type to form
		if (selectedType) {
			formData.type = selectedType;
		}
		// Asign selected tags to form
		if (selectedTags) {
			formData.tags = selectedTags;
		}
		// Asign selected pics to form
		if (productPics) {
			formData.pics = productPics;
		}
		createProduct(formData, shop_id, setSuccess);
		setSubmition(false);
	};

	// Check input, go to next step it correct, else Alert
	const checkInput = () => {
		let result = false;
		// Check Emails
		// Check Name
		if (step === 0 && name === '') {
			setAlert('Name Required', 'error');
			result = true;
		}
		// Check Type
		if (step === 0 && selectedType === '') {
			setAlert('Type Required', 'error');
			result = true;
		}
		// Check Price
		if (step === 0 && price === 0) {
			setAlert('Price Required', 'error');
			result = true;
		}
		// Check Quantity
		if (step === 0 && quantity === 0) {
			setAlert('Quantity Required', 'error');
			result = true;
		}
		// Check Result
		if (result === true) {
			return result;
			// If last step, submit form
		} else if (step === steps.length - 1) {
			onSubmit();
			// If not last step continue to next step
		} else {
			setStep(step + 1);
		}
	};

	// Steps
	const [step, setStep] = useState(0);
	const steps = [
		{
			label: 'Info',
		},
		{
			label: 'Confirm',
		},
	];

	// Open created product and close current dialog
	const openProduct = () => {
		setCurrentProduct(createdProduct._id);
		toggle(false);
	};

	return (
		<div className="item-creation">
			{submition && <PrimeSpinner />}
			<div onClick={() => toggle(false)} className="exit">
				<i className="fas fa-times-circle"></i>
			</div>
			<h1 className="page-title-fixed">
				{/**
				 *  Change Header Depending on Step or Item Type
				 */}
				{step === steps.length - 1 && 'Confirm Details'}
				{step < steps.length - 1 && 'Product Creation'}
			</h1>
			<div className="inner">
				<div className="form">
					<Alert />
					{/**
					 * Product Creation Steps
					 *
					 */}
					{step === 0 && (
						<Fragment>
							<div className="form-group">
								<label className="form-text">Name</label>
								<input
									className="border-primary"
									type="text"
									name="name"
									value={name}
									onChange={(e) => onChange(e)}
								></input>
							</div>
							<div className="from-group">
								<label className="form-text">Price</label>
								<InputNumber
									name="price"
									value={price}
									onChange={(e) => onChange(e)}
									mode="currency"
									currency="USD"
									locale="en-US"
								/>
							</div>
							<div className="from-group mt-1">
								<label className="form-text">Quantity</label>
								<input
									className="input"
									min="1"
									step="1"
									type="number"
									name="quantity"
									value={quantity}
									onChange={(e) => onChange(e)}
								></input>
							</div>
							<div className="form-group">
								<label className="form-text">Type</label>
								<div className="custom-dropdown">
									<InputDropdownComp
										value={selectedType}
										setValue={setSelectedType}
										options={'products'}
										placeholder={'Select Type'}
										searchPlaceHolder={'Filter Type'}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="form-text">Tags</label>
								<InputChips setItems={setSelectedTags} name={'tags'} value={selectedTags} />
							</div>
						</Fragment>
					)}
					{/**step === 1 && (
						<Fragment>
							<div className="form-group">
								<label className="form-text">Product Images</label>
								<UploadComp
									multiple={true}
									auto={false}
									uploadOnly={true}
									setImg={setProductPics}
									imgs={productPics}
									setAlert={setAlert}
								/>
							</div>
						</Fragment>
					)*/}
					{/**
					 *  Product data confirmation
					 */}
					{!success && step === steps.length - 1 && (
						<Fragment>
							<div className="form-confirm-vert">
								<div className="horizontal">
									<div className="group">
										<div className="label">Name:</div>
										<div className="label">Price:</div>
										<div className="label">Quantity:</div>
										<div className="label">Type:</div>
										<div className="label">Tags:</div>
									</div>
									<div className="group pl-1">
										<div className="value">{name}</div>
										<div className="value">{price}</div>
										<div className="value">{quantity}</div>
										<div className="value">{selectedType}</div>
										<div className="value-wrap">
											{selectedTags.map((item) => (
												<div className="item">{item},</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					)}
					{/** Success message */}
					{success === true && (
						<Fragment>
							<div className="form-confirm-vert">
								<div className="success-message">
									<i className="fas fa-check-square fa-4x text-success"></i>
									<h1>Product Created!</h1>
									<div className="buttons-form mt-1">
										{/** Add pictures created product */}
										<button onClick={() => openProduct()} className="btn btn-success">
											Add Pictures
										</button>
										{/** Close dialog */}
										<button className="btn btn-danger" onClick={() => toggle(false)}>
											Continue Later
										</button>
									</div>
								</div>
							</div>
						</Fragment>
					)}
					{/** Steps, hide on success */}
					{!success && (
						<Fragment>
							<div className="form-group-buttons">
								<div className="form-group">
									{/** Dont show button if 1st step */}
									{step !== 0 && (
										<button onClick={() => setStep(step - 1)} className="btn btn-dark">
											Prev
										</button>
									)}
									{step === steps.length - 1 ? (
										<div onClick={() => checkInput()} className="btn btn-primary ml-1">
											Proceed
										</div>
									) : step === 0 ? (
										<div onClick={() => checkInput()} className="btn btn-primary ml-1">
											Create
										</div>
									) : (
										<div onClick={() => checkInput()} className="btn btn-primary ml-1">
											Next
										</div>
									)}
								</div>
							</div>
							<div className="steps-whitebg mt-1">
								<StepsComp steps={steps} setStep={setStep} step={step} />
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCreation;
