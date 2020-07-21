import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

/** Functions */
import { replayFeedbackUser, replayFeedbackShop, replayFeedbackProduct } from '../../actions/requests';
/** Partials */
import Alert from '../alerts/alert';
import DataViewComp from '../partials/data-view';
import { Rating } from 'primereact/rating';
import TextArea from '../partials/text-area';

const FeedbackComp = ({ feedback, setAlert, setCurrentFeedback, setFeedback, user, shop, product }) => {
	const [formData, setFormData] = useState({
		comment: '',
	});

	// Form Values Variables
	let { comment } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Reply to feedback
	const onReply = async () => {
		if (user) {
			const replayGiven = await replayFeedbackUser(formData, user._id, feedback._id);
			if (replayGiven.status === 200) {
				//update user feedback
				setFeedback(replayGiven.data.userFeedback);
				// update feedback that is being replied to
				setCurrentFeedback(replayGiven.data.feedback);
				setAlert('Reply posted!', 'success');
			} else {
				setAlert('Reply failed!', 'error');
			}
		} else if (shop) {
			const replayGiven = await replayFeedbackShop(formData, shop._id, feedback._id);
			if (replayGiven.status === 200) {
				//update shop feedback
				setFeedback(replayGiven.data.shopFeedback);
				// update feedback that is being replied to
				setCurrentFeedback(replayGiven.data.feedback);
				setAlert('Reply posted!', 'success');
			} else {
				setAlert('Reply failed!', 'error');
			}
		} else if (product) {
			const replayGiven = await replayFeedbackProduct(formData, product._id, feedback._id);
			if (replayGiven.status === 200) {
				//update product feedback
				setFeedback(replayGiven.data.productFeedback);
				// update feedback that is being replied to
				setCurrentFeedback(replayGiven.data.feedback);
				setAlert('Reply posted!', 'success');
			} else {
				setAlert('Reply failed!', 'error');
			}
		}
	};

	return (
		<Fragment>
			{/** Feedback view */}
			<div className="card-item">
				<div className="card-review p-1">
					<div className="card-user-info">
						<Link to={`/user/${feedback.user}`}>
							<img
								src={
									feedback.user_pic
										? require('../../../../public/uploads/' + feedback.user_pic)
										: require('../../img/default-profile.png')
								}
								alt="user-img"
								className="hover-point"
							></img>
						</Link>
						<div className="review-section-card">
							<Link to={`/user/${feedback.user}`}>
								<h3 className="hover-point">{feedback.user_name}</h3>
							</Link>
							<div className="product-review-section-disabled-sm">
								{<Rating value={feedback.stars} readonly={true} stars={5} cancel={false} />}
							</div>
						</div>
					</div>
					<div className="vertical just-items-center">
						<div className="card-item-inner">
							<div className="vertical just-items-center">
								<div className="message">"{feedback.comment}"</div>
							</div>
							<div className="review-buttons">
								<i class="fas fa-exclamation-circle"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/** Responses */}
			<div className="responses">
				{/**
				 Text box for response
				 */}
				<div className="review-section">
					<Alert />
					<TextArea name="comment" value={comment} setValue={onChange} />
					<button onClick={() => onReply()} className="btn btn-primary my-1">
						Reply
					</button>
				</div>
				{/** Response list */}
				{feedback.responses && feedback.responses.length > 0 ? (
					<DataViewComp
						items={feedback.responses.sort((a, b) => (a.date < b.date ? 1 : -1))}
						type="response"
					/>
				) : (
					<h1 className="m-auto">No replies</h1>
				)}
			</div>
		</Fragment>
	);
};

FeedbackComp.propTypes = {
	history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	history: state.history,
});

export default withRouter(FeedbackComp);
