import React, { Fragment } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const PrimeSpinner = () => {
	return (
		<Fragment>
			<div className="spinner">
				<ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="8" animationDuration="1s" />
			</div>
		</Fragment>
	);
};
export default PrimeSpinner;
