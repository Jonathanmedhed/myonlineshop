import React, { Fragment } from 'react';
import { Carousel } from 'primereact/carousel';
import CardVer from '../partials/card-vert';
import { RadioButton } from 'primereact/radiobutton';

const CardCarousel = ({ items, options, setImg, showImg, type, subType, select, value, setCurrentProduct }) => {
	/** Open a selected image(sections carousel) */
	const selectImg = (img) => {
		setImg(img);
		showImg(true);
	};
	/** Not working */
	const responsiveSettings = [
		{
			breakpoint: '1024px',
			numVisible: 3,
			numScroll: 3,
		},
		{
			breakpoint: '768px',
			numVisible: 2,
			numScroll: 2,
		},
		{
			breakpoint: '560px',
			numVisible: 1,
			numScroll: 1,
		},
	];

	let itemTemplate = (item) => {
		return <CardVer item={item} type={type} setCurrentProduct={setCurrentProduct} />;
	};
	/** 
	let itemTemplateMobile = (item) => {
		return <CardVer item={item} type={type} setCurrentProduct={setCurrentProduct} />;
	};
	*/

	/** Template for section card */
	let sectionTemplate = (item) => {
		return (
			<div className="section-preview">
				<div className="relative">
					<img
						onClick={() => select(item.value)}
						className="section-img"
						src={require('../../img/' + item.img)}
						alt="section-img"
					></img>
					<i onClick={() => selectImg(item.img)} class="fas fa-search"></i>
				</div>
				<h1>{item.name}</h1>
				<RadioButton
					inputId="rb1"
					name={item.name}
					value={item.value}
					onChange={(e) => select(e.value)}
					checked={value === item.value}
				/>
			</div>
		);
	};

	/** Template for product card */
	let imgTemplate = (item) => {
		return (
			<Fragment>
				{subType !== 'product-carousel' && <img className="carousel-img" src={item} alt="product"></img>}
				{subType === 'product-carousel' && (
					<img
						className="carousel-img"
						src={
							item.pics && item.pics.length > 0 ? item.pics[0] : require('../../img/default-product.png')
						}
						alt="product"
					></img>
				)}
			</Fragment>
		);
	};

	/** Template for product card(mobile)*/
	let imgTemplateMobile = (item) => {
		return (
			<Fragment>
				{subType !== 'product-carousel' && <img className="carousel-img" src={item} alt="product"></img>}
				{subType === 'product-carousel' && (
					<img
						className="carousel-img"
						src={
							item.pics && item.pics.length > 0 ? item.pics[0] : require('../../img/default-product.png')
						}
						alt="product"
					></img>
				)}
			</Fragment>
		);
	};

	/** Headers */
	const customHeader =
		type === 'img' ? (
			<h2 className="page-title mt-1">Product</h2>
		) : (
			<h2 className="page-title mt-1">Products for Sale</h2>
		);

	return (
		<Fragment>
			{/** Sections carousel */}
			{type === 'sections' && (
				<div className="carousel-container">
					<div className={type === 'img' && 'img-carousel-cont'}>
						<Carousel
							value={items}
							itemTemplate={sectionTemplate}
							numVisible={1}
							numScroll={1}
							className="custom-carousel"
							responsive={responsiveSettings}
							/**circular={true}*/
							/**autoplayInterval={1000} Not working */
						></Carousel>
					</div>
				</div>
			)}
			{/** Products carousel */}
			{(type === 'products' || type === 'img') && (
				<Fragment>
					{items && items.length > 0 ? (
						<Fragment>
							<div className="carousel-container hide-sm">
								<div className={type === 'img' && 'img-carousel-cont'}>
									<Carousel
										value={items}
										itemTemplate={type === 'img' ? imgTemplate : itemTemplate}
										numVisible={type === 'img' ? 1 : 3}
										numScroll={1}
										className="custom-carousel"
										responsive={responsiveSettings}
										//header={customHeader}
										/**circular={true}*/
										/**autoplayInterval={1000} Not working */
									></Carousel>
								</div>
							</div>
							{/** Mobile */}
							<div className="show-sm">
								{/** Mobile Normal */}
								<div className="hide-landscape">
									<Carousel
										circular={true}
										autoplayInterval={1000} /**Not working */
										value={items}
										itemTemplate={type === 'img' ? imgTemplateMobile : imgTemplateMobile}
										numVisible={1}
										numScroll={1}
										//header={customHeader}
										responsive={responsiveSettings}
									></Carousel>
								</div>
								{/** Mobile Landscape */}
								<div className="show-landscape">
									<Carousel
										circular={true}
										autoplayInterval={1000} /**Not working */
										value={items}
										itemTemplate={type === 'img' ? imgTemplateMobile : imgTemplateMobile}
										numVisible={1}
										numScroll={1}
										//header={customHeader}
										responsive={responsiveSettings}
									></Carousel>
								</div>
							</div>
						</Fragment>
					) : (
						<h1>No products found</h1>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};
export default CardCarousel;
