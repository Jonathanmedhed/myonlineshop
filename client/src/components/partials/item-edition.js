import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Alert from '../alerts/alert';
import InputChips from './input-chips';
import InputDropdownComp from './dropdown';
import LabeledInput from './labeled-input';
import UploadComp from './file-uploader';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';

// Functions
import { editShop, editProduct, removeLogo, soldOutProduct } from '../../actions/requests';

const ItemEdition = ({ editShop, itemType, toggle, setAlert, item, setItem, field, setProducts }) => {
	/** Shop Pics */
	const [logo, setLogo] = useState(null);
	const [jumbo, setJumbo] = useState(null);
	/** Operation success */
	const [success, setSuccess] = useState(false);
	/** Created item (Created object after submition) */
	const [createdItem, setCreatedItem] = useState(null);
	/** Product pics */
	const [productPics, setProductPics] = useState([]);
	const [selectedType, setSelectedType] = useState(item.type ? item.type : '');
	const [selectedTags, setSelectedTags] = useState(item.tags ? item.tags : []);
	/** Quantity Selected */
	const [quantitySelected, setQuantitySelected] = useState(0);

	/** Form data */
	let [formData, setFormData] = useState(
		itemType === 'product'
			? {
					description: item.description ? item.description : '',
					name: item.name ? item.name : '',
					price: item.price ? item.price : '',
					quantity: item.quantity ? item.quantity : 0,
					tags: item.tags ? item.tags : [],
					type: item.type ? item.type : '',
					pics: item.pics ? item.pics : [],
			  }
			: {
					address: item.address ? item.address : '',
					email: item.email ? item.email : '',
					email2: item.email ? item.email : '',
					name: item.name ? item.name : '',
					tags: item.tags ? item.tags : [],
					type: item.type ? item.type : '',
					facebook: item.social && item.social.facebook ? item.social.facebook : '',
					instagram: item.social && item.social.instagram ? item.social.instagram : '',
					intro: item.intro ? item.intro : '',
					linkedin: item.social && item.social.linkedin ? item.social.linkedin : '',
					pic_jumbo: '',
					pic_logo: '',
					pics: item.pics ? item.pics : [],
					twitter: item.social && item.social.twitter ? item.social.twitter : '',
					youtube: item.social && item.social.youtube ? item.social.youtube : '',
			  }
	);

	// Form Values Variables
	const {
		address,
		description,
		email,
		email2,
		name,
		price,
		quantity,
		tags,
		type,
		facebook,
		instagram,
		intro,
		linkedin,
		pic_jumbo,
		pic_logo,
		twitter,
		youtube,
	} = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Remove Logo
	const removeLogoFunc = async () => {
		const res = await removeLogo(item._id);
		if (res.status === 200) {
			setSuccess(true);
			setItem(res.data);
			setAlert('Logo Removed', 'success');
		}
		return res;
	};

	// Form submition
	const onSubmit = async (soldOut) => {
		// remove email and name from form if not being edited(avoid error)
		if (field !== 'Email') {
			formData.email = null;
			formData.email2 = null;
		}
		if (field !== 'Name') {
			formData.name = null;
		}
		if (itemType === 'shop') {
			// asing selected type to form
			if (selectedType) {
				formData.type = selectedType;
			}
			// Assing selected tags to form
			if (selectedTags) {
				formData.tags = selectedTags;
			}
			editShop(formData, item._id, setSuccess);
		}
		if (itemType === 'product') {
			// Asign qty selected to form
			if (quantitySelected) {
				formData.quantity = quantitySelected;
			}
			// Asign selected type to form
			if (selectedType) {
				formData.type = selectedType;
			}
			// Asign selected tags to form
			if (selectedTags) {
				formData.tags = selectedTags;
			}
			const res = await editProduct(formData, item._id);
			if (res.status === 200 && res.data !== 'Product name already in use') {
				setAlert('Product Edited', 'success');
				setSuccess(true);
				setItem(res.data.product);
				setProducts(res.data.products);
			} else if (res.status === 200 && res.data === 'Product name already in use') {
				setAlert('Product name already in use', 'error');
			}
			return res;
		}
	};

	// Check input, go to next step if correct, else Alert
	const checkInput = () => {
		let result = false;
		switch (field) {
			case 'Address':
				if (address && address === '') {
					setAlert('Address Required', 'error');
					result = true;
				} else if (address === item.address) {
					setAlert('Must be a different address', 'error');
					result = true;
				}
				break;
			case 'Description':
				if (description && description === '') {
					setAlert('Description Required', 'error');
					result = true;
				} else if (description === item.description) {
					setAlert('Must be a different description', 'error');
					result = true;
				} else if (!description) {
					setAlert('Description Required', 'error');
					result = true;
				}
				break;
			case 'Email':
				let re = /\S+@\S+\.\S+/;
				if (email && email !== email2) {
					setAlert('Emails do not match', 'error');
					result = true;
				} else if (email && (email === item.email || email2 === item.email)) {
					setAlert('Email must be different', 'error');
					result = true;
				} else if (!re.test(email) || !re.test(email2)) {
					setAlert('Invalid Email Address', 'error');
					result = true;
				}
				break;
			case 'Intro':
				if (intro === item.intro) {
					setAlert('No changes found', 'error');
					result = true;
				}
				break;
			case 'Name':
				if (name && name === '') {
					setAlert('Name Required', 'error');
					result = true;
				} else if (name === item.name) {
					setAlert('Name must be different', 'error');
					result = true;
				}
				break;
			case 'Price':
				console.log('Price: ' + price);
				if (price && price <= 0) {
					setAlert('Price Required', 'error');
					result = true;
				} else if (price === item.price) {
					setAlert('No change found', 'error');
					result = true;
				} else if (!price) {
					setAlert('Price Required', 'error');
					result = true;
				}
				break;
			case 'Quantity':
				if (quantitySelected && quantitySelected < 0) {
					setAlert('Quantity Required', 'error');
					result = true;
				} else if (quantitySelected === item.quantity) {
					setAlert('No change found', 'error');
					result = true;
				}
				break;
			case 'Tags':
				if (tags && tags === []) {
					setAlert('Tags Required', 'error');
					result = true;
				} else if (selectedTags === item.tags) {
					setAlert('No change found', 'error');
					result = true;
				}
				break;
			case 'Type':
				if (type && type === '') {
					setAlert('Type Required', 'error');
					result = true;
				} else if (selectedType === item.type) {
					setAlert('No change found', 'error');
					result = true;
				}
				break;
			case 'Facebook':
				if (facebook && facebook.includes('facebook')) {
					setAlert('Must be a Facebook link', 'error');
					result = true;
				} else if (facebook === item.social.facebook) {
					setAlert('No change found', 'error');
					result = true;
				}
				break;
			case 'Instagram':
				if (instagram && instagram.includes('instagram')) {
					setAlert('Must be an Instagram link', 'error');
					result = true;
				} else if (instagram === item.social.instagram) {
					setAlert('No change found', 'error');
					result = true;
				}
				break;
			case 'Linkedin':
				if (linkedin && linkedin.includes('linkedin')) {
					setAlert('Must be an Linkedin link', 'error');
					result = true;
				} else if (linkedin === item.social.linkedin) {
					setAlert('No change found', 'error');
					result = true;
				}
				break;
			case 'Pic_Jumbo':
				if ((pic_jumbo && pic_jumbo === '') || !pic_jumbo) {
					setAlert('Picture Required', 'error');
					result = true;
				}
				break;
			case 'Pic_Logo':
				if ((pic_logo && pic_logo === '') || !pic_logo) {
					setAlert('Picture Required', 'error');
					result = true;
				}
				break;
			case 'Twitter':
				if (twitter && twitter.includes('twitter')) {
					setAlert('Must be an Twitter link', 'error');
					result = true;
				} else if (twitter === item.social.twitter) {
					setAlert('No change found', 'error');
					result = true;
				}
				break;
			case 'Youtube':
				if (youtube && youtube.includes('youtube')) {
					setAlert('Must be an Youtube link', 'error');
					result = true;
				} else if (youtube === item.social.youtube) {
					setAlert('No change found', 'error');
					result = true;
				}
				break;
			default:
				break;
		}
		// Check Result
		if (result === true) {
			return result;
			// If last step, submit form
		} else {
			onSubmit();
		}
	};

	return (
		<div className="item-creation">
			{/** Exit button */}
			<div onClick={() => toggle(false)} className="exit">
				<i className="fas fa-times-circle"></i>
			</div>
			<h1 className="page-title-fixed">Change {field}</h1>
			<div className="inner-sm">
				<div className="form">
					<Alert />
					{/**
					 * Fields
					 */}
					{!success && (
						<Fragment>
							{field === 'Address' && (
								<Fragment>
									<input
										className="border-primary"
										type="text"
										name="address"
										value={address}
										onChange={(e) => onChange(e)}
									></input>
								</Fragment>
							)}
							{field === 'Description' && (
								<Fragment>
									<InputTextarea
										autoResize={true}
										name="description"
										value={description}
										onChange={(e) => onChange(e)}
										rows={5}
										cols={30}
									></InputTextarea>
								</Fragment>
							)}
							{field === 'Email' && (
								<Fragment>
									<input
										className="border-primary"
										type="email"
										name="email"
										value={email}
										onChange={(e) => onChange(e)}
									></input>
									<input
										className="border-primary"
										type="email"
										name="email2"
										value={email2}
										onChange={(e) => onChange(e)}
									></input>
								</Fragment>
							)}
							{field === 'Intro' && (
								<Fragment>
									<InputTextarea
										autoResize={true}
										name="intro"
										value={intro}
										onChange={(e) => onChange(e)}
										rows={5}
										cols={30}
									></InputTextarea>
								</Fragment>
							)}
							{field === 'Name' && (
								<Fragment>
									<input
										className="border-primary"
										type="text"
										name="name"
										value={name}
										onChange={(e) => onChange(e)}
									></input>
								</Fragment>
							)}
							{field === 'Price' && (
								<InputNumber
									name="price"
									value={price}
									onChange={(e) => onChange(e)}
									mode="currency"
									currency="USD"
									locale="en-US"
								/>
							)}
							{field === 'Quantity' && (
								<InputNumber
									value={quantitySelected}
									onChange={(e) => setQuantitySelected(e.value)}
									showButtons
									buttonLayout="horizontal"
									spinnerMode="horizontal"
									step={1}
									min={0}
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
								/>
							)}
							{field === 'Tags' && (
								<Fragment>
									<InputChips setItems={setSelectedTags} name={'tags'} value={selectedTags} />
								</Fragment>
							)}
							{field === 'Type' && itemType === 'product' && (
								<Fragment>
									<div className="custom-dropdown">
										<InputDropdownComp
											setValue={setSelectedType}
											value={selectedType}
											options={'products'}
											placeholder={'Select Type'}
											searchPlaceHolder={'Filter Type'}
										/>
									</div>
								</Fragment>
							)}
							{field === 'Type' && itemType === 'shop' && (
								<Fragment>
									<div className="custom-dropdown">
										<InputDropdownComp
											setValue={setSelectedType}
											value={selectedType}
											options={'shops'}
											placeholder={'Select Type'}
											searchPlaceHolder={'Filter Type'}
										/>
									</div>
								</Fragment>
							)}
							{field === 'Facebook' && (
								<Fragment>
									<LabeledInput
										icon={'fab fa-facebook fa-1x'}
										name={'facebook'}
										setValue={onChange}
										value={facebook}
										placeholder={'https://www.facebook.com/'}
									/>
								</Fragment>
							)}
							{field === 'Instagram' && (
								<Fragment>
									<LabeledInput
										icon={'fab fa-instagram fa-1x'}
										name={'instagram'}
										setValue={onChange}
										value={instagram}
										placeholder={'https://www.instagram.com/'}
									/>
								</Fragment>
							)}
							{field === 'Linkedin' && (
								<Fragment>
									<LabeledInput
										icon={'fab fa-linkedin-in fa-1x'}
										name={'linkedin'}
										setValue={onChange}
										value={linkedin}
										placeholder={'https://www.linkedin.com/'}
									/>
								</Fragment>
							)}
							{field === 'Pic_Jumbo' && (
								<Fragment>
									<img
										className="page-example"
										src={pic_jumbo ? pic_jumbo : require('../../img/jumbo-example.jpg')}
										alt=""
									></img>
									<UploadComp
										multiple={false}
										auto={false}
										setAlert={setAlert}
										type={'jumbo'}
										id={item._id}
										setShop={setItem}
									/>
								</Fragment>
							)}
							{field === 'Pic_Logo' && (
								<Fragment>
									<img
										className="page-example"
										src={pic_logo ? pic_logo : require('../../img/logo-example.jpg')}
										alt=""
									></img>
									<div className="buttons-upload-remove">
										<button onClick={() => removeLogoFunc()} className="btn btn-danger">
											No Logo
										</button>
										<UploadComp
											multiple={false}
											auto={false}
											setAlert={setAlert}
											type={'logo'}
											id={item._id}
											setShop={setItem}
										/>
									</div>
								</Fragment>
							)}
							{field === 'Twitter' && (
								<Fragment>
									<LabeledInput
										icon={'fab fa-twitter fa-1x'}
										name={'twitter'}
										setValue={onChange}
										value={twitter}
										placeholder={'https://twitter.com/'}
									/>
								</Fragment>
							)}
							{field === 'Youtube' && (
								<Fragment>
									<LabeledInput
										icon={'fab fa-youtube fa-1x'}
										name={'youtube'}
										setValue={onChange}
										value={youtube}
										placeholder={'https://www.youtube.com/'}
									/>
								</Fragment>
							)}
						</Fragment>
					)}
					{/** Edition success message and exit button */}
					{success === true && (
						<Fragment>
							<div className="form-confirm-vert">
								<div className="success-message">
									<i className="fas fa-check-square fa-4x text-success"></i>
									<h1>{field} Edited!</h1>
									<div className="buttons-form mt-1">
										<button className="btn btn-danger" onClick={() => toggle(false)}>
											Exit
										</button>
									</div>
								</div>
							</div>
						</Fragment>
					)}
					{/** Submit and discard buttons */}
					{!success && (field !== 'Pic_Logo' || field !== 'Pic_Jumbo') && (
						<div className="form-group-buttons">
							<div className="form-group">
								<div onClick={() => checkInput()} className="btn btn-primary">
									Change
								</div>
								<div onClick={() => toggle(false)} className="btn btn-danger ml-1">
									Discard
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ItemEdition;
