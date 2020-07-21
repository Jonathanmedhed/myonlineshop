import React, { Fragment, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import SlideComp from './slide-menu';
import { Button } from 'primereact/button';

const SideBarComp = ({
	direction,
	history,
	products,
	shops,
	shop,
	selectProduct,
	selectOption,
	view,
	loading,
	isAuthenticated,
	logout,
	type,
	toggleCreateShop,
	hasProductSection,
	unFollow,
	follow,
	isFollower,
	user,
	cartContent,
	setShowCart,
	setProduct,
}) => {
	const [visibleLeft, setVisibleLeft] = useState(false);
	const [visibleRight, setVisibleRight] = useState(false);
	return (
		<Fragment>
			{/** Left side bar */}
			{direction === 'left' && (
				<Fragment>
					<Sidebar visible={visibleLeft} onHide={(e) => setVisibleLeft(false)}>
						<div className="title mb-1">
							<i className="fas fa-code"></i>
							<h1>MyOnlineShop</h1>
						</div>
						{/** Slide menu */}
						<SlideComp
							type={type}
							history={history}
							products={products}
							selectProduct={selectProduct}
							selectOption={selectOption}
							shops={shops}
							view={view}
							toggle={setVisibleLeft}
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
					</Sidebar>
					<Button icon="fas fa-bars" onClick={(e) => setVisibleLeft(true)} />
				</Fragment>
			)}
			{/** Right side bar */}
			{direction === 'right' && (
				<Fragment>
					<div className="side-bar-right">
						<Sidebar position="right" visible={visibleRight} onHide={(e) => setVisibleRight(false)}>
							<div className="title mb-1">
								<h1>MyOnlineShop</h1>
							</div>
							{/** Slide menu */}
							<SlideComp
								type={type}
								history={history}
								products={products}
								selectProduct={selectProduct}
								selectOption={selectOption}
								shops={shops}
								view={view}
								toggle={setVisibleRight}
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
						</Sidebar>
						<Button icon="fas fa-bars" onClick={(e) => setVisibleRight(true)} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};
export default SideBarComp;
