import React, { Fragment, useState } from 'react';
import DialogPrime from '../partials/dialog';

const JumboFooter = ({ isOwner, shop, user, setShop, selectEdit }) => {
	// Change Social Media
	const [changeFacebook, setChangeFacebook] = useState(false);
	const [changeInstagram, setChangeInstagram] = useState(false);
	const [changeLinkedin, setChangeLinkedin] = useState(false);
	const [changePhone, setChangePhone] = useState(false);
	const [changeEmail, setChangeEmail] = useState(false);
	const [changeTwitter, setChangeTwitter] = useState(false);
	const [changeYoutube, setChangeYoutube] = useState(false);

	return (
		<Fragment>
			<DialogPrime
				changeFacebook={changeFacebook}
				setChangeFacebook={setChangeFacebook}
				changeInstagram={changeInstagram}
				setChangeInstagram={setChangeInstagram}
				changeLinkedin={changeLinkedin}
				setChangeLinkedin={setChangeLinkedin}
				changePhone={changePhone}
				setChangePhone={setChangePhone}
				changeEmail={changeEmail}
				setChangeEmail={setChangeEmail}
				changeTwitter={changeTwitter}
				setChangeTwitter={setChangeTwitter}
				changeYoutube={changeYoutube}
				setChangeYoutube={setChangeYoutube}
				setShop={setShop}
				shop={shop}
			/>
			<div className="jumbo-footer">
				<div className="hide-sm">
					<div className="contact-us">{isOwner ? 'Shop contact:' : 'Contact us:'}</div>
				</div>
				<div className="social-media">
					{/** Show social media  */}
					{/** Only show links if visitor */}
					{!isOwner && (
						<Fragment>
							{shop.address && (
								<a href={'http://maps.google.com/?q=' + shop.address}>
									<i class="fas fa-map-marked-alt color-white"></i>
								</a>
							)}
							{shop.social && shop.social.facebook && (
								<a href={shop.social && shop.social.facebook && shop.social.facebook}>
									<i className="fab fa-facebook-square color-white"></i>
								</a>
							)}
							{shop.email && (
								<a href={`mailto: ${shop.email && shop.email}`}>
									<i className="fas fa-envelope-square color-white"></i>
								</a>
							)}
							{shop.social && shop.social.linkedin && (
								<a href={shop.social && shop.social.linkedin && shop.social.linkedin}>
									<i className="fab fa-linkedin color-white"></i>
								</a>
							)}
							{shop.social && shop.social.phone && (
								<a href={`tel:${shop.social && shop.social.phone && shop.social.phone}`}>
									<i className="fas fa-phone-square color-white"></i>
								</a>
							)}
							{shop.social && shop.social.twitter && (
								<a href={shop.social && shop.social.twitter && shop.social.twitter}>
									<i className="fab fa-twitter-square color-white"></i>
								</a>
							)}
							{shop.social && shop.social.youtube && (
								<a href={shop.social && shop.social.youtube && shop.social.youtube}>
									<i className="fab fa-youtube-square color-white"></i>
								</a>
							)}
							{shop.social && shop.social.instagram && (
								<a href={shop.social && shop.social.instagram && shop.social.instagram}>
									<i className="fab fa-instagram color-white"></i>
								</a>
							)}
						</Fragment>
					)}
					{/** Show edit options in Owner */}
					{isOwner && (
						<Fragment>
							{shop.address ? (
								<i
									onClick={() => selectEdit('Address')}
									className="fas fa-map-marked-alt color-white"
								></i>
							) : (
								<i
									onClick={() => selectEdit('Address')}
									className="fas fa-map-marked-alt color-dark"
								></i>
							)}
							{shop.social && shop.social.facebook ? (
								<i
									onClick={() => setChangeFacebook(true)}
									className="fab fa-facebook-square color-white"
								></i>
							) : (
								<i
									onClick={() => setChangeFacebook(true)}
									className="fab fa-facebook-square color-dark"
								></i>
							)}
							{shop.email ? (
								<i
									onClick={() => setChangeEmail(true)}
									className="fas fa-envelope-square color-white"
								></i>
							) : (
								<i
									onClick={() => setChangeEmail(true)}
									className="fas fa-envelope-square color-dark"
								></i>
							)}
							{shop.social && shop.social.linkedin ? (
								<i onClick={() => setChangeLinkedin(true)} className="fab fa-linkedin color-white"></i>
							) : (
								<i onClick={() => setChangeLinkedin(true)} className="fab fa-linkedin color-dark"></i>
							)}
							{shop.social && shop.social.phone ? (
								<i onClick={() => setChangePhone(true)} className="fas fa-phone-square color-white"></i>
							) : (
								<i onClick={() => setChangePhone(true)} className="fas fa-phone-square color-dark"></i>
							)}
							{shop.social && shop.social.twitter ? (
								<i
									onClick={() => setChangeTwitter(true)}
									className="fab fa-twitter-square color-white"
								></i>
							) : (
								<i
									onClick={() => setChangeTwitter(true)}
									className="fab fa-twitter-square color-dark"
								></i>
							)}
							{shop.social && shop.social.youtube ? (
								<i
									onClick={() => setChangeYoutube(true)}
									className="fab fa-youtube-square color-white"
								></i>
							) : (
								<i
									onClick={() => setChangeYoutube(true)}
									className="fab fa-youtube-square color-dark"
								></i>
							)}
							{shop.social && shop.social.instagram ? (
								<i
									onClick={() => setChangeInstagram(true)}
									className="fab fa-instagram color-white"
								></i>
							) : (
								<i onClick={() => setChangeInstagram(true)} className="fab fa-instagram color-dark"></i>
							)}
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};
export default JumboFooter;
