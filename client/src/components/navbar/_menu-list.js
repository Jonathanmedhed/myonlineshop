import React, { Fragment } from 'react';
import {} from 'react-router-dom';
// Components
import { Menubar } from 'primereact/menubar';

const List = ({
	item,
	jumbo,
	view,
	history,
	isAuthenticated,
	loading,
	logout,
	shops,
	toggleCreateShop,
	setCustomerView,
}) => {
	/** User Shops */
	let shopItems = [
		{
			label: 'Create Shop',
			icon: 'fas fa-plus-circle',
			command: (event) => {
				toggleCreateShop(true);
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
	/** Products */
	let products = [];
	if (item && item.products) {
		if (item && item.product_categories.length > 0) {
			item.product_categories.forEach((cat) => {
				products.push({
					label: cat,
					icon: 'fas fa-caret-right',
					command: (event) => {
						//history.replace(`/shop/${shop._id}`);
					},
				});
			});
		} else if (item && item.products.length > 0) {
			item.products.forEach((product) => {
				products.push({
					label: product.name,
					icon: 'fas fa-caret-right',
					command: (event) => {
						history.replace(`/product/${product._id}`);
					},
				});
			});
		}
	}

	/** Options for unauthorized user */
	let itemsNotUser = [
		{
			label: 'Home',
			icon: 'fas fa-home',
			command: (event) => {
				history.replace('/');
			},
		},
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
			label: 'Home',
			icon: 'fas fa-home',
			command: (event) => {
				history.replace('/');
			},
		},
		{
			label: 'Create Shop',
			icon: 'fas fa-store',
			command: (event) => {
				toggleCreateShop(true);
			},
		},
		{
			separator: true,
		},
		!loading &&
			isAuthenticated && {
				label: 'Logout',
				icon: 'fas fa-sign-out-alt',
				command: (event) => {
					logout();
					history.replace('/');
				},
			},
	];

	/** Options for Shop Owner Account */
	let itemsShopOwner = [
		{
			label: 'Home',
			icon: 'fas fa-home',
			command: () => {
				history.replace('/');
			},
		},
		{
			label: 'My Shops',
			icon: 'fas fa-store',
			items: shopItems,
		},
		{
			separator: true,
		},
		isAuthenticated && {
			label: 'Logout',
			icon: 'fas fa-sign-out-alt',
			command: (event) => {
				logout();
				history.replace('/');
			},
		},
	];

	/** Options for Shop Owner, Shop Component */
	let itemsShopOwnerJumbo = [
		{
			label: 'Sections',
			icon: 'fas fa-puzzle-piece',
			items: products,
		},
		{
			label: 'Settings',
			icon: 'fas fa-cog',
			items: products,
		},
		{
			label: 'Customer View',
			icon: 'far fa-eye',
			command: (event) => {
				setCustomerView();
			},
		},
	];

	/** Options for Customer, Shop Component */
	let itemsShopCostumerJumbo = [
		{
			label: 'Home',
			icon: 'fas fa-home',
			command: (event) => {
				history.replace('/');
			},
		},
		{
			label: 'Products',
			icon: 'fas fa-store',
			items: products,
		},
		{
			label: 'About Us',
			icon: 'fas fa-info-circle',
			command: () => {
				history.replace('/cart');
			},
		},
		{
			label: 'Contact Us',
			icon: 'far fa-address-book',
			command: () => {
				history.replace('/cart');
			},
		},
		{
			separator: true,
		},
		{
			label: 'Follow',
			icon: 'fas fa-plus',
			command: () => {
				history.replace('/cart');
			},
		},
	];
	return (
		<Fragment>
			<div>
				<div className="horizontal">
					{/** normal navbar */}
					{!jumbo && view === 'not-shop-owner' && <Menubar model={itemsNotShopOwner}></Menubar>}
					{!jumbo && view === 'not-user' && <Menubar model={itemsNotUser}></Menubar>}
					{!jumbo && view === 'shop-owner' && <Menubar model={itemsShopOwner}></Menubar>}
					{!jumbo && view === 'shop-owner-visitor' && <Menubar model={itemsShopOwner}></Menubar>}
					{/** shop navbar */}
					{jumbo && view === 'not-shop-owner' && <Menubar model={itemsNotShopOwner}></Menubar>}
					{jumbo && view === 'not-user' && <Menubar model={itemsNotUser}></Menubar>}
					{jumbo && view === 'shop-owner' && <Menubar model={itemsShopOwnerJumbo}></Menubar>}
					{jumbo && view === 'shop-owner-visitor' && <Menubar model={itemsShopOwnerJumbo}></Menubar>}
				</div>
			</div>
		</Fragment>
	);
};

export default List;
