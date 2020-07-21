import React, { Fragment } from 'react';
import { Rating } from 'primereact/rating';
import { calculateRating, activeItems, getAmount } from '../../actions/utilities';

const UserData = ({ user, isOwner, shops, products, feedback, noFeedback }) => {
	return (
		<Fragment>
			<div className="user-card">
				{/** Dont show feedback on mobile */}
				{!noFeedback && (
					<div className="data">
						<div className="bold">Feedback:</div>
						<div className="f-2">
							<Rating value={calculateRating(feedback)} readonly={true} stars={5} cancel={false} />
						</div>
					</div>
				)}
				{/** Active products count */}
				<div className="data">
					<div className="bold">{isOwner ? 'Active Shops' : 'Shops'} </div>
					<div>{activeItems(shops, true)}</div>
				</div>
				{/** If not owner, show items on sale, sold and purchased */}
				{!isOwner ? (
					<Fragment>
						<div className="data">
							<div className="bold">Items on Sale:</div>
							<div>{activeItems(products, true)}</div>
						</div>
						<div className="data">
							<div className="bold">Items Sold:</div>
							<div>{getAmount(user, 'products_sold')}</div>
						</div>
						<div className="data">
							<div className="bold">Items Purchased:</div>
							<div>{getAmount(user, 'products_bought')}</div>
						</div>
					</Fragment>
				) : (
					<Fragment>
						{/** If owner, show inactive shops, active/inactive products */}
						<div className="data">
							<div className="bold">Inactive Shops:</div>
							<div>{activeItems(shops, false)}</div>
						</div>
						<div className="data">
							<div className="bold">Active Products:</div>
							<div>{activeItems(products, true)}</div>
						</div>
						<div className="data">
							<div className="bold">Inactive Products:</div>
							<div>{activeItems(products, false)}</div>
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default UserData;
