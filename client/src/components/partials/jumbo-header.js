import React, { Fragment } from 'react';
import List from '../navbar/_menu-list';

const JumboHeader = ({ item, setOption, bodyRef, view }) => {
	return (
		<Fragment>
			<div className="jumbo-header">
				<div className="title">
					<img className="small-icon" src={require('../../img/logo2.png')} alt=""></img>
					<h1>
						<a href="index.html">{item.name ? item.name : item.shop.name}</a>
					</h1>
				</div>
				<List setOption={setOption} bodyRef={bodyRef} jumbo={true} view={view} item={item} />
			</div>
		</Fragment>
	);
};
export default JumboHeader;
