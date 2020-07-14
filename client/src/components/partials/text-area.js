import React, { Fragment } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

const TextArea = ({ name, value, setValue }) => {
	return (
		<Fragment>
			<InputTextarea
				name={name}
				value={value}
				onChange={(e) => setValue(e)}
				rows={5}
				cols={30}
				autoResize={true}
			></InputTextarea>
		</Fragment>
	);
};
export default TextArea;
