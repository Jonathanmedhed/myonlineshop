import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Functions
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';
// Components
import Alert from '../alerts/alert';
import PrimeSpinner from '../partials/spinner';

const Login = ({ setSubAction, setAlert, login, isAuthenticated, quickLogin, toggle, setAuthUser, toggleRegister }) => {
	// Loading for submition
	const [submition, setSubmition] = useState(false);
	// Form Values
	const [formData, setFormData] = useState({
		email: 'Testuser@gmail.com',
		password: 'Pass1234!',
	});
	// Form Values Variables

	const { email, password } = formData;

	// Asign values on change
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	// Check input on submit
	const onSubmit = async (e) => {
		e.preventDefault();
		checkInput();
	};

	// Check input and submit if no errors
	const checkInput = async () => {
		let result = false;
		// Check Email
		if (email === '') {
			setAlert('Email Required', 'error');
			result = true;
		}
		// Check Password
		if (password.length === 0) {
			setAlert('Passwords Required', 'error');
			result = true;
		} else if (password.length < 6) {
			setAlert("Password Can't be less than 6 characters", 'error');
			result = true;
		}
		// Check Result
		if (result === true) {
			return result;
			// If last step, submit form
		} else {
			setSubmition(true);
			if (quickLogin) {
				const result = await login(email, password);
				if (result) {
					await setAuthUser();
					toggle(false);
				}
			} else {
				await login(email, password);
			}
			setSubmition(false);
		}
	};

	// Redirect to user page if auntenticated and in landing
	if (isAuthenticated && !quickLogin) {
		return <Redirect to="user" />;
	}

	// Switch between login and register
	const swapOption = () => {
		toggleRegister(true);
		toggle(false);
	};

	return (
		<form onSubmit={(e) => onSubmit(e)} className="form">
			{/** show spinner on submitions */}
			{submition && <PrimeSpinner />}
			<div className="form-group">
				<label className="form-text">Email</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => onChange(e)}
					className="border-dark"
				></input>
				<div>Testuser@gmail.com</div>
			</div>
			<div className="form-group">
				<label className="form-text">Password</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => onChange(e)}
					minLength="6"
					className="border-dark"
				></input>
				<div>Pass1234!</div>
			</div>
			<div className="form-group">
				<div onClick={() => checkInput()} className="btn btn-primary">
					Login
				</div>
			</div>
			{/** Swap between login and register options */}
			<div className="form-group">
				<p>
					Don't have an account?{' '}
					{quickLogin ? (
						<div onClick={() => swapOption()} className="text-dark bold">
							Sign Up
						</div>
					) : (
						<div onClick={() => setSubAction(null)} className="text-dark bold">
							Sign Up
						</div>
					)}
				</p>
			</div>
		</form>
	);
};

Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
