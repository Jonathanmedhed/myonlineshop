import React, { Fragment, useState } from 'react';
import { ListBox } from 'primereact/listbox';

const ListBoxIMG = ({ items, item, itemType, setItem }) => {
	// item template
	let itemTemplate = (option) => {
		return (
			<div className="list-item-img">
				{itemType === 'shop' || itemType === 'product' ? (
					<Fragment>
						{itemType === 'shop' && (
							<img
								alt={option.name}
								src={
									option.pic_logo
										? require('../../../../public/uploads/' + option.pic_logo)
										: require('../../img/logo2.png')
								}
							/>
						)}
						{itemType === 'product' && (
							<img
								alt={option.name}
								src={
									option.pics && option.pics.length > 0
										? require('../../../../public/uploads/' + option.pics[0])
										: require('../../img/default-product.png')
								}
							/>
						)}
						<span>{option.name}</span>
					</Fragment>
				) : (
					<Fragment></Fragment>
				)}
			</div>
		);
	};

	return (
		<Fragment>
			<div>
				<ListBox
					value={item}
					filter={true}
					filterBy={'name'}
					options={items}
					onChange={(e) => setItem(e.value)}
					itemTemplate={itemTemplate}
					style={{ width: '15em' }}
					listStyle={{ maxHeight: '250px' }}
				/>
			</div>
		</Fragment>
	);
};
export default ListBoxIMG;
