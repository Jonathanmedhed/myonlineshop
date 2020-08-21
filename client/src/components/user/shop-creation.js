import React, { useState, Fragment } from 'react';

// Components
import Alert from '../alerts/alert';
import InputChips from '../partials/input-chips';
import InputDropdownComp from '../partials/dropdown';
import LabeledInput from '../partials/labeled-input';
import StepsComp from '../partials/steps';

// Functions
import { getShops } from '../../actions/requests';

const ShopCreation = ({ createShop, createdShop, history, toggle, setAlert, setShops, setSubmition }) => {
	/** Shop Pics */
	const [logo, setLogo] = useState(null);
	const [jumbo, setJumbo] = useState(null);
	/** Operation success */
	const [success, setSuccess] = useState(false);
	const [selectedType, setSelectedType] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [formData, setFormData] = useState({
		address: '',
		email: '',
		email2: '',
		name: '',
		tags: [],
		type: '',
		facebook: '',
		instagram: '',
		linkedin: '',
		pic_jumbo: '',
		pic_logo: '',
		twitter: '',
		youtube: '',
	});

	// Form Values Variables
	const { address, email, email2, name, facebook, instagram, linkedin, twitter, youtube } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Form submition
	const onSubmit = async () => {
		setSubmition(true);
		if (logo) {
			formData.pic_logo = logo;
		}
		if (jumbo) {
			formData.pic_jumbo = jumbo;
		}
		if (selectedType) {
			formData.type = selectedType;
		}
		if (selectedTags) {
			formData.tags = selectedTags;
		}
		const res = await createShop(formData, setSuccess);
		setSubmition(false);
		return res;
	};

	// Check input, go to next step it correct, else Alert
	const checkInput = () => {
		let result = false;
		let re = /\S+@\S+\.\S+/;
		// Check Emails
		if (email && step === 0 && email !== email2) {
			setAlert('Emails do not match', 'error');
			result = true;
		} else if (step === 0 && (!re.test(email) || !re.test(email2))) {
			setAlert('Invalid Email Address', 'error');
			result = true;
		}
		// Check Name
		if (step === 0 && name === '') {
			setAlert('Name Required', 'error');
			result = true;
		}
		// Check Address
		if (step === 0 && address === '') {
			setAlert('Address Required', 'error');
			result = true;
		}
		// Check Type
		if (step === 0 && selectedType === '') {
			setAlert('Type Required', 'error');
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
		/** 
		{
			label: 'Images',
		},
		*/
		{
			label: 'Social',
		},
		{
			label: 'Confirm',
		},
	];

	/**
	  {step === 1 && (
						<Fragment>\
							<div className="form-group">
								<label className="form-text">Shop Logo</label>\
								<img className="page-example" src={require('../../img/logo-example.jpg')} alt=""></img>
								<UploadComp
									multiple={false}
									auto={true}
									uploadOnly={true}
									setImg={setLogo}
									setAlert={setAlert}
								/>
								{logo && (
									<div className="img-success">
										<div>Logo Uploaded</div>
										<i className="fas fa-check-circle text-success"></i>
									</div>
								)}
							</div>
							<div className="form-group">
								<label className="form-text">Shop Image</label>
								<img className="page-example" src={require('../../img/jumbo-example.jpg')} alt=""></img>
								<UploadComp
									multiple={false}
									auto={true}
									uploadOnly={true}
									setImg={setJumbo}
									setAlert={setAlert}
								/>
								{jumbo && (
									<div className="img-success">
										<div>Image Uploaded</div>
										<i className="fas fa-check-circle text-success"></i>
									</div>
								)}
							</div>
						</Fragment>
					)}
	 */

	return (
		<div className="item-creation">
			{/** Exit button */}
			<div onClick={() => toggle(false)} className="exit">
				<i className="fas fa-times-circle"></i>
			</div>
			<h1 className="page-title-fixed">
				{/**
				 *  Change Header Depending on Step or Item Type
				 */}
				{step === steps.length - 1 && 'Confirm Details'}
				{step < steps.length - 1 && 'Shop Creation'}
			</h1>
			<div className="inner">
				<div className="form">
					{/**
					 * Steps
					 *
					 */}
					{step === 0 && (
						<Fragment>
							{/** Shop name, email, etc */}
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
							<div className="form-group">
								<label className="form-text">Email(Optional)</label>
								<input
									className="border-primary"
									type="text"
									name="email"
									value={email}
									onChange={(e) => onChange(e)}
								></input>
							</div>
							<div className="form-group">
								<label className="form-text">Repeat Email</label>
								<input
									className="border-primary"
									type="text"
									name="email2"
									value={email2}
									onChange={(e) => onChange(e)}
								></input>
							</div>
							<div className="form-group">
								<label className="form-text">Address</label>
								<input
									className="border-primary"
									type="text"
									name="address"
									value={address}
									onChange={(e) => onChange(e)}
								></input>
							</div>
							<div className="form-group">
								<label className="form-text">Type</label>
								<div className="custom-dropdown">
									<InputDropdownComp
										setValue={setSelectedType}
										value={selectedType}
										options={'shops'}
										placeholder={'Select Type'}
										searchPlaceHolder={'Filter Type'}
									/>
								</div>
							</div>
						</Fragment>
					)}
					{step === 1 && (
						<Fragment>
							{/** Tags and social media */}
							<div className="form-group">
								<label className="form-text">Tags</label>
								<InputChips setItems={setSelectedTags} name={'tags'} value={selectedTags} />
							</div>
							<div className="form-group">
								<label className="form-text">Social Media</label>
								<div className="social-inputs">
									<div className="social-input">
										<LabeledInput
											icon={'fab fa-facebook fa-1x'}
											name={'facebook'}
											setValue={onChange}
											value={facebook}
											placeholder={'https://www.facebook.com/'}
										/>
									</div>
									<div className="social-input">
										<LabeledInput
											icon={'fab fa-instagram fa-1x'}
											name={'instagram'}
											setValue={onChange}
											value={instagram}
											placeholder={'https://www.instagram.com/'}
										/>
									</div>
									<div className="social-input">
										<LabeledInput
											icon={'fab fa-linkedin-in fa-1x'}
											name={'linkedin'}
											setValue={onChange}
											value={linkedin}
											placeholder={'https://www.linkedin.com/'}
										/>
									</div>
									<div className="social-input">
										<LabeledInput
											icon={'fab fa-twitter fa-1x'}
											name={'twitter'}
											setValue={onChange}
											value={twitter}
											placeholder={'https://twitter.com/'}
										/>
									</div>
									<div className="social-input">
										<LabeledInput
											icon={'fab fa-youtube fa-1x'}
											name={'youtube'}
											setValue={onChange}
											value={youtube}
											placeholder={'https://www.youtube.com/'}
										/>
									</div>
								</div>
							</div>
						</Fragment>
					)}
					{/** Last step, Data confirmation */}
					{!success && step === steps.length - 1 && (
						<Fragment>
							<div className="form-confirm-vert">
								<div className="horizontal">
									<div className="group">
										<div className="label">Name:</div>
										<div className="label">Email:</div>
										<div className="label">Address:</div>
										<div className="label">Type:</div>
									</div>
									<div className="group pl-1">
										<div className="value">{name}</div>
										<div className="value">{email ? email : 'no email chosen'}</div>
										<div className="value">{address ? address : 'no address added'}</div>
										<div className="value">{selectedType && selectedType}</div>
									</div>
								</div>
								{/**
								<div className="group-vertical">
									<div className="group">
										<div className="label">Shop Logo:</div>
									</div>
									<div className="group">
										{logo && (
											<img
												className="page-example-sm"
												src={require('../../../../public/uploads/' + logo)}
												alt=""
											></img>
										)}
									</div>
									<div className="group">
										<div className="label">Shop Image:</div>
									</div>
									<div className="group">
										{jumbo && (
											<img
												className="page-example-sm"
												src={require('../../../../public/uploads/' + jumbo)}
												alt=""
											></img>
										)}
									</div>
								</div>
								 */}
							</div>
						</Fragment>
					)}
					{/** Success message, view shop or exit buttons */}
					{success === true && (
						<Fragment>
							<div className="form-confirm-vert">
								<div className="success-message">
									<i className="fas fa-check-square fa-4x text-success"></i>
									<h1>Shop Created!</h1>
									<div className="buttons-form mt-1">
										<button
											className="btn btn-primary"
											onClick={() => history.replace(`/shop/${createdShop.name}`)}
										>
											View Shop
										</button>
										<button className="btn btn-danger" onClick={() => toggle(false)}>
											Exit
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
								<div className="vertical">
									<div className="vertical">
										<Alert />
									</div>
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
										) : (
											<div onClick={() => checkInput()} className="btn btn-primary ml-1">
												Next
											</div>
										)}
									</div>
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

export default ShopCreation;
