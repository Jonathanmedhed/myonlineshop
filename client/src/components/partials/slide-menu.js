import React, { Fragment, useState, useEffect } from 'react';
// Functions
import { SlideMenu } from 'primereact/slidemenu';

const SlideComp = ({
	history,
	products,
	selectProduct,
	selectOption,
	shop,
	shops,
	toggle,
	view,
	isAuthenticated,
	loading,
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
	const openCart = () => {
		setShowCart(true);
		setProduct(null);
		toggle(false);
	};

	/** User Shops */
	let shopItems = [
		{
			label: 'Create Shop',
			icon: 'fas fa-plus-circle',
			command: (event) => {
				toggleCreateShop(true);
				toggle(false);
			},
		},
	];
	if (shops) {
		shops.forEach((shop) => {
			shopItems.push({
				label: shop.name,
				icon: 'fas fa-caret-right',
				command: (event) => {
					history.replace(`/shop/${shop.name}`);
				},
			});
		});
	}

	/** User Products */
	let productItems = [];
	if (products) {
		if (products.length > 0) {
			products.forEach((product) => {
				productItems.push({
					label: product.name,
					icon: 'fas fa-caret-right',
					command: (event) => {
						selectProduct(product._id);
						toggle(false);
					},
				});
			});
		}
	}

	/** Options for Shop Owner Account */
	let home = [
		{
			label: 'Home',
			icon: 'fas fa-home',
			command: () => {
				history.replace('/');
				toggle(false);
			},
		},
	];

	let logoutOption = [
		{
			separator: true,
		},
		{
			label: 'Logout',
			icon: 'fas fa-sign-out-alt',
			command: (event) => {
				logout();
				history.replace('/');
			},
		},
		{
			separator: true,
		},
	];

	/** Options for Not Logged in user */
	let itemsNotUser = [
		{
			label: 'Create Shop',
			icon: 'fas fa-store',
			command: (event) => {
				history.replace('/');
			},
		},
		{
			label: 'Sign In/Up',
			icon: 'fas fa-sign-in-alt',
			command: (event) => {
				history.replace('/');
			},
		},
	];

	/** Options for Not Shop Owner Account */
	let itemsNotShopOwner = [
		{
			label: <div className="bold">Create Shop</div>,
			icon: 'fas fa-store',
			command: (event) => {
				toggleCreateShop(true);
				toggle(false);
			},
		},
		{
			label: 'My Statistics',
			icon: 'fas fa-chart-line',
			command: (event) => {
				selectOption('statistics');
				toggle(false);
			},
		},
		{
			label: 'Transactions',
			icon: 'fas fa-search-dollar',
			command: (event) => {
				selectOption('trans-purchase');
				toggle(false);
			},
		},
		{
			label: 'Feedback',
			icon: 'fas fa-star-half-alt',
			command: (event) => {
				selectOption('feedback');
				toggle(false);
			},
		},
		{
			label: 'Settings',
			icon: 'fas fa-user-cog',
			command: (event) => {
				selectOption('settings');
				toggle(false);
			},
		},
	];

	/** Options for Not Shop Owner Account In Shop Component */
	let itemsNotShopOwnerShop = [
		{
			label: <div className="bold">Create Shop</div>,
			icon: 'fas fa-store',
			command: (event) => {
				toggleCreateShop(true);
				toggle(false);
			},
		},
		{
			label: 'My Account',
			icon: 'fas fa-user-cog',
			command: () => {
				history.replace('/');
				toggle(false);
			},
		},
		{
			separator: true,
		},
		{
			label: 'Logout',
			icon: 'fas fa-sign-out-alt',
			command: (event) => {
				logout();
				history.replace('/');
			},
		},
		{
			separator: true,
		},
	];

	/** Options for Shop Owner Account */
	let itemsShopOwner = [
		{
			label: 'Home',
			icon: 'fas fa-home',
			command: () => {
				history.replace('/');
				toggle(false);
			},
		},
		{
			label: 'My Statistics',
			icon: 'fas fa-chart-line',
			command: (event) => {
				selectOption('statistics');
				toggle(false);
			},
		},
		{
			label: 'My Shops',
			icon: 'fas fa-store',
			items: [
				{
					label: 'Create Shop',
					icon: 'fas fa-plus-circle',
					command: (event) => {
						toggleCreateShop(true);
						toggle(false);
					},
				},
				{
					label: 'Select One',
					icon: 'far fa-check-square',
					items: shopItems,
				},
				{
					label: 'View All',
					icon: 'far fa-list-alt',
					command: (event) => {
						selectOption('shops');
						toggle(false);
					},
				},
			],
		},
		{
			label: 'My Products',
			icon: 'fas fa-boxes',
			items: [
				{
					label: 'View All',
					icon: 'far fa-list-alt',
					command: (event) => {
						selectOption('products');
						toggle(false);
					},
				},
				{
					label: 'Select One',
					icon: 'far fa-check-square',
					items: productItems,
				},
			],
		},
		{
			label: 'Transactions',
			icon: 'fas fa-search-dollar',
			items: [
				{
					label: 'Purchase',
					icon: 'fas fa-wallet',
					command: (event) => {
						selectOption('trans-purchase');
						toggle(false);
					},
				},
				{
					label: 'Sale',
					icon: 'fas fa-hand-holding-usd',
					command: (event) => {
						selectOption('trans-sale');
						toggle(false);
					},
				},
			],
		},
	];

	let itemsShopOwner2 = [
		{
			label: 'Orders',
			icon: 'fas fa-cash-register',
			items: [
				{
					label: 'Purchase',
					icon: 'fas fa-wallet',
					command: (event) => {
						selectOption('orders-purchase');
						toggle(false);
					},
				},
				{
					label: 'Sale',
					icon: 'fas fa-hand-holding-usd',
					command: (event) => {
						selectOption('orders-sale');
						toggle(false);
					},
				},
			],
		},
		{
			label: 'Feedback',
			icon: 'fas fa-star-half-alt',
			command: (event) => {
				selectOption('feedback');
				toggle(false);
			},
		},
		{
			label: 'Settings',
			icon: 'fas fa-user-cog',
			command: (event) => {
				selectOption('settings');
				toggle(false);
			},
		},
		{
			separator: true,
		},
		{
			label: 'Logout',
			icon: 'fas fa-sign-out-alt',
			command: (event) => {
				logout();
				history.replace('/');
			},
		},
		{
			separator: true,
		},
	];

	/** Options for Shop Owner Account */
	let itemsShopOwnerShop = [
		{
			separator: true,
		},
		{
			label: 'Website Content',
			icon: 'far fa-window-maximize',
			command: (event) => {
				selectOption('content');
				toggle(false);
			},
		},
		{
			label: 'Statistics',
			icon: 'fas fa-chart-line',
			command: (event) => {
				selectOption('statistics');
				toggle(false);
			},
		},
		{
			label: 'Transactions',
			icon: 'fas fa-hand-holding-usd',
			command: (event) => {
				selectOption('transactions');
				toggle(false);
			},
		},
		{
			label: 'Feedback',
			icon: 'fas fa-star-half-alt',
			command: (event) => {
				selectOption('feedback');
				toggle(false);
			},
		},
		{
			label: 'Settings',
			icon: 'fas fa-cog',
			command: (event) => {
				selectOption('settings');
				toggle(false);
			},
		},
	];

	let itemsShopOwner2Shop = [
		{
			label: 'Products',
			icon: 'fas fa-boxes',
			command: (event) => {
				selectOption('products');
				toggle(false);
			},
		},
		{
			label: 'Orders',
			icon: 'fas fa-clipboard-list',
			command: (event) => {
				selectOption('orders');
				toggle(false);
			},
		},
		{
			label: <div className="bold">Account</div>,
		},
		{
			separator: true,
		},
		{
			label: 'My Account',
			icon: 'fas fa-user-cog',
			command: () => {
				history.replace('/');
				toggle(false);
			},
		},
		{
			label: 'My Shops',
			icon: 'fas fa-store',
			items: shopItems,
		},
	];

	/** Options for Visiting Shop Owner */
	let itemsVisitingShopOwner = [
		{
			label: 'My Shops',
			icon: 'fas fa-store',
			items: shopItems,
		},
		{
			label: 'My Account',
			icon: 'fas fa-user-cog',
			command: () => {
				history.replace('/');
				toggle(false);
			},
		},
		{
			separator: true,
		},
		{
			label: 'Logout',
			icon: 'fas fa-sign-out-alt',
			command: (event) => {
				logout();
				history.replace('/');
			},
		},
		{
			separator: true,
		},
	];

	/** Options for Visiting Shop Owner in Shop Navbar */
	let itemsVisitingShopOwnerShop = [];

	if (hasProductSection && unFollow && follow && cartContent && setShowCart && setProduct && shop) {
		itemsVisitingShopOwnerShop = [
			{
				label: <div className="bold">{shop ? shop.name : 'Shop'}</div>,
			},
			{
				separator: true,
			},
			!isFollower && user
				? {
						label: 'Follow Us',
						icon: 'fas fa-plus',
						command: () => {
							follow();
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
				command: (event) => {
					selectOption('feedback-visitor');
					toggle(false);
				},
			},
			hasProductSection && {
				label: 'Products',
				icon: 'fas fa-boxes',
				command: () => {
					selectOption('product-section');
				},
			},
			cartContent.length > 0 && {
				label: 'Cart',
				icon: 'fas fa-shopping-cart',
				command: () => {
					openCart();
				},
			},
		];
	}

	let itemsVisitingShopOwnerShop2 = [
		{
			label: <div className="bold">Account</div>,
		},
		{
			separator: true,
		},
		{
			label: 'My Account',
			icon: 'fas fa-user-cog',
			command: () => {
				history.replace('/');
				toggle(false);
			},
		},
		{
			label: 'My Shops',
			icon: 'fas fa-store',
			items: shopItems,
		},
		{
			label: 'Logout',
			icon: 'fas fa-sign-out-alt',
			command: (event) => {
				logout();
				history.replace('/');
			},
		},
	];

	return (
		<Fragment>
			{/**console.log('View Slide: ' + view)*/}
			{/**console.log('Type Slide: ' + type)*/}
			{/** Not Shop Owner */}
			{view === 'not-shop-owner' && type !== 'shop' && <SlideMenu model={itemsNotShopOwner}></SlideMenu>}
			{view === 'not-shop-owner' && type === 'shop' && <SlideMenu model={itemsNotShopOwnerShop}></SlideMenu>}

			{view === 'not-user' && <SlideMenu model={itemsNotUser}></SlideMenu>}
			{/** Shop Owner */}
			{view === 'shop-owner' && type !== 'shop' && <SlideMenu model={itemsShopOwner}></SlideMenu>}
			{view === 'shop-owner' && type !== 'shop' && <SlideMenu model={itemsShopOwner2}></SlideMenu>}
			{/** Shop Owner Visitor*/}
			{view === 'shop-owner-visitor' && type !== 'shop' && <SlideMenu model={itemsVisitingShopOwner}></SlideMenu>}
			{view === 'shop-owner-visitor' && type === 'shop' && (
				<Fragment>
					<SlideMenu model={itemsVisitingShopOwnerShop}></SlideMenu>
					<SlideMenu model={itemsVisitingShopOwnerShop2}></SlideMenu>
				</Fragment>
			)}

			{view === 'shop-owner' && type === 'shop' && (
				<Fragment>
					<div className="bold ml-1">Shop</div>
					<SlideMenu model={itemsShopOwnerShop}></SlideMenu>
				</Fragment>
			)}
			{view === 'shop-owner' && type === 'shop' && <SlideMenu model={itemsShopOwner2Shop}></SlideMenu>}
			{view === 'shop-owner' && type === 'shop' && <SlideMenu model={logoutOption}></SlideMenu>}
		</Fragment>
	);
};
export default SlideComp;
