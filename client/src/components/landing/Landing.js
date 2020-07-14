import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//actions
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';

// Components
import Alert from '../alerts/alert';
import Register from './_register';

const Landing = ({ login, isAuthenticated, setAlert }) => {
	const [action, setAction] = useState('login');
	const [subAction, setSubAction] = useState(null);
	const goToLoginMobile = () => {
		setAction('register');
		setSubAction('login-mobile');
	};
	// Form Values
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	// Form Values Variables
	const { email, password } = formData;
	// Asign values on changete/
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		checkInput();
	};

	// Check input
	const checkInput = () => {
		let result = false;
		// Check Email
		if (email === '') {
			setAlert('Email Required', 'error');
			result = true;
		}
		// Check Password
		if (password === '') {
			setAlert('Password Required', 'error');
			result = true;
		}
		// Check Result
		if (result === true) {
			return result;
		} else {
			login(email, password);
		}
	};

	if (isAuthenticated) {
		return <Redirect to="/user" />;
	}
	return (
		<section className="landing">
			<div className="horizontal">
				<div className="left bg-primary">
					<div className="login">
						<img className="logo" src={require('../../img/logo-white.png')} alt=""></img>
						<h1 className="text-dark">MyOnlineShop</h1>
						{/** Alert Message for Login */}
						{action === 'login' && <Alert />}
					</div>
					{action === 'login' ? (
						<form onSubmit={(e) => onSubmit(e)} className="form">
							<div className="form-group">
								<label className="form-text">Email</label>
								<input
									className="border-dark"
									type="email"
									name="email"
									value={email}
									onChange={(e) => onChange(e)}
								></input>
							</div>
							<div className="form-group">
								<label className="form-text">Password</label>
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
								<input type="submit" value="Login" className="btn btn-dark" />
							</div>
							<div className="form-group">
								<p>
									Don't have an account?{' '}
									<div onClick={() => setAction('register')} className="login-text">
										Sign Up
									</div>
								</p>
							</div>
						</form>
					) : (
						<div className="form">
							<div className="my-1">
								<i className="fas fa-arrow-alt-circle-right fa-3x"></i>
								<div className="bold">Proceed to the right side</div>
							</div>
							<div className="form-group">
								<p>
									Already have an account?{' '}
									<div onClick={() => setAction('login')} className="login-text">
										Sign In
									</div>
								</p>
							</div>
						</div>
					)}
				</div>
				{action === 'register' ? (
					<Register setAction={setAction} action={action} subAction={subAction} setSubAction={setSubAction} />
				) : (
					action === 'login' && (
						<div className="right">
							<div className="dark-overlay">
								<div className="inner">
									<img className="logo" src={require('../../img/logo.png')} alt=""></img>
									<h1 className="large">MyOnlineShop</h1>
									<div className="lead my-1">
										Create your Online Shop for <span className="bold f-2">Free</span> and share it
										with the world!
									</div>
									<button onClick={() => setAction('register')} className="btn btn-primary mt-1">
										Start Now!
									</button>
									<div className="show-sm">
										<p className="bold">- or -</p>
										<button onClick={() => goToLoginMobile()} className="btn btn-primary">
											Login
										</button>
									</div>
								</div>
							</div>
						</div>
					)
				)}
			</div>
		</section>
	);
};

Landing.propTypes = {
	setAlert: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert })(Landing);
