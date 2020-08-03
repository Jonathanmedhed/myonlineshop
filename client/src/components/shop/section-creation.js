import React, { useState, Fragment } from 'react';

// Components
import Alert from '../alerts/alert';
import CardCarousel from '../partials/card-carousel';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import PrimeSpinner from '../partials/spinner';
import Table from '../partials/table';
import UploadComp from '../partials/file-uploader';

// Functions
import {
	createSection,
	deleteSection,
	editSection,
	createProductSection,
	editProductSection,
	deleteProductSection,
} from '../../actions/requests';

const SectionCreation = ({
	history,
	sectionToEdit,
	setSectionToEdit,
	setSections,
	currentSections,
	toggle,
	setAlert,
	setImg,
	showImg,
	item,
	itemType,
}) => {
	// To show Loading on submitions
	const [submition, setSubmition] = useState(false);
	/** Section Pic */
	const [pic, setPic] = useState(!sectionToEdit ? null : sectionToEdit.img && sectionToEdit.img);
	/** Position Selected */
	const [positionSelected, setPositionSelected] = useState(
		!sectionToEdit ? 1 : sectionToEdit.position && sectionToEdit.position
	);
	/** Operation confirm*/
	const [confirmDelete, setConfirmDelete] = useState(false);
	/** Operation success */
	const [success, setSuccess] = useState(false);
	/** Section Created */
	const [created, setCreated] = useState(false);
	/** Section Deleted */
	const [deleted, setDeleted] = useState(false);
	/** Section Edited */
	const [edited, setEdited] = useState(false);
	/** Type Selection */
	const [selectedType, setSelectedType] = useState('');
	// Updated Items
	const [updatedItems, setUpdatedItems] = useState([]);
	/** Section Types */
	const sections =
		itemType === 'shop'
			? [
					{ img: 'text-img-example.jpg', name: 'Text + Image', value: 'w/img' },
					{ img: 'text-only-example.jpg', name: 'Text Only', value: 'text-only' },
					{ img: 'data-view-example.gif', name: 'Products Search', value: 'data-view' },
					{ img: 'carousel-example.gif', name: 'Products Carousel', value: 'carousel' },
			  ]
			: [
					{ img: 'text-img-example.jpg', name: 'Text + Image', value: 'w/img' },
					{ img: 'text-only-example.jpg', name: 'Text Only', value: 'text-only' },
					{ img: 'carousel-example.gif', name: 'Products Carousel', value: 'carousel' },
			  ];
	/** Form Fields */
	const [formData, setFormData] = useState({
		img: !sectionToEdit ? '' : sectionToEdit.img && sectionToEdit.img,
		title: !sectionToEdit ? '' : sectionToEdit.title && sectionToEdit.title,
		position: !sectionToEdit ? 1 : sectionToEdit.position && sectionToEdit.position,
		text: !sectionToEdit ? '' : sectionToEdit.text && sectionToEdit.text,
		type: !sectionToEdit ? '' : sectionToEdit.type && sectionToEdit.type,
	});

	// Form Values Variables
	const { title, text } = formData;

	// Asign values on change
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Form submition
	const onSubmit = async (id) => {
		// show spinner
		setSubmition(true);
		// Asign uploaded pic to form
		if (pic) {
			formData.img = pic;
		}
		// Asign selected type to form
		if (selectedType) {
			formData.type = selectedType;
		}
		// Asign position selected to form
		if (positionSelected) {
			// +1 in order to overtake the position
			formData.position = positionSelected;
		}
		switch (itemType) {
			// Create section for shop
			case 'shop':
				if (!sectionToEdit) {
					const res = await createSection(formData, id);
					if (res.status === 200) {
						setSuccess(true);
						setCreated(true);
						setAlert('Section Created', 'success');
						// Update sections
						setUpdatedItems(res.data);
					}
				} else {
					// Create section for product
					const res = await editSection(formData, sectionToEdit._id);
					if (res.status === 200) {
						setSuccess(true);
						setEdited(true);
						setAlert('Section Edited', 'success');
						// Update sections
						setUpdatedItems(res.data);
					}
				}
				setSubmition(false);
				break;
			case 'product':
				if (!sectionToEdit) {
					const res = await createProductSection(formData, id);
					if (res.status === 200) {
						setSuccess(true);
						setCreated(true);
						setAlert('Section Created', 'success');
						setUpdatedItems(res.data);
					}
				} else {
					const res = await editProductSection(formData, sectionToEdit._id);
					if (res.status === 200) {
						setSuccess(true);
						setEdited(true);
						setAlert('Section Edited', 'success');
						setUpdatedItems(res.data);
					}
				}
				// hide spinner
				setSubmition(false);
				break;
			default:
				setSubmition(false);
				break;
		}
	};

	// Section deletion
	const onDelete = async () => {
		// Show spinner
		setSubmition(true);
		const res = await deleteSection(sectionToEdit.shop, sectionToEdit._id);
		if (res.status === 200) {
			// update sections
			setUpdatedItems(res.data);
			setSuccess(true);
			setDeleted(true);
			setAlert('Section Deleted', 'success');
		} else {
			setAlert('Deletion Failed', 'error');
		}
		// Hide spinner
		setSubmition(false);
	};

	// Close dialog window
	const onClose = () => {
		toggle(false);
		setSectionToEdit(null);
		setConfirmDelete(false);
	};

	// Apply changes to shop or product
	const applyChanges = (changes) => {
		setSections(changes);
		onClose();
	};

	return (
		<div className="section-creation">
			{/** Loading Spinner */}
			{submition && <PrimeSpinner />}
			<div onClick={() => onClose()} className="exit">
				<i className="fas fa-times-circle"></i>
			</div>
			<h1 className="page-title-fixed">Section Creation</h1>
			<div className="inner">
				{/** Delete button */}
				{sectionToEdit && !confirmDelete && !success && (
					<i onClick={() => setConfirmDelete(true)} class="fas fa-trash-alt"></i>
				)}
				<div className="form">
					{/** Alerts */}
					<Alert />
					{/** Success message and aply changes */}
					{success && (created || deleted || edited) && (
						<Fragment>
							<div className="form-confirm-vert">
								<div className="success-message">
									<i className="fas fa-check-square fa-4x text-success"></i>
									<h1>Section {created ? 'Created' : deleted ? 'Deleted' : edited && 'Edited'}!</h1>
									<div className="buttons-form mt-1">
										<button className="btn btn-primary" onClick={() => applyChanges(updatedItems)}>
											Apply
										</button>
										<button className="btn btn-danger" onClick={() => onClose()}>
											Exit
										</button>
									</div>
								</div>
							</div>
						</Fragment>
					)}
					{/** Delete section dialog */}
					{confirmDelete && !success && (
						<Fragment>
							<div className="form-confirm-vert">
								<div className="success-message">
									<i className="fas fa-exclamation-triangle fa-4x text-caution"></i>
									<h1>Delete Section?</h1>
									<div className="buttons-form mt-1">
										<button className="btn btn-primary" onClick={() => onDelete()}>
											Confirm
										</button>
										<button className="btn btn-danger" onClick={() => setConfirmDelete(false)}>
											Go Back
										</button>
									</div>
								</div>
							</div>
						</Fragment>
					)}
					{/** Section fields */}
					{!confirmDelete && !success && (
						<Fragment>
							{/** Section Title */}
							<div className="form-group">
								<label className="form-text">Title:</label>
								<input
									className="border-primary"
									type="text"
									name="title"
									value={title}
									onChange={(e) => onChange(e)}
								></input>
							</div>
							{/** Section types */}
							<div className="form-group">
								<label className="form-text">Type:</label>
								<CardCarousel
									type="sections"
									items={sections}
									select={setSelectedType}
									value={selectedType}
									//img to show
									setImg={setImg}
									showImg={showImg}
								/>
							</div>
							{/** Section position */}
							<div className="form-group">
								<label className="form-text">Position (Top: 1):</label>
								{/** Show current positions */}
								<InputNumber
									value={positionSelected}
									onChange={(e) => setPositionSelected(e.value)}
									showButtons
									buttonLayout="horizontal"
									spinnerMode="horizontal"
									step={1}
									min={1}
									//
									max={currentSections && currentSections.length + 1}
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
								/>
								{/** Current section positions */}
								{item.sections && item.sections.length > 0 && (
									// Show Positions on Click
									<div className="sections-table">
										<Inplace closable={true}>
											<InplaceDisplay>Show Current Sections</InplaceDisplay>
											<InplaceContent>
												<Table
													data={'positions'}
													// order sections by position
													list={currentSections.sort((a, b) =>
														a.position > b.position ? 1 : -1
													)}
													headers={['Position', 'Title']}
													wOptions={false}
													wSearch={false}
												/>
											</InplaceContent>
										</Inplace>
									</div>
								)}
							</div>
							{/** Text Area for text */}
							{selectedType && (selectedType === 'text-only' || selectedType === 'w/img') && (
								<div className="form-group">
									<label className="form-text">Text:</label>
									<InputTextarea
										autoResize={true}
										name="text"
										value={text}
										onChange={(e) => onChange(e)}
										rows={5}
										cols={30}
									></InputTextarea>
								</div>
							)}
							{/** Upload button for img */}
							{selectedType && selectedType === 'w/img' && (
								<div className="form-group">
									<label className="form-text">Image:</label>
									{pic && (
										<div className="horizontal align-items-center">
											<i class="fas fa-check-circle color-success"></i> <div className='ml-half'>Pic selected</div>
										</div>
									)}
									<UploadComp
										multiple={false}
										auto={false}
										setImg={setPic}
										setAlert={setAlert}
										type={'section-img'}
									/>
									<Alert />
								</div>
							)}
							{/** Submit & Cancel buttons */}
							<div className="form-group-buttons">
								<div className="form-group">
									<div onClick={() => onSubmit(item._id)} className="btn btn-primary">
										Proceed
									</div>
									<div onClick={() => onClose()} className="btn btn-danger ml-1">
										Cancel
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

export default SectionCreation;
