import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import product from './product';
import user from './user';
import shop from './shop';

export default combineReducers({
	alerts,
	auth,
	product,
	user,
	shop,
});
