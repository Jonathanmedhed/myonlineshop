import React, { Fragment, useState } from 'react';

// Components
import CardCarousel from '../partials/card-carousel';
import UploadComp from '../partials/file-uploader';
// Functions
import { editProduct } from '../../actions/requests';

const ProductCard = ({ product, isOwner, setAlert, setProduct }) => {
	let [formData, setFormData] = useState({
		pics: product.pics ? product.pics : [],
	});

	// Form submition
	const onSubmit = async (pic) => {
		formData.pics.push(pic);
		const res = await editProduct(formData, product._id);
		if (res.status === 200) {
			setAlert('Image Added', 'success');
			setProduct(res.data);
		}
		return res;
	};

	return (
		<Fragment>
			<div className="user-card">
				{product.pics && product.pics.length > 0 ? (
					<div className="relative">
						{/**
						 * Product images
						 */}
						<CardCarousel items={product.pics} type="img" />
						{/** Show product sold out ifqty <= 0 */}
						{!product.active && <div className="sold-out">Sold Out</div>}
					</div>
				) : (
					<div className="relative">
						{/**
						 * Product default image
						 */}
						<img className="carousel-img" src={require('../../img/default-product.png')} alt=""></img>
						{!product.active && <div className="sold-out">Sold Out</div>}
					</div>
				)}
				{/** Show upload button to owner */}
				{isOwner && (
					<div className="">
						<UploadComp
							multiple={false}
							auto={false}
							uploadOnly={true}
							setImg={onSubmit}
							setAlert={setAlert}
						/>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default ProductCard;
