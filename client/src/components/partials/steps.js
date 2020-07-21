import React, { Fragment, useState } from 'react';
import { Steps } from 'primereact/steps';

const StepsComp = ({ steps, step }) => {
	return (
		<Fragment>
			<div>
				<div>
					<Steps model={steps} activeIndex={step} />
				</div>
			</div>
		</Fragment>
	);
};
export default StepsComp;
