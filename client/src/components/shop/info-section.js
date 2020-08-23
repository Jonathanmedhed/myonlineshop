import React, { Fragment, useState } from 'react';

// Components
import CardCarousel from '../partials/card-carousel';
import DataViewComp from '../partials/data-view';
import DialogPrime from '../partials/dialog';
import PrimeSpinner from '../partials/spinner';

const InfoSection = ({
	isOwner,
	items,
	itemsType,
	moveSection,
	reverse,
	section,
	setAlert,
	setEdit,
	setSections,
	setSectionToEdit,
	setCurrentProduct,
	productSectionRef,
	deleteSection,
	swapImgSection,
}) => {
	// To show Loading on submitions
	const [submition, setSubmition] = useState(false);
	// Remove State
	const [remove, setRemove] = useState(false);
	// Show Dialog
	const [showDialog, setShowDialog] = useState(false);
	// On delete, show dialog
	const onDelete = () => {
		setShowDialog(true);
	};

	// Set edit to true and set section to edit
	const select = () => {
		setSubmition(true);
		setEdit(true);
		setSectionToEdit(section);
		setSubmition(false);
	};
	return (
		<Fragment>
			{/** Loading on submitions */}
			{submition && <PrimeSpinner />}
			{/** Delete Section Dialog */}
			{showDialog && (
				<DialogPrime
					deleteSection={deleteSection}
					section={section}
					setAlert={setAlert}
					toggle={setShowDialog}
					setSections={setSections}
				/>
			)}
			<h1 className="page-title mt-1"> {section.title} </h1>
			<div className="info-section">
				{/** Section with image and text */}
				{section.type === 'w/img' && (
					<div className={section.reverse === true ? 'info-section-rev' : 'info-section-reg'}>
						{/** Text */}
						<h1 className={section.reverse === true ? 'info-message-big' : 'info-message-big'}>
							{section.text}
						</h1>
						{/** Swap positions button */}
						{isOwner && (
							<i
								onClick={() => {
									swapImgSection(section._id);
								}}
								className="fas fa-exchange-alt"
							></i>
						)}
						{/** Img */}
						<div className={section.reverse === true ? 'info-extra' : 'info-extra'}>
							<img
								className="info-img"
								src={section.img ? section.img : require('../../img/galaxy1.jpg')}
								alt=""
							></img>
						</div>
					</div>
				)}
				{/** Section with text only */}
				{section.type === 'text-only' && (
					<div className="info-section-only">
						<h1 className="info-message">{section.text}</h1>
					</div>
				)}
				{/** Section with product list */}
				{section.type === 'data-view' && (
					<Fragment>
						<div ref={productSectionRef}>
							{items.length > 0 ? (
								<DataViewComp
									items={items}
									type={itemsType}
									setCurrentProduct={setCurrentProduct}
									isOwner={isOwner}
								/>
							) : (
								<h1>No products found</h1>
							)}
						</div>
					</Fragment>
				)}
				{/** Section with product carousel */}
				{section.type === 'carousel' && (
					<Fragment>
						<CardCarousel
							items={items}
							type={itemsType}
							subType={'product-carousel'}
							setCurrentProduct={setCurrentProduct}
						/>
					</Fragment>
				)}
				{/** Buttons to change section position */}
				{isOwner && (
					<div className="move-options">
						<i onClick={() => moveSection({ direction: 'up' }, section._id)} className="fas fa-sort-up"></i>
						{!remove && (section.type === 'text-only' || section.type === 'w/img') && (
							<i onClick={() => select()} className="fas fa-cog"></i>
						)}
						{!remove && (section.type === 'data-view' || section.type === 'carousel') && (
							<i onClick={() => setRemove(true)} className="fas fa-cog"></i>
						)}
						{remove && <i onClick={() => onDelete()} className="fas fa-trash-alt"></i>}
						<i
							onClick={() => moveSection({ direction: 'down' }, section._id)}
							className="fas fa-sort-down"
						></i>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default InfoSection;
