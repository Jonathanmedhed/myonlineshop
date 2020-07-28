import React, { Fragment, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { uploadImg, uploadImgOnly, uploadShopLogo, uploadShopJumbo, uploadProductImgs } from '../../actions/requests';

const UploadComp = ({ auto, multiple, setAlert, setSuccess, setCurrentUser, uploadOnly, setImg, imgs, type, id }) => {
	// uploaded file
	const [file, setFile] = useState(null);
	// uploaded file url
	const [url, setUrl] = useState(null);

	const onFormSubmit = async (e) => {
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
		//setFile(e.files[0]);
		const files = e.files;
		const file = files[0];
		if (file == null) {
			return alert('No file selected.');
		}
		setFile(file);
	};

	const getSignedRequest = () => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `/api/users/sign-s3?file-name=${file.name}&file-type=${file.type}`);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					uploadFile(file, response.signedRequest, response.url);
				} else {
					alert('Could not get signed URL.');
				}
			}
		};
		xhr.send();
	};

	const uploadFile = (file, signedRequest, url) => {
		const xhr = new XMLHttpRequest();
		xhr.open('PUT', signedRequest);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					setAlert('File Uploaded!', 'success');
				} else {
					alert('Could not upload file.');
				}
			}
		};
		xhr.send(file);
	};

	return (
		<Fragment>
			<FileUpload
				auto={auto}
				name="myImage"
				onSelect={onChange}
				onProgress={getSignedRequest}
				multiple={multiple && multiple}
				accept="image/*"
				maxFileSize={1000000}
			/>
		</Fragment>
	);
};
export default UploadComp;
