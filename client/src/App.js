import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Cart from './components/cart/cart';
import Landing from './components/landing/Landing';
//import PrivateRoute from './components/routing/PrivateRoute';
import ProductDashboard from './components/product/product-dashboard';
import ShopDashboard from './components/shop/shop-dashboard';
import UserDashboard from './components/user/user-dashboard';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './scss/App.scss';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	//run an effect and clean it once on mount/unmount
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Route exact path="/" component={Landing} />
					<Switch>
						<Route exact path="/cart" component={Cart} />
						<Route exact path="/product" component={ProductDashboard} />
						<Route exact path="/product/:id" component={ProductDashboard} />
						<Route exact path="/shop" component={ShopDashboard} />
						<Route exact path="/shop/:id" component={ShopDashboard} />
						<Route exact path="/user" component={UserDashboard} />
						<Route exact path="/user/:id" component={UserDashboard} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
