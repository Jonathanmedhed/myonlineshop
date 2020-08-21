import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Alert from '../alerts/alert';
import { Dialog } from 'primereact/dialog';
import UploadComp from '../partials/file-uploader';
import PrimeSpinner from '../partials/spinner';

// Functions
import { editShop } from '../../actions/requests';
import { setAlert } from '../../actions/alerts';

const DialogPrime = ({
	closeProduct,
	editUser,
	setAlert,
	changeLocation,
	setChangeLocation,
	changeName,
	setChangeName,
	changeEmail,
	setChangeEmail,
	changePassword,
	setChangePassword,
	changePicture,
	setChangePicture,
	changeFacebook,
	setChangeFacebook,
	changeInstagram,
	setChangeInstagram,
	changeLinkedin,
	setChangeLinkedin,
	changeTwitter,
	setChangeTwitter,
	changeYoutube,
	setChangeYoutube,
	selectSocial,
	setSelectSocial,
	setCurrentUser,
	user,
	//** Section Related */
	deleteSection,
	section,
	setSections,
	toggle,
	/** Cart Related */
	itemAdded,
	setItemAdded,
	message,
	setShowCart,
	setProduct,
	/** Shop Related */
	changePhone,
	setChangePhone,
	shop,
	setShop,
}) => {
	// To show Loading on submitions
	const [submition, setSubmition] = useState(false);
	// Submition Sucess
	const [success, setSuccess] = useState(false);
	// Updated Items
	const [updatedItems, setUpdatedItems] = useState([]);

	// Form Values
	const [formData, setFormData] = useState({
		name: user ? user.name : '',
		email: user && user.email ? user.email : shop && shop.email ? shop.email : '',
		email2: user && user.email ? user.email : shop && shop.email ? shop.email : '',
		location: user ? user.location : '',
		password: '',
		password2: '',
		facebook: user
			? user.social && user.social.facebook
				? user.social.facebook
				: ''
			: shop && shop.social && shop.social.facebook
			? shop.social.facebook
			: '',
		instagram: user
			? user.social && user.social.instagram
				? user.social.instagram
				: ''
			: shop && shop.social && shop.social.instagram
			? shop.social.instagram
			: '',
		linkedin: user
			? user.social && user.social.linkedin
				? user.social.linkedin
				: ''
			: shop && shop.social && shop.social.linkedin
			? shop.social.linkedin
			: '',
		phone: shop && shop.social && shop.social.phone ? shop.social.phone : '',
		twitter: user
			? user.social && user.social.twitter
				? user.social.twitter
				: ''
			: shop && shop.social && shop.social.twitter
			? shop.social.twitter
			: '',
		youtube: user
			? user.social && user.social.youtube
				? user.social.youtube
				: ''
			: shop && shop.social && shop.social.youtube
			? shop.social.youtube
			: '',
	});
	// Form Values Variables
	const {
		name,
		email,
		email2,
		location,
		password,
		password2,
		facebook,
		instagram,
		linkedin,
		phone,
		twitter,
		youtube,
	} = formData;
	// Asign values on change
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	//Submit data
	const onSubmit = async (e) => {
		e.preventDefault();
		// Show spinner
		setSubmition(true);
		// remove email and name from form if not being edited(prevent error)
		if (!changeEmail) {
			formData.email = null;
		} else if (!changeName) {
			formData.name = null;
		}
		if (!success) {
			// Edit email
			if (changeEmail && !checkEmail()) {
				// User email
				if (user) {
					const res = await editUser(formData);
					onHide();
				}
				// Shop email
				if (shop) {
					const res = await editShop(formData, shop._id);
					if (res.status === 200 && res.data !== 'Shop email already in use') {
						setSuccess(true);
						setShop(res.data);
						setAlert('Email Modified', 'success');
					} else if (res.data === 'Shop email already in use') {
						setAlert('Email already in use', 'error');
					} else {
						setAlert('Modification Failed', 'error');
					}
				}
			}
			// Edit location
			if (changeLocation && !checkLocation()) {
				const res = await editUser(formData);
				onHide();
			}
			// Edit name
			if (changeName && !checkName()) {
				const res = await editUser(formData);
				onHide();
			}
			// Edit Password
			if (changePassword && !checkPassword()) {
				const res = await editUser(formData);
				onHide();
			}
			// Edit social data
			if (
				(changeFacebook ||
					changeInstagram ||
					changeLinkedin ||
					changeTwitter ||
					changeYoutube ||
					changePhone) &&
				!checkSocial()
			) {
				// User social
				if (user) {
					const res = await editUser(formData);
					onHide();
				}
				// Shop social
				if (shop) {
					const res = await editShop(formData, shop._id);
					if (res.status === 200) {
						setSuccess(true);
						setShop(res.data);
						setAlert('Social Data Modified', 'success');
					} else {
						setAlert('Modification Failed', 'error');
					}
				}
			}
			// Delect section dialog
			if (deleteSection) {
				const res = await deleteSection(section.shop, section._id, setSuccess, null);
			}
			// Cart items added dialog
			if (itemAdded) {
				setShowCart(true);
				setItemAdded(false);
				closeProduct();
			}
		}
		// Hide Spinner
		setSubmition(false);
	};

	// Apply changes and hide dialog
	const applyChanges = (updatedItems) => {
		setSections(updatedItems);
		onHide();
	};

	// Check if Email is valid
	const checkEmail = () => {
		let re = /\S+@\S+\.\S+/;
		let result = false;
		if (email !== email2) {
			setAlert('Emails do not match', 'error');
			result = true;
		} else if (email === '' || email2 === '') {
			setAlert('Emails Required', 'error');
			result = true;
		} else if (user && (email === user.email || email2 === user.email)) {
			setAlert('Email must be different', 'error');
			result = true;
		} else if (shop && (email === shop.email || email2 === shop.email)) {
			setAlert('Email must be different', 'error');
			result = true;
		} else if (!re.test(email) || !re.test(email2)) {
			setAlert('Invalid Email Address', 'error');
			result = true;
		}
		return result;
	};

	// Check Name
	const checkName = () => {
		let result = false;
		if (name === '') {
			setAlert('Name Required', 'error');
			result = true;
		}
		return result;
	};

	// Check Location
	const checkLocation = () => {
		let result = false;
		if (location === '') {
			setAlert('Location Required', 'error');
			result = true;
		}
		return result;
	};

	// Check Password
	const checkPassword = () => {
		let result = false;
		if (password !== password2) {
			setAlert('Passwords do not match', 'error');
			result = true;
		} else if (password === '' || password2 === '') {
			setAlert('Passwords Required', 'error');
			result = true;
		} else if (password.length < 6 || password2 < 6) {
			setAlert("Password Can't be less than 6 characters", 'error');
			result = true;
		}
		return result;
	};

	// Check Social
	const checkSocial = () => {
		let re = /\S+@\S+\.\S+/;
		let result = false;
		if (changeFacebook && facebook && !facebook.includes('facebook.com')) {
			setAlert('Must be a Facebook Link', 'error');
			result = true;
		} else if (changeFacebook && user && user.social && user.social && facebook === user.social.facebook) {
			setAlert('Must be a different link', 'error');
			result = true;
		} else if (changeFacebook && shop && shop.social && shop.social && facebook === shop.social.facebook) {
			setAlert('Must be a different link', 'error');
			result = true;
		}
		if (changeInstagram && instagram && !instagram.includes('instagram.com')) {
			setAlert('Must be an Instagram Link', 'error');
			result = true;
		} else if (changeInstagram && user && user.social && user.social && instagram === user.social.instagram) {
			setAlert('Must be a different link', 'error');
			result = true;
		} else if (changeInstagram && shop && shop.social && shop.social && instagram === shop.social.instagram) {
			setAlert('Must be a different link', 'error');
			result = true;
		}
		if (changeLinkedin && linkedin && !linkedin.includes('linkedin.com')) {
			setAlert('Must be an Linkedin Link', 'error');
			result = true;
		} else if (changeLinkedin && user && user.social && user.social && linkedin === user.social.linkedin) {
			setAlert('Must be a different link', 'error');
			result = true;
		} else if (changeLinkedin && shop && shop.social && shop.social && linkedin === shop.social.linkedin) {
			setAlert('Must be a different link', 'error');
			result = true;
		}
		if (changePhone && phone && !phone.includes('+')) {
			setAlert('Need country code e.g: +353-555...', 'error');
			result = true;
		} else if (changePhone && user && user.social && user.social && phone === user.social.phone) {
			setAlert('Must be a different number', 'error');
			result = true;
		} else if (changePhone && shop && shop.social && shop.social && phone === shop.social.phone) {
			setAlert('Must be a different number', 'error');
			result = true;
		}
		if (changeTwitter && twitter && !twitter.includes('twitter.com')) {
			setAlert('Must be an Twitter Link', 'error');
			result = true;
		} else if (changeTwitter && user && user.social && user.social && twitter === user.social.twitter) {
			setAlert('Must be a different link', 'error');
			result = true;
		} else if (changeTwitter && shop && shop.social && shop.social && twitter === shop.social.twitter) {
			setAlert('Must be a different link', 'error');
			result = true;
		}
		if (changeYoutube && youtube && !youtube.includes('youtube.com')) {
			setAlert('Must be an Youtube Link', 'error');
			result = true;
		} else if (changeYoutube && user && user.social && user.social && youtube === user.social.youtube) {
			setAlert('Must be a different link', 'error');
			result = true;
		} else if (changeYoutube && shop && shop.social && shop.social && youtube === shop.social.youtube) {
			setAlert('Must be a different link', 'error');
			result = true;
		}
		return result;
	};

	// Set Display option
	let display = null;
	if (changeName) {
		display = changeName;
	}
	if (changeEmail) {
		display = changeEmail;
	}
	if (changeLocation) {
		display = changeLocation;
	}
	if (changePassword) {
		display = changePassword;
	}
	if (changePhone) {
		display = changePhone;
	}
	if (changePicture) {
		display = changePicture;
	}
	if (changeFacebook) {
		display = changeFacebook;
	}
	if (changeInstagram) {
		display = changeInstagram;
	}
	if (changeLinkedin) {
		display = changeLinkedin;
	}
	if (changeTwitter) {
		display = changeTwitter;
	}
	if (changeYoutube) {
		display = changeYoutube;
	}
	if (deleteSection) {
		display = toggle;
	}
	if (itemAdded) {
		display = itemAdded;
	}
	if (selectSocial) {
		display = selectSocial;
	}

	// Set onHide dialog
	let onHide = () => {
		if (changeName) {
			setChangeName(false);
		}
		if (changeEmail) {
			setChangeEmail(false);
		}
		if (changeLocation) {
			setChangeLocation(false);
		}
		if (changePassword) {
			setChangePassword(false);
		}
		if (changePhone) {
			setChangePhone(false);
		}
		if (changePicture) {
			setChangePicture(false);
		}
		if (changeFacebook) {
			setChangeFacebook(false);
		}
		if (changeInstagram) {
			setChangeInstagram(false);
		}
		if (changeLinkedin) {
			setChangeLinkedin(false);
		}
		if (changeTwitter) {
			setChangeTwitter(false);
		}
		if (changeYoutube) {
			setChangeYoutube(false);
		}
		if (deleteSection) {
			toggle(false);
		}
		if (itemAdded) {
			setItemAdded(false);
		}
		if (selectSocial) {
			setSelectSocial(false);
		}
		// Hide success buttons
		setSuccess(false);
	};

	// Set Dialog Header
	let header = '';
	if (changeName) {
		header = 'Change Name';
	}
	if (changeEmail) {
		header = 'Change Email';
	}
	if (changeLocation) {
		header = 'Change Location';
	}
	if (changePassword) {
		header = 'Change Password';
	}
	if (changePhone) {
		header = 'Change Phone Number';
	}
	if (changePicture) {
		header = 'Change Picture';
	}
	if (changeFacebook) {
		header = 'Change Facebook';
	}
	if (changeInstagram) {
		header = 'Change Instagram';
	}
	if (changeLinkedin) {
		header = 'Change LinkedIn';
	}
	if (changeTwitter) {
		header = 'Change Twitter';
	}
	if (changeYoutube) {
		header = 'Change Youtube';
	}
	if (deleteSection) {
		header = 'Delete Section';
	}
	if (itemAdded) {
		header = 'Shopping Cart';
	}
	if (selectSocial) {
		header = 'Social Media';
	}

	return (
		<Fragment>
			<Dialog
				header={header}
				visible={display}
				style={{
					width: changePicture ? '22rem' : '20rem',
					padding: '0 0 0.5rem 0',
				}}
				onHide={() => onHide()}
			>
				{/** Spinner */}
				{submition && <PrimeSpinner />}
				<form onSubmit={(e) => onSubmit(e)} className="form">
					<Alert />
					{/** Change email inputs */}
					{changeEmail && (
						<Fragment>
							<div className="form-group">
								<label className="form-text f-1 bold">New Email</label>
								<input
									className="border-dark"
									type="email"
									name="email"
									value={email}
									onChange={(e) => onChange(e)}
									required
								></input>
							</div>
							<div className="form-group">
								<label className="form-text f-1 bold">Repeat Email</label>
								<input
									className="border-dark"
									type="email"
									name="email2"
									value={email2}
									onChange={(e) => onChange(e)}
									required
								></input>
							</div>
						</Fragment>
					)}
					{/** Change location inputs */}
					{changeLocation && (
						<Fragment>
							<div className="form-group">
								<label className="form-text f-1 bold">New Location</label>
								<input
									className="border-dark"
									type="text"
									name="location"
									value={location}
									onChange={(e) => onChange(e)}
								></input>
							</div>
						</Fragment>
					)}
					{/** Change name inputs */}
					{changeName && (
						<Fragment>
							<div className="form-group">
								<label className="form-text f-1 bold">New Name</label>
								<input
									className="border-dark"
									type="text"
									name="name"
									value={name}
									onChange={(e) => onChange(e)}
									required
								></input>
							</div>
						</Fragment>
					)}
					{/** Change password inputs */}
					{changePassword === true && (
						<Fragment>
							<div className="form-group">
								<label className="form-text f-1 bold">New Password</label>
								<input
									className="border-dark"
									type="password"
									name="password"
									value={password}
									onChange={(e) => onChange(e)}
									minLength="6"
								></input>
							</div>
							<div className="form-group">
								<label className="form-text f-1 bold">Repeat Password</label>
								<input
									className="border-dark"
									type="password"
									name="password2"
									value={password2}
									onChange={(e) => onChange(e)}
									minLength="6"
								></input>
							</div>
						</Fragment>
					)}
					{/** Change picture inputs */}
					{changePicture && (
						<UploadComp
							editUser={editUser}
							setAlert={setAlert}
							setSuccess={setSuccess}
							setCurrentUser={setCurrentUser}
							setShop={setShop}
							multiple={false}
						/>
					)}
					{/** Change social inputs */}
					{(changeFacebook ||
						changeInstagram ||
						changeLinkedin ||
						changeTwitter ||
						changeYoutube ||
						changePhone) && (
						<Fragment>
							<div className="form-group">
								<div className="social-inputs">
									{changeFacebook && (
										<div className="social-input">
											{facebook && facebook.includes('facebook.com/') && (
												<a href={facebook} className="btn btn-facebook mb-1">
													Visit Link
												</a>
											)}
											<div className="p-inputgroup">
												<span className="p-inputgroup-addon bg-facebook border-facebook">
													<i className="fab fa-facebook fa-1x"></i>
												</span>
												<input
													className="border-facebook"
													type="text"
													name="facebook"
													placeholder={'https://www.facebook.com/'}
													value={facebook}
													onChange={(e) => onChange(e)}
												/>
											</div>
										</div>
									)}
									{changeInstagram && (
										<div className="social-input">
											{instagram && instagram.includes('instagram.com/') && (
												<a href={instagram} className="btn btn-instagram mb-1">
													Visit Link
												</a>
											)}
											<div className="p-inputgroup">
												<span className="p-inputgroup-addon bg-instagram border-instagram">
													<i className="fab fa-instagram fa-1x"></i>
												</span>
												<input
													className="border-instagram"
													type="text"
													name="instagram"
													placeholder="https://www.instagram.com/"
													value={instagram}
													onChange={(e) => onChange(e)}
												/>
											</div>
										</div>
									)}
									{changeLinkedin && (
										<div className="social-input">
											{linkedin && linkedin.includes('linkedin.com/') && (
												<a href={linkedin} className="btn btn-linkedin mb-1">
													Visit Link
												</a>
											)}
											<div className="p-inputgroup">
												<span className="p-inputgroup-addon bg-linkedin border-linkedin">
													<i className="fab fa-linkedin-in fa-1x"></i>
												</span>
												<input
													className="border-linkedin"
													type="text"
													name="linkedin"
													placeholder="https://www.linkedin.com/"
													value={linkedin}
													onChange={(e) => onChange(e)}
												/>
											</div>
										</div>
									)}
									{changePhone && (
										<div className="social-input">
											<div className="p-inputgroup">
												<span className="p-inputgroup-addon bg-phone border-phone">
													<i className="fab fa-whatsapp fa-1x"></i>
												</span>
												<input
													className="border-phone"
													type="text"
													name="phone"
													placeholder="+353-555..."
													value={phone}
													onChange={(e) => onChange(e)}
												/>
											</div>
										</div>
									)}
									{/**changeSocialEmail && (
										<div className="social-input">
											<div className="p-inputgroup">
												<span className="p-inputgroup-addon bg-email border-email">
													<i className="fas fa-envelope fa-1x"></i>
												</span>
												<input
													className="border-email"
													type="text"
													name="socialEmail"
													placeholder="example@Email.com"
													value={socialEmail}
													onChange={(e) => onChange(e)}
												/>
											</div>
										</div>
									)*/}
									{changeTwitter && (
										<div className="social-input">
											{twitter && twitter.includes('twitter.com/') && (
												<a href={twitter} className="btn btn-twitter mb-1">
													Visit Link
												</a>
											)}
											<div className="p-inputgroup">
												<span className="p-inputgroup-addon bg-twitter border-twitter">
													<i className="fab fa-twitter fa-1x"></i>
												</span>
												<input
													className="border-twitter"
													type="text"
													name="twitter"
													placeholder="https://twitter.com/"
													value={twitter}
													onChange={(e) => onChange(e)}
												/>
											</div>
										</div>
									)}
									{changeYoutube && (
										<div className="social-input">
											{youtube && youtube.includes('youtube.com/') && (
												<a href={youtube} className="btn btn-youtube mb-1">
													Visit Link
												</a>
											)}
											<div className="p-inputgroup">
												<span className="p-inputgroup-addon bg-youtube border-youtube">
													<i className="fab fa-youtube fa-1x"></i>
												</span>
												<input
													className="border-youtube"
													type="text"
													name="youtube"
													placeholder="https://www.youtube.com/"
													value={youtube}
													onChange={(e) => onChange(e)}
												/>
											</div>
										</div>
									)}
								</div>
							</div>
						</Fragment>
					)}
					{/**
					 * Item Addition Content
					 */}
					{itemAdded && <div className="dialog-message">{message}</div>}
					{deleteSection && !success && (
						<h1 className="text-center mt-1">
							Delete Section? {<div className="text-danger">{section.title}</div>}
						</h1>
					)}
					{/** Section deleted message */}
					{deleteSection && success && (
						<h1 className="text-center mt-1">
							{<div className="text-danger">{section.title}</div>} Section Deleted!
						</h1>
					)}
					{/** Submit buttons */}
					{!changePicture ? (
						<div className="form-group">
							<div className="buttons-form">
								{success ? (
									<Fragment>
										<button onClick={() => onHide()} className="btn btn-danger">
											Exit
										</button>
									</Fragment>
								) : (
									<Fragment>
										<input
											type="submit"
											value={deleteSection ? 'Delete' : itemAdded ? 'Go to Cart' : 'Save'}
											className={deleteSection ? 'btn btn-danger' : 'btn btn-primary'}
										/>
										<button
											onClick={() => onHide()}
											className={deleteSection ? 'btn btn-success' : 'btn btn-danger'}
										>
											{itemAdded ? 'Continue' : 'Discard'}
										</button>
									</Fragment>
								)}
							</div>
						</div>
					) : (
						// Show Exit button on success
						success && (
							<div className="form-group">
								<div className="buttons-form">
									<Fragment>
										<button onClick={() => onHide()} className="btn btn-success">
											Exit
										</button>
									</Fragment>
								</div>
							</div>
						)
					)}
				</form>
			</Dialog>
		</Fragment>
	);
};

DialogPrime.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(DialogPrime);
