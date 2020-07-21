import React, { Fragment, useState } from 'react';
import { Chips } from 'primereact/chips';

const InputChips = ({ setItems, name, value }) => {
	// Array of values
	const [values, setValues] = useState(value ? value : []);

	// Chip Template
	let customChip = (item) => {
		return <div>{item}</div>;
	};

	// Add new chip
	const select = (e) => {
		// Check if tags already contains tag
		let contains = false;
		values.forEach((value) => {
			if (value === e.value[e.value.length - 1]) {
				contains = true;
				console.log('Found');
			}
		});
		// Add to list
		if (contains === false) {
			setItems(e.value);
			setValues(e.value);
		}
	};

	return (
		<Fragment>
			<Chips
				name={name}
				value={value ? value : values}
				onChange={(e) => select(e)}
				itemTemplate={customChip}
			></Chips>
		</Fragment>
	);
};
export default InputChips;
