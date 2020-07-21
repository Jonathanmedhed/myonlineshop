import React, { Fragment, useState } from 'react';
import moment from 'moment';
// Components
import { Chart } from 'primereact/chart';
import { SelectButton } from 'primereact/selectbutton';
import LightBox from '../partials/list-box';
// Functions
import { productsQtyTransaction } from '../../actions/utilities';

const ChartComp = ({ data, onlychart, type, title }) => {
	// Open Lightbox
	const [openChart, setOpenChart] = useState(false);
	// Select Buttons
	const [value, setValue] = useState('day');
	const [options, setOptions] = useState([
		{ label: 'Today', value: 'day' },
		{ label: 'Week', value: 'week' },
		{ label: 'Month', value: 'month' },
		{ label: 'Year', value: 'year' },
	]);

	// Value for User and Shop Objects, e.g: show items sold or items bought
	const [valueObject, setValueObject] = useState(title);

	/**
	Monthly Data
	*/
	const yearSales = (items) => {
		let January = 0;
		let February = 0;
		let March = 0;
		let April = 0;
		let May = 0;
		let June = 0;
		let July = 0;
		let August = 0;
		let September = 0;
		let October = 0;
		let November = 0;
		let December = 0;

		let today = new Date();

		items &&
			items.forEach((item) => {
				let date = new Date(item.date);
				// Only This year's
				if (date.getFullYear() === today.getFullYear()) {
					{
						/**
					if the item is a transaction, calculate the product quantity in it.
					if item is a product just get its quantity
					if the item is a transaction income/spend calulation, use total.
					*/
					}
					switch (date.getMonth()) {
						case 0:
							January =
								January +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 1:
							February =
								February +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 2:
							March =
								March +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 3:
							April =
								April +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 4:
							May =
								May +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 5:
							June =
								June +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 6:
							July =
								July +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 7:
							August =
								August +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 8:
							September =
								September +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 9:
							October =
								October +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 10:
							November =
								November +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 11:
							December =
								December +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						default:
						// code block
					}
				}
			});

		return {
			/** Label for each month */
			labels: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			],
			/** Asign value for each month */
			/** Chart Style */
			datasets: [
				{
					label: title && title,
					data: [
						January,
						February,
						March,
						April,
						May,
						June,
						July,
						August,
						September,
						October,
						November,
						December,
					],
					fill: true,
					borderColor: '#FFA726',
					backgroundColor: '#FFCC80',
				},
			],
		};
	};

	/**
	Current month Data
	*/
	const monthlySales = (items) => {
		let d1 = 0;
		let d2 = 0;
		let d3 = 0;
		let d4 = 0;
		let d5 = 0;
		let d6 = 0;
		let d7 = 0;
		let d8 = 0;
		let d9 = 0;
		let d10 = 0;
		let d11 = 0;
		let d12 = 0;
		let d13 = 0;
		let d14 = 0;
		let d15 = 0;
		let d16 = 0;
		let d17 = 0;
		let d18 = 0;
		let d19 = 0;
		let d20 = 0;
		let d21 = 0;
		let d22 = 0;
		let d23 = 0;
		let d24 = 0;
		let d25 = 0;
		let d26 = 0;
		let d27 = 0;
		let d28 = 0;
		let d29 = 0;
		let d30 = 0;
		let d31 = 0;

		let today = new Date();

		items &&
			items.forEach((item) => {
				let date = new Date(item.date);
				// Only this year and month's
				if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
					{
						/**
					if the item is a transaction, calculate the product quantity in it.
					if item is a product just get its quantity
					if the item is a transaction income/spend calulation, use total.
					*/
					}
					switch (date.getDate()) {
						case 1:
							d1 =
								d1 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 2:
							d2 =
								d2 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 3:
							d3 =
								d3 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 4:
							d4 =
								d4 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 5:
							d5 =
								d5 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 6:
							d6 =
								d6 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 7:
							d7 =
								d7 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 8:
							d8 =
								d8 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 9:
							d9 =
								d9 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 10:
							d10 =
								d10 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 11:
							d11 =
								d11 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 12:
							d12 =
								d12 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 13:
							d13 =
								d13 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 14:
							d14 =
								d14 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 15:
							d15 =
								d15 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 16:
							d16 =
								d16 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 17:
							d17 =
								d17 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 18:
							d18 =
								d18 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 19:
							d19 =
								d19 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 20:
							d20 =
								d20 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 21:
							d21 =
								d21 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 22:
							d22 =
								d22 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 23:
							d23 =
								d23 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 24:
							d24 =
								d24 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 25:
							d25 =
								d25 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 26:
							d26 =
								d26 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 27:
							d27 =
								d27 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 28:
							d28 =
								d28 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 29:
							d29 =
								d29 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 30:
							d30 =
								d30 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 31:
							d31 =
								d31 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						default:
						// code block
					}
				}
			});

		return {
			/** Label for each day */
			labels: [
				' 1',
				' 2',
				' 3',
				' 4',
				' 5',
				' 6',
				' 7',
				' 8',
				' 9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20',
				'21',
				'22',
				'23',
				'24',
				'25',
				'26',
				'27',
				'28',
				'29',
				'30',
				'31',
			],
			datasets: [
				/** Asign value for each month */
				/** Chart Style */
				{
					label: title && title,
					data: [
						d1,
						d2,
						d3,
						d4,
						d5,
						d6,
						d7,
						d8,
						d9,
						d10,
						d11,
						d12,
						d13,
						d14,
						d15,
						d16,
						d17,
						d18,
						d19,
						d20,
						d21,
						d22,
						d23,
						d24,
						d25,
						d26,
						d27,
						d28,
						d29,
						d30,
						d31,
					],
					fill: true,
					borderColor: '#FFA726',
					backgroundColor: '#FFCC80',
				},
			],
		};
	};

	/**
	Current week Data
	*/
	const weeklySales = (items) => {
		let monday = 0;
		let tuesday = 0;
		let wednesday = 0;
		let thursday = 0;
		let friday = 0;
		let saturday = 0;
		let sunday = 0;

		let startOfWeek = moment().startOf('week').toDate();
		let endOfWeek = moment().endOf('week').toDate();

		items &&
			items.forEach((item) => {
				let date = new Date(item.date);
				if (date > startOfWeek && date < endOfWeek) {
					{
						/**
					if the item is a transaction, calculate the product quantity in it.
					if item is a product just get its quantity
					if the item is a transaction income/spend calulation, use total.
					*/
					}
					switch (date.getDay()) {
						case 0:
							sunday =
								sunday +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 1:
							monday =
								monday +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 2:
							tuesday =
								tuesday +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 3:
							wednesday =
								wednesday +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 4:
							thursday =
								thursday +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 5:
							friday =
								friday +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 6:
							saturday =
								saturday +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						default:
						// code block
					}
				}
			});

		return {
			/** Label for each day of the week*/
			labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			/** Asign value for each day of the week */
			/** Chart Style */
			datasets: [
				{
					label: title && title,
					data: [sunday, monday, tuesday, wednesday, thursday, friday, saturday],
					fill: true,
					borderColor: '#FFA726',
					backgroundColor: '#FFCC80',
				},
			],
		};
	};

	/**
	Today Data
	*/
	const daySales = (items) => {
		let h0 = 0;
		let h1 = 0;
		let h2 = 0;
		let h3 = 0;
		let h4 = 0;
		let h5 = 0;
		let h6 = 0;
		let h7 = 0;
		let h8 = 0;
		let h9 = 0;
		let h10 = 0;
		let h11 = 0;
		let h12 = 0;
		let h13 = 0;
		let h14 = 0;
		let h15 = 0;
		let h16 = 0;
		let h17 = 0;
		let h18 = 0;
		let h19 = 0;
		let h20 = 0;
		let h21 = 0;
		let h22 = 0;
		let h23 = 0;

		let today = new Date();

		items &&
			items.forEach((item) => {
				let date = new Date(item.date);
				// Only this year and month's
				if (
					date.getFullYear() === today.getFullYear() &&
					date.getMonth() === today.getMonth() &&
					date.getDate() === today.getDate()
				) {
					{
						/**
					if the item is a transaction, calculate the product quantity in it.
					if item is a product just get its quantity
					if the item is a transaction income/spend calulation, use total.
					*/
					}
					switch (date.getHours()) {
						case 0:
							h0 =
								h0 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 1:
							h1 =
								h1 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 2:
							h2 =
								h2 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 3:
							h3 =
								h3 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 4:
							h4 =
								h4 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 5:
							h5 =
								h5 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 6:
							h6 =
								h6 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 7:
							h7 =
								h7 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 8:
							h8 =
								h8 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 9:
							h9 =
								h9 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 10:
							h10 =
								h10 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 11:
							h11 =
								h11 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 12:
							h12 =
								h12 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 13:
							h13 =
								h13 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 14:
							h14 =
								h14 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 15:
							h15 =
								h15 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 16:
							h16 =
								h16 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 17:
							h17 =
								h17 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 18:
							h18 =
								h18 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 19:
							h19 =
								h19 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 20:
							h20 =
								h20 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 21:
							h21 =
								h21 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 22:
							h22 =
								h22 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						case 23:
							h23 =
								h23 +
								(type === 'transactions' || type === 'shop-transactions'
									? productsQtyTransaction(item)
									: type === 'products-sold'
									? item.quantity
									: type === 'transactions-money'
									? item.total
									: 1);
							break;
						default:
						// code block
					}
				}
			});

		return {
			/** Label for each hour of the day*/
			labels: [
				' 0',
				' 1',
				' 2',
				' 3',
				' 4',
				' 5',
				' 6',
				' 7',
				' 8',
				' 9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20',
				'21',
				'22',
				'23',
			],
			datasets: [
				{
					/** Asign value for each hour */
					/** Chart Style */
					label: title && title,
					data: [
						h0,
						h1,
						h2,
						h3,
						h4,
						h5,
						h6,
						h7,
						h8,
						h9,
						h10,
						h11,
						h12,
						h13,
						h14,
						h15,
						h16,
						h17,
						h18,
						h19,
						h20,
						h21,
						h22,
						h23,
					],
					fill: true,
					borderColor: '#FFA726',
					backgroundColor: '#FFCC80',
				},
			],
		};
	};

	return (
		<Fragment>
			{/** Lightbox view */}
			{openChart && (
				<div className="light-box">
					<div className="inner">
						<i onClick={() => setOpenChart(false)} class="far fa-times-circle"></i>
						<div className="bg-white p-1">
							<div className={onlychart === true ? 'chart-wrapper-center' : 'chart-wrapper'}>
								<div className="chart-container">
									<Fragment>
										{value === 'day' && <Chart type="line" data={daySales(data)} />}
										{value === 'week' && <Chart type="line" data={weeklySales(data)} />}
										{value === 'month' && <Chart type="line" data={monthlySales(data)} />}
										{value === 'year' && <Chart type="line" data={yearSales(data)} />}
									</Fragment>
								</div>
								<div className="select-buttons">
									<SelectButton value={value} options={options} onChange={(e) => setValue(e.value)} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{/** Main chart */}
			<div className={onlychart === true ? 'chart-wrapper-center' : 'chart-wrapper'}>
				<div className="chart-container">
					<Fragment>
						{value === 'day' && <Chart type="line" data={daySales(data)} />}
						{value === 'week' && <Chart type="line" data={weeklySales(data)} />}
						{value === 'month' && <Chart type="line" data={monthlySales(data)} />}
						{value === 'year' && <Chart type="line" data={yearSales(data)} />}
					</Fragment>
				</div>
				<div className="select-buttons">
					<SelectButton value={value} options={options} onChange={(e) => setValue(e.value)} />
				</div>
				{/** Toggle chart lightbox */}
				<div className="show-sm">
					<i onClick={() => setOpenChart(true)} className="far fa-window-maximize"></i>
				</div>
			</div>
		</Fragment>
	);
};

export default ChartComp;
