import React, { Fragment, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { uploadImg, uploadImgOnly, uploadShopLogo, uploadShopJumbo, uploadProductImgs } from '../../actions/requests';

const UploadComp = ({ auto, multiple, setAlert, setSuccess, setCurrentUser, uploadOnly, setImg, imgs, type, id }) => {
	// uploaded file
	const [file, setFile] = useState(null);

	const onFormSubmit = async (e) => {
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
	};
	// Set file uploaded to brower window
	const onChange = (e) => {
		setFile(e.files[0]);
	};
	return (
		<Fragment>
			<FileUpload
				auto={auto}
				name="myImage"
				onSelect={onChange}
				onProgress={onFormSubmit}
				multiple={multiple && multiple}
				accept="image/*"
				maxFileSize={1000000}
			/>
		</Fragment>
	);
};
export default UploadComp;
