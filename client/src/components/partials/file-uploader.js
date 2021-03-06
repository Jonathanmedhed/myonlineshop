import React, { Fragment, useState } from 'react';
import PrimeSpinner from './spinner';
import { FileUpload } from 'primereact/fileupload';
import Alert from '../alerts/alert';
import {
	addProductImg,
	uploadImg,
	uploadImgOnly,
	uploadShopLogo,
	uploadShopJumbo,
	uploadProductImgs,
} from '../../actions/requests';

const UploadComp = ({
	auto,
	editProduct,
	editShop,
	editUser,
	multiple,
	setAlert,
	setSuccess,
	setCurrentUser,
	setShop,
	uploadOnly,
	setImg,
	imgs,
	type,
	id,
	product,
	setProduct,
}) => {
	// Submition state to show spinner
	const [submition, setSubmition] = useState(false);
	// uploaded file
	const [file, setFile] = useState(null);
	// uploaded file url
	const [url, setUrl] = useState(null);

	// Form Values
	let [formData, setFormData] = useState({});

	const onFormSubmit = async (e) => {
		getSignedRequest(file);
		/** 
		const formData = new FormData();
		// append uploaded file to form
		formData.append('myImage', file);
		// upload and asign logo
		if (type === 'logo') {
			const res = await uploadShopLogo(formData, id);
			if (res.status === 200) {
				setAlert('Picture Uploaded', 'success');
			} else {
				setAlert('Upload Failed', 'error');
			}
			// Upload and asign product pic
		} else if (type === 'product-pics') {
			const res = await uploadProductImgs(formData, id);
			if (res.status === 200) {
				setAlert('Picture Uploaded', 'success');
			} else {
				setAlert('Upload Failed', 'error');
			}
			// Upload and asign shop jumbo
		} else if (type === 'jumbo') {
			const res = await uploadShopJumbo(formData, id);
			if (res.status === 200) {
				setAlert('Picture Uploaded', 'success');
			} else {
				setAlert('Upload Failed', 'error');
			}
			// Just upload and dont asign
		} else if (uploadOnly === true) {
			const res = await uploadImgOnly(formData);
			if (res.status === 200) {
				// if theres a picture array
				if (imgs) {
					imgs.push(res.data);
					setImg(imgs);
				} else {
					setImg(res.data);
				}
				setAlert('Picture Uploaded', 'success');
			} else {
				setAlert('Upload Failed', 'error');
			}
			// Upload and asign to user
		} else {
			const res = await uploadImg(formData);
			if (res.status === 200) {
				setAlert('Picture Changed', 'success');
				setSuccess(true);
				setCurrentUser(res.data);
			} else {
				setAlert('Modification Failed', 'error');
			}
		}
		*/
	};
	// Set file uploaded to brower window
	const onChange = (e) => {
		setSubmition(true);
		//setFile(e.files[0]);
		const files = e.files;
		const file = files[0];
		if (file == null) {
			return alert('No file selected.');
		}
		setFile(file);
		setSubmition(false);
	};

	const getSignedRequest = (file) => {
		setSubmition(true);
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `/api/users/sign-s3?file-name=${file.name}&file-type=${file.type}`);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					uploadFile(file, response.signedRequest, response.url);
				} else {
					alert('Could not get signed URL.');
					setSubmition(false);
				}
			}
		};
		xhr.send();
	};

	const uploadFile = (file, signedRequest, url) => {
		setSubmition(true);
		const xhr = new XMLHttpRequest();
		xhr.open('PUT', signedRequest);
		xhr.onreadystatechange = async () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					setAlert('File Uploaded!', 'success');
					// upload and asign logo
					if (type === 'logo') {
						formData.pic_logo = url;
						const res = await editShop(formData, id, setSuccess);
						// Upload and asign product pic
					} else if (type === 'product-pics') {
						let pictures = product.pics;
						pictures.push(url);
						formData.pics = pictures;
						editProduct(formData, product._id, setSuccess);
						// Set section image
					} else if (type === 'section-img') {
						setImg(url);
						if (url) {
							setAlert('Picture Uploaded', 'success');
						} else {
							setAlert('Upload Failed', 'error');
						}
						// Upload and asign shop jumbo
					} else if (type === 'jumbo') {
						formData.pic_jumbo = url;
						const res = await editShop(formData, id, setSuccess);
					} else {
						formData.pic = url;
						const res = await editUser(formData);
					}
					setSubmition(false);
				} else {
					alert('Could not upload file.');
				}
			}
		};
		xhr.send(file);
	};

	return (
		<div className="m-1">
			{submition && <PrimeSpinner />}
			<FileUpload
				auto={auto}
				name="myImage"
				onSelect={onChange}
				onProgress={onFormSubmit}
				multiple={multiple && multiple}
				accept="image/*"
				maxFileSize={1000000}
			/>
		</div>
	);
};
export default UploadComp;
