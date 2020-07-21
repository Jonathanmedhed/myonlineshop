import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Functions
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';
// Components
import Alert from '../alerts/alert';
import StepsComp from '../partials/steps';
import Login from './_login';

const Register = ({
	setAction,
	setAlert,
	register,
	isAuthenticated,
	subAction,
	setSubAction,
	quickRegister,
	toggle,
	setAuthUser,
	toggleLogin,
}) => {
	// Form Values
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		email2: '',
		password: '',
		password2: '',
	});
	// Form Values Variables
	const { name, email, email2, password, password2 } = formData;
	// Asign values on change
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		checkInput();
	};

	// Check input and register if no errors
	const checkInput = async () => {
		let result = false;
		let re = /\S+@\S+\.\S+/;
		let reNum = /[0-9]/;
		let reLower = /[a-z]/;
		let reUpper = /[A-Z]/;
		// Check Emails
		if (step === 0 && email !== email2) {
			setAlert('Emails do not match', 'error');
			result = true;
		} else if (step === 0 && (!re.test(email) || !re.test(email2))) {
			setAlert('Invalid Email Address', 'error');
			result = true;
		} else if (step === 0 && (email === '' || email2 === '')) {
			setAlert('Emails Required', 'error');
			result = true;
		}
		// Check Passwords
		if (step === 1 && password !== password2) {
			setAlert('Passwords do not match', 'error');
			result = true;
		} else if (step === 1 && (password === '' || password2 === '')) {
			setAlert('Passwords Required', 'error');
			result = true;
		} else if (step === 1 && (password.length < 6 || password2.length < 6)) {
			setAlert("Password Can't be less than 6 characters", 'error');
			result = true;
		} else if (step === 1 && (!reNum.test(password) || !reNum.test(password2))) {
			setAlert('Password must contain at least one number (0-9)!', 'error');
			result = true;
		} else if (step === 1 && (!reLower.test(password) || !reLower.test(password2))) {
			setAlert('Password must contain at least one lowercase letter (a-z)!', 'error');
			result = true;
		} else if (step === 1 && (!reUpper.test(password) || !reUpper.test(password2))) {
			setAlert('Password must contain at least one uppercase letter (A-Z)!', 'error');
			result = true;
		}
		// Check Name
		if (step === 2 && name === '') {
			setAlert('Name Required', 'error');
			result = true;
		} else if (step === 2 && name.length < 6) {
			setAlert("Name Can't be less than 6 characters", 'error');
			result = true;
		}
		// Check Result
		if (result === true) {
			return result;
			// If last step, submit form
		} else if (step === steps.length - 1) {
			console.log(name);
			console.log(email);
			console.log(password);
			const result = await register({ name, email, password });
			if (result) {
				if (setAuthUser) {
					await setAuthUser();
					toggle(false);
				}
			}
			// If not last step continue to next step
		} else {
			setStep(step + 1);
		}
	};

	// Registration steps
	const [step, setStep] = useState(0);
	const steps = [
		{
			label: 'Email',
		},
		{
			label: 'Password',
		},
		{
			label: 'Name',
		},
		{
			label: 'Confirmation',
		},
	];

	// Move user to dashboard if authenticate and in landing
	if (isAuthenticated && !quickRegister) {
		return <Redirect to="user" />;
	}

	// Swap between login and register option
	const swapOption = () => {
		toggleLogin(true);
		toggle(false);
	};

	return (
		<div className="right">
			<div className="dark-overlay">
				<div className="inner">
					{/** Show Logo in large mode */}
					{!quickRegister && (
						<Fragment>
							<div className="hide-landscape">
								<img className="logo" src={require('../../img/logo.png')} alt=""></img>
							</div>
							{subAction === 'login-mobile' ? (
								<h1 className="f-2">Sign In</h1>
							) : (
								<h1 className="f-2">{step === steps.length - 1 ? 'Confirm Details' : 'Sign Up'}</h1>
							)}
						</Fragment>
					)}
					{/** Alert Message*/}
					<Alert />
					{/** If login sub action show login, else register */}
					{subAction === 'login-mobile' ? (
						<Login subAction={subAction} setSubAction={setSubAction} />
					) : (
						<form onSubmit={(e) => onSubmit(e)} className="form">
							{step === 0 && (
								<Fragment>
									<div className="form-group">
										<label className="form-text">Email</label>
										<input
											type="email"
											name="email"
											value={email}
											onChange={(e) => onChange(e)}
											className="border-dark"
											required
										></input>
									</div>
									<div className="form-group">
										<label className="form-text">Repeat Email</label>

										<input
											type="email"
											name="email2"
											value={email2}
											onChange={(e) => onChange(e)}
											className="border-dark"
											required
										></input>
									</div>
								</Fragment>
							)}
							{step === 1 && (
								<Fragment>
									<div className="form-group">
										<label className="form-text">Password</label>
										<input
											type="password"
											name="password"
											value={password}
											onChange={(e) => onChange(e)}
											minLength="6"
											className="border-dark"
											required
										></input>
									</div>
									<div className="form-group">
										<label className="form-text">Repeat Password</label>
										<input
											type="password"
											name="password2"
											value={password2}
											onChange={(e) => onChange(e)}
											minLength="6"
											className="border-dark"
											required
										></input>
									</div>
								</Fragment>
							)}
							{step === 2 && (
								<Fragment>
									<div className="form-group">
										<label className="form-text">Full Name</label>
										<input
											name="name"
											value={name}
											onChange={(e) => onChange(e)}
											className="border-dark"
											type="text"
											required
										></input>
									</div>
								</Fragment>
							)}
							{step === 3 && (
								<Fragment>
									<div className="form-confirm">
										<div className="group">
											<div className="label">Email:</div>
											<div className="value">{email}</div>
										</div>
										<div className="group">
											<div className="label">Full Name:</div>
											<div className="value">{name}</div>
										</div>
									</div>
								</Fragment>
							)}
							<div className="form-group">
								{step > 0 && (
									<div onClick={() => setStep(step - 1)} className="btn btn-dark">
										Prev
									</div>
								)}
								{step === steps.length - 1 ? (
									<input type="submit" value="Proceed" className="btn btn-primary ml-1" />
								) : (
									<div
										onClick={() => checkInput()}
										className={step > 0 ? 'btn btn-primary ml-1' : 'btn btn-primary'}
									>
										Next
									</div>
								)}
							</div>
							<div className="hide-landscape">
								{/** Hide steps for quick registration */}
								{quickRegister ? (
									<div className="dialog-steps">
										<StepsComp steps={steps} setStep={setStep} step={step} />
									</div>
								) : (
									<StepsComp steps={steps} setStep={setStep} step={step} />
								)}
							</div>
							{/** Login or Register options */}
							<div className="form-group">
								<p>
									Already have an account?{' '}
									{quickRegister ? (
										<p onClick={() => swapOption()} className="text-dark bold">
											Sign In
										</p>
									) : (
										<p onClick={() => setSubAction('login-mobile')} className="text-dark bold">
											Sign In
										</p>
									)}
								</p>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
