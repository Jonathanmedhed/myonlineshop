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
			//setSuccess(true);
			//setItem(res.data);
			//history.replace(`/shop/${res.data._id}`);
		}
		return res;
	};

	return (
		<Fragment>
			<div className="user-card">
				{product.pics && product.pics.length > 0 ? (
					<div className="relative">
						<CardCarousel items={product.pics} type="img" />
						{!product.active && <div className="sold-out">Sold Out</div>}
					</div>
				) : (
					<div className="relative">
						<img className="carousel-img" src={require('../../img/default-product.png')} alt=""></img>
						{!product.active && <div className="sold-out">Sold Out</div>}
					</div>
				)}
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
