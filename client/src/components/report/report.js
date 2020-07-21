import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

/** Functions */
import {
	reportFeedbackUser,
	reportFeedbackShop,
	reportFeedbackProduct,
	reportProductRequest,
} from '../../actions/requests';
/** Partials */
import Alert from '../alerts/alert';
import TextArea from '../partials/text-area';
import { RadioButton } from 'primereact/radiobutton';

const Report = ({ feedback, setAlert, setCurrentFeedback, setFeedback, shop, user, close, product, reportProduct }) => {
	// Form content
	let [formData, setFormData] = useState({
		comment: '',
	});

	// Reason for report
	const [reason, setReason] = useState(null);

	// Submition success
	const [success, setSuccess] = useState(null);

	// Form Values Variables
	let { comment } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Reply to feedback
	const onReport = async () => {
		formData.reason = reason;
		// User feedback
		if (user) {
			const reportRequest = await reportFeedbackUser(formData, user._id, feedback._id);
			if (reportRequest.status === 200) {
				// update user feedback
				setFeedback(reportRequest.data.userFeedback);
				// Update current feedback
				setCurrentFeedback(reportRequest.data.feedback);
				setAlert('Feedback Reported!', 'success');
				setSuccess(true);
			} else {
				setAlert('Reporting failed!', 'error');
			}
			// Shop Feedback
		} else if (shop) {
			const reportRequest = await reportFeedbackShop(formData, shop._id, feedback._id);
			if (reportRequest.status === 200) {
				// Update shop feedback
				setFeedback(reportRequest.data.shopFeedback);
				// Update current feedback
				setCurrentFeedback(reportRequest.data.feedback);
				setAlert('Feedback Reported!', 'success');
				setSuccess(true);
			} else {
				setAlert('Reporting failed!', 'error');
			}
			// Product Feedback
		} else if (product && !reportProduct) {
			const reportSubmit = await reportFeedbackProduct(formData, product._id, feedback._id);
			if (reportSubmit.status === 200) {
				// Update product feedback
				setFeedback(reportSubmit.data.productFeedback);
				// Update current feedback
				setCurrentFeedback(reportSubmit.data.feedback);
				setAlert('Feedback Reported!', 'success');
				setSuccess(true);
			} else {
				setAlert('Reporting failed!', 'error');
			}
			// Report product
		} else if (product && reportProduct) {
			const reportSubmit = await reportProductRequest(formData, product._id);
			if (reportSubmit.status === 200) {
				setAlert('Product Reported!', 'success');
				setSuccess(true);
			} else {
				setAlert('Reporting failed!', 'error');
			}
		}
	};

	return (
		<Fragment>
			<div className="responses">
				<div className="review-section">
					{!success ? (
						<Fragment>
							<div className="vertical my-half">
								{/** Report feedback reasons */}
								{(product || shop || user) && !reportProduct && (
									<Fragment>
										<div className="horizontal">
											<RadioButton
												inputId="rb1"
												name="reason"
												value="Inappropriate language"
												onChange={(e) => setReason(e.value)}
												checked={reason === 'Inappropriate language'}
											/>
											<div className="ml-1">Inappropriate language</div>
										</div>
										<div className="horizontal">
											<RadioButton
												inputId="rb1"
												name="reason"
												value="False statement"
												onChange={(e) => setReason(e.value)}
												checked={reason === 'False statement'}
											/>
											<div className="ml-1">False statement</div>
										</div>
										<div className="horizontal">
											<RadioButton
												inputId="rb1"
												name="reason"
												value="Spam"
												onChange={(e) => setReason(e.value)}
												checked={reason === 'Spam'}
											/>
											<div className="ml-1">Spam</div>
										</div>
										<div className="horizontal">
											<RadioButton
												inputId="rb1"
												name="reason"
												value="Other"
												onChange={(e) => setReason(e.value)}
												checked={reason === 'Other'}
											/>
											<div className="ml-1">Other</div>
										</div>
									</Fragment>
								)}
								{/** Report product reasons */}
								{product && reportProduct && (
									<div className="px-2">
										<div className="horizontal">
											<RadioButton
												inputId="rb1"
												name="reason"
												value="Inappropriate"
												onChange={(e) => setReason(e.value)}
												checked={reason === 'Inappropriate'}
											/>
											<div className="ml-1">Inappropriate</div>
										</div>
										<div className="horizontal">
											<RadioButton
												inputId="rb1"
												name="reason"
												value="Illegal"
												onChange={(e) => setReason(e.value)}
												checked={reason === 'Illegal'}
											/>
											<div className="ml-1">Illegal</div>
										</div>
										<div className="horizontal">
											<RadioButton
												inputId="rb1"
												name="reason"
												value="Spam"
												onChange={(e) => setReason(e.value)}
												checked={reason === 'Spam'}
											/>
											<div className="ml-1">Spam</div>
										</div>
										<div className="horizontal">
											<RadioButton
												inputId="rb1"
												name="reason"
												value="Other"
												onChange={(e) => setReason(e.value)}
												checked={reason === 'Other'}
											/>
											<div className="ml-1">Other</div>
										</div>
									</div>
								)}
							</div>
							<Alert />
							{/** Comment for report */}
							{(reason === 'Other' || reason === 'False statement') && (
								<TextArea name="comment" value={comment} setValue={onChange} />
							)}
							{/** Submit button */}
							<button onClick={() => onReport()} className="btn btn-primary my-1">
								Report
							</button>
						</Fragment>
					) : (
						<div className="success-message">
							{/** Success Message */}
							<i class="fas fa-check-circle fa-5x text-success"></i>
							<h1>Feedback Reported!</h1>
							<div className="message mb-half">
								Our team will analyze the evidence and get back to you with the response in the next few
								hours.
							</div>
							<div onClick={() => close(false)} className="btn btn-primary mb-half">
								close
							</div>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
};

Report.propTypes = {
	history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	history: state.history,
});

export default withRouter(Report);
