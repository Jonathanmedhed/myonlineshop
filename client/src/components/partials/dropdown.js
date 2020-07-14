import React, { Fragment, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const InputDropdownComp = ({ options, setValue, placeholder, searchPlaceHolder, filter, value }) => {
	const [item, setItem] = useState(null);
	const [items, setItems] = useState(
		options === 'shops'
			? [
					{ label: 'bakery', value: 'bakery' },

					{ label: 'barbershop', value: 'barbershop' },

					{ label: 'beauty parlour', value: 'beauty parlour' },

					{ label: 'beauty salon', value: 'beauty salon' },

					{ label: 'big-box store', value: 'big-box store' },

					{ label: 'book club', value: 'book club' },

					{ label: 'bookshop', value: 'bookshop' },

					{ label: 'bookstall', value: 'bookstall' },

					{ label: 'bookstore', value: 'bookstore' },

					{ label: 'booth', value: 'booth' },

					{ label: 'bottle shop', value: 'bottle shop' },

					{ label: 'boutique', value: 'boutique' },

					{ label: 'bucket shop', value: 'bucket shop' },

					{ label: 'builders’ merchant', value: 'builders’ merchant' },

					{ label: 'butcher', value: 'butcher' },

					{ label: 'butchery', value: 'butchery' },

					{ label: 'café', value: 'café' },

					{ label: 'cash-and-carry', value: 'cash-and-carry' },

					{ label: 'chain store', value: 'chain store' },

					{ label: 'charity shop', value: 'charity shop' },

					{ label: 'chemist', value: 'chemist' },

					{ label: 'chip shop', value: 'chip shop' },

					{ label: 'the cleaners', value: 'the cleaners' },

					{ label: 'commissary', value: 'commissary' },

					{ label: 'concession', value: 'concession' },

					{ label: 'convenience store', value: 'convenience store' },

					{ label: 'corner dairy', value: 'corner dairy' },

					{ label: 'corner shop', value: 'corner shop' },

					{ label: 'cupcakery', value: 'cupcakery' },

					{ label: 'dairy', value: 'dairy' },

					{ label: 'deli', value: 'deli' },

					{ label: 'delicatessen', value: 'delicatessen' },

					{ label: 'depanneur', value: 'depanneur' },

					{ label: 'department store', value: 'department store' },

					{ label: 'dime store', value: 'dime store' },

					{ label: 'dispensing chemist', value: 'dispensing chemist' },

					{ label: 'dollar store', value: 'dollar store' },

					{ label: 'drapery', value: 'drapery' },

					{ label: 'drugstore', value: 'drugstore' },

					{ label: 'dry cleaner’s', value: 'dry cleaner’s' },

					{ label: 'duty-free', value: 'duty-free' },

					{ label: 'filling station', value: 'filling station' },

					{ label: 'fish and chip shop', value: 'fish and chip shop' },

					{ label: 'five-and-dime', value: 'five-and-dime' },

					{ label: 'garage', value: 'garage' },

					{ label: 'garden centre', value: 'garden centre' },

					{ label: 'gasbar', value: 'gasbar' },

					{ label: 'gas station', value: 'gas station' },

					{ label: 'general store', value: 'general store' },

					{ label: 'gift shop', value: 'gift shop' },

					{ label: 'haberdashery', value: 'haberdashery' },

					{ label: 'hardware shop', value: 'hardware shop' },

					{ label: 'hole-in-the-wall', value: 'hole-in-the-wall' },

					{ label: 'hypermarket', value: 'hypermarket' },

					{ label: 'ironmonger’s', value: 'ironmonger’s' },

					{ label: 'junk shop', value: 'junk shop' },

					{ label: 'liquor store', value: 'liquor store' },

					{ label: 'megastore', value: 'megastore' },

					{ label: 'minimart', value: 'minimart' },

					{ label: 'multiple', value: 'multiple' },

					{ label: 'newspaper stand', value: 'newspaper stand' },

					{ label: 'newsstand', value: 'newsstand' },

					{ label: 'offie', value: 'offie' },

					{ label: 'off-licence', value: 'off-licence' },

					{ label: 'opportunity shop', value: 'opportunity shop' },

					{ label: 'op shop', value: 'op shop' },

					{ label: 'outfitter', value: 'outfitter' },

					{ label: 'paper shop', value: 'paper shop' },

					{ label: 'patisserie', value: 'patisserie' },

					{ label: 'perfumery', value: 'perfumery' },

					{ label: 'petrol station', value: 'petrol station' },

					{ label: 'pharmacy', value: 'pharmacy' },

					{ label: 'pound shop', value: 'pound shop' },

					{ label: 'saddler', value: 'saddler' },

					{ label: 'saddlery', value: 'saddlery' },

					{ label: 'salon', value: 'salon' },

					{ label: 'sari-sari store', value: 'sari-sari store' },

					{ label: 'service centre', value: 'service centre' },

					{ label: 'service station', value: 'service station' },

					{ label: 'sex shop', value: 'sex shop' },

					{ label: 'stall', value: 'stall' },

					{ label: 'stationer', value: 'stationer' },

					{ label: 'supermarket', value: 'supermarket' },

					{ label: 'superstore', value: 'superstore' },

					{ label: 'sweet shop', value: 'sweet shop' },

					{ label: 'takeaway', value: 'takeaway' },

					{ label: 'thrift shop', value: 'thrift shop' },

					{ label: 'tobacconist', value: 'tobacconist' },

					{ label: 'trading post', value: 'trading post' },

					{ label: 'victualler', value: 'victualler' },
			  ]
			: options === 'simple'
			? [
					{ label: 'Products', value: 'Products' },
					{ label: 'Shops', value: 'Shops' },
			  ]
			: [
					{ label: 'Animals & Pet Supplies', value: 'Animals & Pet Supplies' },
					{ label: 'Apparel & Accessories', value: 'Apparel & Accessories' },
					{ label: 'Arts & Entertainment', value: 'Arts & Entertainment' },
					{ label: 'Baby & Toddler', value: 'Baby & Toddler' },
					{ label: 'Business & Industrial', value: 'Business & Industrial' },
					{ label: 'Cameras & Optics', value: 'Cameras & Optics' },
					{ label: 'Electronics', value: 'Electronics' },
					{ label: 'Furniture', value: 'Furniture' },
					{ label: 'Hardware', value: 'Hardware' },
					{ label: 'Health & Beauty', value: 'Health & Beauty' },
					{ label: 'Home & Garden', value: 'Home & Garden' },
					{ label: 'Media', value: 'Media' },
					{ label: 'Office Supplies', value: 'Office Supplies' },
					{ label: 'Religious & Ceremonial', value: 'Religious & Ceremonial' },
					{ label: 'Software', value: 'Software' },
					{ label: 'Sporting Goods', value: 'Sporting Goods' },
					{ label: 'Toys & Games', value: 'Toys & Games' },
					{ label: 'Vehicles & Parts', value: 'Vehicles & Parts' },
			  ]
	);

	let onItemChange = (e) => {
		setItem(e.value);
		setValue(e.value);
	};

	let itemTemplate = (option) => {
		return <div>{option.value}</div>;
	};

	return (
		<Fragment>
			<Dropdown
				value={value ? value : item}
				options={items}
				onChange={onItemChange}
				itemTemplate={itemTemplate}
				style={{ width: '12em' }}
				filter={filter}
				placeholder={placeholder}
				filterPlaceholder={searchPlaceHolder}
				filterBy="label,value"
				showClear={false}
			/>
		</Fragment>
	);
};
export default InputDropdownComp;
