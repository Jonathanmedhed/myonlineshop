import React from 'react';
import { Link } from 'react-router-dom';
// Components
import List from './_menu-list';
import InputDropdownComp from '../partials/dropdown';
import SideBarComp from '../partials/side-bar';

const Navbar = ({
	type,
	setOption,
	bodyRef,
	view,
	history,
	products,
	shops,
	shop,
	user,
	selectOption,
	selectProduct,
	loading,
	isAuthenticated,
	logout,
	toggleCreateShop,
	hasProductSection,
	unFollow,
	follow,
	isFollower,
	cartContent,
	setShowCart,
	setProduct,
}) => {
	return (
		<nav className="navbar-hover-under">
			{/** Left Side Bar */}
			<div className="left">
				<div className="hide-sm">
					<SideBarComp
						isAuthenticated={isAuthenticated}
						type={type}
						history={history}
						view={view}
						direction={'left'}
						products={products}
						shops={shops}
						selectOption={selectOption}
						selectProduct={selectProduct}
						isAuthenticated={isAuthenticated}
						loading={loading}
						logout={logout}
						toggleCreateShop={toggleCreateShop}
						hasProductSection={hasProductSection}
						unFollow={unFollow}
						follow={follow}
						isFollower={isFollower}
						user={user}
						cartContent={cartContent}
						setShowCart={setShowCart}
						setProduct={setProduct}
						shop={shop}
					/>
				</div>
				<div className="title">
					<Link to="/">
						<i className="fas fa-code fa-2x"></i>
					</Link>
					<h1>
						<Link to="/">MyOnlineShop</Link>
					</h1>
				</div>
			</div>
			{/** Searchbox */}
			<div className="hide">
				<div className="search-button">
					<input placeholder="search..." className="search-big" type="text"></input>
					<InputDropdownComp options={'simple'} filter={false} placeholder={'products'} />
				</div>
			</div>
			{/** Navbar Choices */}
			<div className="hide-sm">
				<List
					type={type}
					setOption={setOption}
					bodyRef={bodyRef}
					view={view}
					history={history}
					products={products}
					shops={shops}
					user={user}
					isAuthenticated={isAuthenticated}
					loading={loading}
					logout={logout}
					toggleCreateShop={toggleCreateShop}
				/>
			</div>
			{/** Mobile Menu */}
			<div className="show-sm">
				<div className="mobile-bars">
					<SideBarComp
						isAuthenticated={isAuthenticated}
						type={type}
						history={history}
						view={view}
						direction={'right'}
						products={products}
						shops={shops}
						selectOption={selectOption}
						selectProduct={selectProduct}
						isAuthenticated={isAuthenticated}
						loading={loading}
						logout={logout}
						toggleCreateShop={toggleCreateShop}
						hasProductSection={hasProductSection}
						unFollow={unFollow}
						follow={follow}
						isFollower={isFollower}
						user={user}
						cartContent={cartContent}
						setShowCart={setShowCart}
						setProduct={setProduct}
						shop={shop}
					/>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
