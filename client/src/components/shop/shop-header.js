import React, { Fragment } from 'react';
// Components
import { Menubar } from 'primereact/menubar';
import SideBarComp from '../partials/side-bar';

const ShopHeader = ({
	closeProduct,
	unFollow,
	follow,
	isFollower,
	hasProductSection,
	history,
	isOwner,
	logout,
	setOption,
	shop,
	showCreateSection,
	setIsOwner,
	user,
	cartContent,
	setShowCart,
	setProduct,
	goBack,
	toggleCreateProduct,
	type,
	view,
	products,
	setCustomerView,
}) => {
	// Items for the navbar/sidebar
	let items =
		// items for shop owner
		user && user._id === shop.user && isOwner
			? [
					{
						label: 'Website',
						icon: 'far fa-window-maximize',
						items: [
							{
								label: ' Add Section',
								icon: 'fas fa-plus',
								command: () => {
									showCreateSection(true);
								},
							},
							{
								label: ' View Content',
								icon: 'far fa-window-restore',
								command: () => {
									setOption('content');
								},
							},
						],
					},
					{
						label: 'Statistics',
						icon: 'fas fa-chart-line',
						command: () => {
							setOption('statistics');
						},
					},
					{
						label: 'Products',
						icon: 'fas fa-boxes',
						items: [
							{
								label: ' Add Product',
								icon: 'fas fa-plus',
								command: () => {
									toggleCreateProduct(true);
								},
							},
							{
								label: ' View Products',
								icon: 'fas fa-boxes',
								command: () => {
									setOption('products');
								},
							},
						],
					},
					{
						label: 'Orders',
						icon: 'fas fa-clipboard-list',
						command: () => {
							setOption('orders');
						},
					},
					{
						label: 'Settings',
						icon: 'fas fa-cog',
						command: () => {
							setOption('settings');
						},
					},
					{
						label: isOwner ? 'Customer View' : 'Owner View',
						icon: 'far fa-eye',
						command: () => {
							setCustomerView();
						},
					},
			  ]
			: [
					// items for visitor
					!isFollower && user
						? {
								label: 'Follow Us',
								icon: 'fas fa-plus',
								command: () => {
									follow(shop._id);
								},
						  }
						: isFollower &&
						  user && {
								label: 'Unfollow',
								icon: 'fas fa-minus',
								command: () => {
									unFollow();
								},
						  },
					{
						label: 'Feedback',
						icon: 'fas fa-star-half-alt',
						command: () => {
							setOption('feedback-visitor');
						},
					},
					hasProductSection && {
						label: 'Products',
						icon: 'fas fa-boxes',
						command: () => {
							setOption('product-section');
						},
					},
			  ];

	// Open shopping cart
	const openCart = () => {
		setShowCart(true);
		closeProduct();
	};
	return (
		<Fragment>
			<div className="jumbo-header">
				<div className="title">
					{/** shop logo */}
					{shop.pic_logo !== 'none' && (
						<img
							className="small-icon"
							src={shop.pic_logo ? shop.pic_logo : require('../../img/logo-example.png')}
							alt=""
						></img>
					)}
					{/** Shop name */}
					<h1 onClick={() => goBack()}>{shop.name}</h1>
				</div>
				{/** Navbar options for desktop */}
				<div className="hide-sm">
					<Menubar model={items}></Menubar>
				</div>
				{/** Mobile Menu */}
				<div className="show-sm">
					<div className="mobile-bars">
						<SideBarComp
							type={type}
							history={history}
							view={view}
							direction={'right'}
							products={products}
							selectOption={setOption}
							selectProduct={setProduct}
							shop={shop}
							hasProductSection={hasProductSection}
							unFollow={unFollow}
							follow={follow}
							isFollower={isFollower}
							user={user}
							cartContent={cartContent}
							setShowCart={setShowCart}
							setProduct={setProduct}
							logout={logout}
						/>
					</div>
				</div>
				{/** Shopping cart button */}
				{!isOwner && (
					<div className="header-cart">
						{cartContent.length > 0 ? (
							<div onClick={() => openCart()} className="full-cart">
								<i class="fas fa-shopping-cart"></i>
							</div>
						) : (
							<div className="empty-cart">
								<i class="fas fa-shopping-cart"></i>
							</div>
						)}
					</div>
				)}
			</div>
		</Fragment>
	);
};
export default ShopHeader;
