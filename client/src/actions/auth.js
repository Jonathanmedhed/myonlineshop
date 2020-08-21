import axios from 'axios';
import { setAlert } from './alerts';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

/**
 * Login user request
 * @param {*} email
 * @param {*} password
 */
export const login = (email, password) => async (dispatch) => {
	// headers config
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// set body content
	const body = JSON.stringify({ email, password });
	try {
		// login post request
		const res = await axios.post('/api/auth', body, config);
		// dispatch user info and success type
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		// Set user using token
		dispatch(loadUser());
		return res;
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

/**
 * Load user using authenticated token
 */
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		// Get authenticated user
		const res = await axios.get('/api/auth');
		// dispatch user data and user_loaded type
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

/**
 * Register user request
 * @param {*} name
 * @param {*} email
 * @param {*} password
 */
export const register = ({ name, email, password }) => async (dispatch) => {
	// headers config
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// set body content
	const body = JSON.stringify({ name, email, password });
	try {
		// register user post request
		const res = await axios.post('/api/users', body, config);
		// Dispatch user data and success type
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		// Set user using token
		dispatch(loadUser());

		return res;
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

/**
 * Logout Request
 */
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
