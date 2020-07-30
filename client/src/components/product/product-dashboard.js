import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
/** Functions */
import {
	deleteShopProduct,
	getCurrentUser,
	getProduct,
	getProductSections,
	rateProduct,
	visitProductAuth,
	visitProduct,
	soldOutProduct,
} from '../../actions/requests';
import { setAlert } from '../../actions/alerts';
/**  Components */
import Alert from '../alerts/alert';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import FeedbackComp from '../feedback/feedback';
import { InputSwitch } from 'primereact/inputswitch';
import { Rating } from 'primereact/rating';
import { TabView, TabPanel } from 'primereact/tabview';
/** Partials */
import ChartComp from '../partials/chart';
import DataViewComp from '../partials/data-view';
import InfoSection from '../shop/info-section';
import ItemEdition from '../partials/item-edition';
import Report from '../report/report';
import TextArea from '../partials/text-area';
import PrimeSpinner from '../partials/spinner';
import ProductCard from './_product-card';
import ProductData from './_product-data';
import SectionCreation from '../shop/section-creation';

const ProductDashboard = ({
	backButton,
	hideProduct,
	history,
	match,
	setAlert,
	productObject,
	isOwner,
	setIsOwner,
	cartContent,
	setCartContent,
	setItemAdded,
	goBack,
	transactionInfo,
	shop,
	isAuthenticated,
	products,
	toggleRegister,
	toggleLogin,
	setProducts,
	setSubmition,
	setCurrentProduct,
}) => {
	// show report product
	const [showReportProduct, setShowReportProduct] = useState(false);
	// show report feedback
	const [showReportFeedback, setShowReportFeedback] = useState(false);
	// show reply feedback
	const [showFeedback, setShowFeedback] = useState(false);
	const [currentFeedback, setCurrentFeedback] = useState(null);
	// Show delete product dialog
	const [showDeleteProduct, setShowDeleteProduct] = useState(false);
	//Chart
	const [productChartOption, setProductChartOption] = useState('Sold Items');
	// Purchase Quantity
	const [purchaseQty, setPurchaseQty] = useState(1);
	// Current user viewing the product
	const [currentUser, setCurrentUser] = useState(null);
	// Product
	const [product, setProduct] = useState(null);
	// Feedback
	const [feedback, setFeedback] = useState([]);
	// Sections
	const [sections, setSections] = useState([]);
	const [checked1, setChecked1] = useState(false);
	// Tabs
	const [activeIndex, setActiveIndex] = useState();
	//Review
	const [reviewText, setReviewText] = useState('Enter text here');
	// Section Creation Dialog
	const [sectionCreation, setSectionCreation] = useState(false);
	// Section Edit
	const [editSection, setEditSection] = useState(false);
	const [sectionToEdit, setSectionToEdit] = useState(null);
	// Change Shop Values States
	const [edit, setEdit] = useState(false);
	const [editField, setEditField] = useState(null);
	// Lightbox
	const [imgToShow, setImgToShow] = useState('');
	const [showLightBox, setShowLightBox] = useState(false);
	// Other Products
	const [otherProducts, setOtherProducts] = useState([]);

	// Edit product field
	const selectEdit = (field) => {
		setEditField(field);
		setEdit(true);
	};

	// Show add section dialog
	const showSectionDialog = (option) => {
		setSectionCreation(option);
		setEditSection(option);
	};
	// Feedback input data
	const [formData, setFormData] = useState({
		comment: '',
		stars: 5,
	});

	// Form Values Variables
	const { comment, stars } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Give feedback to product and update state
	const onRate = async () => {
		const feedBackGiven = await rateProduct(formData, product._id);
		if (feedBackGiven.status === 200) {
			setFeedback(feedBackGiven.data);
			setAlert('Feedback Given!', 'success');
		} else {
			setAlert('Feedback Failed', 'error');
		}
	};

	// Delete a product and update state
	const onDeleteProduct = async () => {
		setSubmition(true);
		const productToDelete = await deleteShopProduct(product._id);
		if (productToDelete.status === 200) {
			setAlert('Product Deleted');
			setProducts(productToDelete.data);
			setShowDeleteProduct(false);
			goBack();
		}
		setSubmition(false);
	};

	// Select feedback to replay to
	const selectFeedback = (feedback) => {
		setCurrentFeedback(feedback);
		setShowFeedback(true);
	};

	// Report a feedback
	const selectReportFeedback = (feedback) => {
		setCurrentFeedback(feedback);
		setShowReportFeedback(true);
	};

	// Close reply to and report feedback
	const hideFeedbackDialog = () => {
		setShowFeedback(false);
		setShowReportFeedback(false);
		setShowReportProduct(false);
	};

	useEffect(() => {
		if (productObject) {
			// Get Feedback
			setFeedback(productObject.feedback);
			// Get Sections
			setSections(productObject.sections);
			// Set Other products Suggestion
			setOtherProducts(products && products);
			setProduct(productObject);
			// Update Visit Count
			if (isOwner) {
				visitProductAuth(productObject._id);
			} else {
				visitProduct(productObject._id);
			}
		} else {
			const fetchData = async () => {
				const result = await getProduct(match.params.id);
				let productObject = result.data;
				// Get Feedback
				setFeedback(result.data.feedback);
				// Get Sections
				const productSections = await getProductSections(match.params.id);
				setSections(productSections.data);
				// Get Current User
				const user = await getCurrentUser();
				setCurrentUser(user.data);
				//Set isOwner view if user is owner
				if (productObject.user === user.data._id) {
					setIsOwner(false);
				}
				setProduct(productObject);
				// Update Visit Count
				if (user) {
					visitProductAuth(match.params.id);
				} else {
					visitProduct(match.params.id);
				}
			};
			fetchData();
		}
	}, [match.params.id]);

	return (
		<Fragment>
			{product === null ? (
				<PrimeSpinner />
			) : (
				<div>
					{/**
					 * Feedback Dialog
					 */}
					<Dialog
						header={showFeedback ? 'Feedback' : 'Report'}
						visible={showFeedback || showReportFeedback || showReportProduct}
						onHide={() => hideFeedbackDialog()}
					>
						{/** Feedback component */}
						{showFeedback && (
							<FeedbackComp
								product={product}
								setCurrentFeedback={setCurrentFeedback}
								setFeedback={setFeedback}
								feedback={currentFeedback}
								setAlert={setAlert}
							/>
						)}
						{/** Report component (feedback) */}
						{showReportFeedback && (
							<Report
								product={product}
								setCurrentFeedback={setCurrentFeedback}
								setFeedback={setFeedback}
								feedback={currentFeedback}
								setAlert={setAlert}
								close={setShowReportFeedback}
							/>
						)}
						{/** Report component (product) */}
						{showReportProduct && (
							<Report
								product={product}
								reportProduct={true}
								setCurrentFeedback={setCurrentFeedback}
								setFeedback={setFeedback}
								feedback={currentFeedback}
								setAlert={setAlert}
								close={setShowReportProduct}
							/>
						)}
					</Dialog>
					{/** Delete Product Dialog */}
					<Dialog
						header={showDeleteProduct && 'Deletion'}
						visible={showDeleteProduct}
						onHide={() => setShowDeleteProduct(false)}
					>
						<div className="message-button-sm">
							<div className="message">{'Delete ' + product.name + '?'}</div>
							<div className="options">
								<button onClick={() => onDeleteProduct()} className="btn btn-success">
									Yes
								</button>
								<button onClick={() => setShowDeleteProduct(false)} className="btn btn-danger">
									No
								</button>
							</div>
						</div>
					</Dialog>
					{/** Edit Product */}
					{edit === true && (
						<ItemEdition
							field={editField}
							item={product}
							setItem={setProduct}
							itemType={'product'}
							setAlert={setAlert}
							toggle={setEdit}
							setProducts={setProducts}
						/>
					)}
					{/** Section Creation */}
					{(sectionCreation === true || editSection === true) && (
						<SectionCreation
							history={history}
							toggle={showSectionDialog}
							setAlert={setAlert}
							item={product}
							itemType={'product'}
							setImg={setImgToShow}
							showImg={setShowLightBox}
							sectionToEdit={sectionToEdit}
							setSectionToEdit={setSectionToEdit}
							setSections={setSections}
							currentSections={sections}
						/>
					)}
					<div className="dashboard">
						{/** Go Back Button */}
						{backButton && (
							<div className="btn btn-danger m-auto" onClick={() => goBack(null)}>
								Back
							</div>
						)}
						<Fragment>
							{/** Top */}
							<div className="top-section">
								<div className="vertical">
									<Alert />
								</div>
								<div className="sub-page-header">
									{/** Top Left */}
									<ProductCard
										product={product}
										isOwner={isOwner}
										setAlert={setAlert}
										setProduct={setProduct}
									/>
									{/** Top Right */}
									<ProductData
										product={product}
										feedback={feedback}
										isOwner={isOwner}
										setAlert={setAlert}
										setProduct={setProduct}
										purchaseQty={purchaseQty}
										setPurchaseQty={setPurchaseQty}
										setCartContent={setCartContent}
										cartContent={cartContent}
										setItemAdded={setItemAdded}
										isAuthenticated={isAuthenticated}
										toggleRegister={toggleRegister}
										toggleLogin={toggleLogin}
										setProducts={setProducts}
										soldOutProduct={soldOutProduct}
										hideProduct={hideProduct}
										setShowReportProduct={setShowReportProduct}
									/>
								</div>
							</div>
							{/** Product sections for visitor */}
							{!isOwner && (
								<div>
									{sections &&
										sections.length > 0 &&
										sections
											.sort((a, b) => (a.position > b.position ? 1 : -1))
											.map((section) => (
												<InfoSection
													isOwner={isOwner}
													items={otherProducts}
													itemsType={'products'}
													reverse={false}
													section={section}
													setAlert={setAlert}
													setSectionToEdit={setSectionToEdit}
													setSections={setSections}
													setEdit={setEditSection}
													setCurrentProduct={setCurrentProduct}
												/>
											))}
								</div>
							)}
						</Fragment>
						{isOwner ? (
							<Fragment>
								{/** Tags and Type and their edit buttons*/}
								<table className="tags-type">
									<tr className="inner">
										<th className="title">Tags</th>
										<td className="cell">
											<div className="tags">
												{product.tags &&
													product.tags.map((tag) => <div className="tag">{tag}</div>)}
											</div>
										</td>
										<td className="cell">
											<div onClick={() => selectEdit('Tags')} className="btn btn-danger">
												Edit
											</div>
										</td>
									</tr>
									<tr className="inner">
										<th className="title">Type</th>
										<td className="cell">
											<div className="type-container">
												<div className="type">{product.type}</div>
											</div>
										</td>
										<td className="cell">
											<div onClick={() => selectEdit('Type')} className="btn btn-danger">
												Edit
											</div>
										</td>
									</tr>
								</table>
								{/** Accordion for Owner*/}
								<Accordion>
									{/** Product page content */}
									<AccordionTab header="Page Content">
										<button onClick={() => setSectionCreation(true)} className="btn btn-primary">
											Add Section
										</button>
										<Fragment>
											{sections &&
												sections.length > 0 &&
												sections
													.sort((a, b) => (a.position > b.position ? 1 : -1))
													.map((section) => (
														<InfoSection
															isOwner={isOwner}
															items={otherProducts}
															itemsType={'products'}
															reverse={false}
															section={section}
															setAlert={setAlert}
															setSectionToEdit={setSectionToEdit}
															setSections={setSections}
															setEdit={setEditSection}
															setCurrentProduct={setCurrentProduct}
														/>
													))}
										</Fragment>
									</AccordionTab>
									{/**
									 * Statistics
									 * */}
									<AccordionTab header="Statistics">
										<div>
											<TabView
												activeIndex={activeIndex}
												onTabChange={(e) => setActiveIndex(e.index)}
											>
												<TabPanel header="Product Data" leftIcon="fas fa-shopping-basket">
													<div className="chart-search">
														<div className="vertical">
															{/** Chart Options */}
															<div className="buttons-form-free mb-1">
																<button
																	onClick={() => setProductChartOption('Sold Items')}
																	className={
																		productChartOption === 'Sold Items'
																			? 'btn btn-dark'
																			: 'btn btn-primary'
																	}
																>
																	Sold Items
																</button>
																<button
																	onClick={() => setProductChartOption('Visits')}
																	className={
																		productChartOption === 'Visits'
																			? 'btn btn-dark'
																			: 'btn btn-primary'
																	}
																>
																	Visits
																</button>
															</div>
															{/** Chart */}
															<ChartComp
																data={
																	productChartOption === 'Sold Items'
																		? transactionInfo
																		: productObject.visits
																}
																onlychart={true}
																type={
																	productChartOption === 'Sold Items'
																		? 'products-sold'
																		: 'product-visits'
																}
																title={productChartOption}
															/>
														</div>
													</div>
												</TabPanel>
											</TabView>
										</div>
									</AccordionTab>
									{/**
									 * Feedback
									 */}
									<AccordionTab header="Feedback">
										{/**Review List */}
										<div className="accord-list">
											{/**Review card */}
											<div className="accord-list">
												<div className="review-section">
													{feedback && feedback.length > 0 ? (
														<DataViewComp
															items={feedback}
															type="feedback"
															selectFeedback={selectFeedback}
															selectReportFeedback={selectReportFeedback}
														/>
													) : (
														<h1>Haven't received feedback yet!</h1>
													)}
												</div>
											</div>
										</div>
									</AccordionTab>
									{/**
									 * Settings
									 */}
									<AccordionTab header="Settings">
										<div className="big-items">
											{/**
											<div className="big-item">
												<div className="bold">Do something:</div>
												<InputSwitch
													checked={checked1}
													onChange={(e) => setChecked1(e.value)}
												/>
											</div>
											 */}
											<div className="big-item mt-1">
												<div className="bold">Delete Account:</div>
												<button
													onClick={() => setShowDeleteProduct(true)}
													className="btn btn-danger"
												>
													Delete
												</button>
											</div>
										</div>
									</AccordionTab>
								</Accordion>
							</Fragment>
						) : (
							<Accordion>
								{/**
								 * Accordion for visitor
								 */}
								<AccordionTab header="Product Feedback">
									<div className="accord-list">
										{/** Textbox for new feedback */}
										{!isOwner && isAuthenticated && (
											<div className="product-review-section">
												<Rating
													name="stars"
													value={stars}
													readonly={false}
													onChange={(e) => onChange(e)}
													stars={5}
													cancel={5}
												/>
												<TextArea name="comment" value={comment} setValue={onChange} />
												<Alert />
												<button onClick={() => onRate()} className="btn btn-primary my-1">
													Leave Review
												</button>
											</div>
										)}
										{/**Review card */}
										<div className="review-section">
											{!isAuthenticated && (
												<div className="mb-1">
													{/**
													 * Login and register options
													 */}
													<div className="review-login-sug">
														<div onClick={() => toggleLogin(true)} className="solid">
															Login
														</div>{' '}
														or{' '}
														<div onClick={() => toggleRegister(true)} className="solid">
															register
														</div>{' '}
														to leave feedback
													</div>
												</div>
											)}
											{/** Feedback list */}
											{feedback && feedback.length > 0 ? (
												<DataViewComp
													items={feedback}
													type="feedback"
													selectFeedback={selectFeedback}
													selectReportFeedback={selectReportFeedback}
												/>
											) : (
												<h1>Haven't received feedback yet!</h1>
											)}
										</div>
									</div>
								</AccordionTab>
							</Accordion>
						)}
					</div>
				</div>
			)}
		</Fragment>
	);
};

ProductDashboard.propTypes = {
	history: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	history: state.history,
});

export default connect(mapStateToProps, { setAlert })(withRouter(ProductDashboard));
