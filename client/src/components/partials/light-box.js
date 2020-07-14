import React, { Fragment } from 'react';

const LightBox = ({ img, toggle }) => {
	return (
		<Fragment>
			<div className="light-box">
				<div className="inner">
					<i onClick={() => toggle(false)} class="far fa-times-circle"></i>
					<img src={require('../../img/' + img)} alt=''></img>
				</div>
			</div>
		</Fragment>
	);
};
export default LightBox;
