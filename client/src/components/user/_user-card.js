import React, { Fragment, useState } from 'react';
import moment from 'moment';

import { calculateRating } from '../../actions/utilities';

import DialogPrime from '../partials/dialog';
import { Rating } from 'primereact/rating';

const UserCard = ({ setCurrentUser, user, isOwner, feedback, editUser }) => {
	// Change User Info States
	const [changeLocation, setChangeLocation] = useState(false);
	const [changeName, setChangeName] = useState(false);
	const [changeEmail, setChangeEmail] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const [changePicture, setChangePicture] = useState(false);

	// Change Social Media
	const [changeFacebook, setChangeFacebook] = useState(false);
	const [changeInstagram, setChangeInstagram] = useState(false);
	const [changeLinkedin, setChangeLinkedin] = useState(false);
	const [changeSocialEmail, setChangeSocialEmail] = useState(false);
	const [changeTwitter, setChangeTwitter] = useState(false);
	const [changeYoutube, setChangeYoutube] = useState(false);

	// To open social media link or edit it
	const [selectSocial, setSelectSocial] = useState(false);

	return (
		<Fragment>
			<DialogPrime
				editUser={editUser}
				user={user}
				changeLocation={changeLocation}
				setChangeLocation={setChangeLocation}
				changeName={changeName}
				setChangeName={setChangeName}
				changeEmail={changeEmail}
				setChangeEmail={setChangeEmail}
				changePassword={changePassword}
				setChangePassword={setChangePassword}
				changePicture={changePicture}
				setChangePicture={setChangePicture}
				changeFacebook={changeFacebook}
				setChangeFacebook={setChangeFacebook}
				changeInstagram={changeInstagram}
				setChangeInstagram={setChangeInstagram}
				changeLinkedin={changeLinkedin}
				setChangeLinkedin={setChangeLinkedin}
				changeSocialEmail={changeSocialEmail}
				setChangeSocialEmail={setChangeSocialEmail}
				changeTwitter={changeTwitter}
				setChangeTwitter={setChangeTwitter}
				changeYoutube={changeYoutube}
				setChangeYoutube={setChangeYoutube}
				selectSocial={selectSocial}
				setSelectSocial={setSelectSocial}
				setCurrentUser={setCurrentUser}
			/>
			<div className="user-card">
				{/** User profile pic, show default img if user dont have one */}
				<div className="pic">
					<div className="img-cont-xs">
						<img
							className="round-img"
							src={user.pic ? user.pic : require('../../img/default-profile.png')}
							alt=""
						></img>
					</div>
					{/** Change pic button for owner*/}
					{isOwner && <i onClick={() => setChangePicture(true)} className="far fa-edit mb-1"></i>}
				</div>
				{/** User name */}
				<div className="data">
					<div className="bold">User: </div>
					<div className="sub">
						<div className="ml-1">{user.name && user.name}</div>
						{/** Edit name option for owner */}
						{isOwner && <i onClick={() => setChangeName(true)} className="far fa-edit"></i>}
					</div>
				</div>
				{/** Show email to owner */}
				{isOwner && (
					<div className="data">
						<div className="bold">Email: </div>
						<div className="sub">
							<div className="ml-1">{user.email}</div>
							{/** Edit button for onwer */}
							<i onClick={() => setChangeEmail(true)} className="far fa-edit"></i>
						</div>
					</div>
				)}
				{/** Location */}
				<div className="data">
					<div className="bold">Location: </div>
					<div className="sub">
						<div className="ml-1">{user.location}</div>
						{/** Edit button for onwer */}
						{isOwner && <i onClick={() => setChangeLocation(true)} className="far fa-edit"></i>}
					</div>
				</div>
				{/** Date since joined */}
				<div className="data">
					<div className="bold">Member Since: </div>
					<div className="sub">
						<div className="ml-1">{moment(user.date).fromNow()}</div>
					</div>
				</div>
				{/** Feedback on mobile */}
				<div className="show-sm">
					<div className="data">
						<div className="bold">Feedback:</div>
						<div className="f-2">
							<Rating value={calculateRating(feedback)} readonly={true} stars={5} cancel={false} />
						</div>
					</div>
				</div>
				{/** Social media */}
				<div className="data">
					<div className="bold">Social: </div>
					<div className="sub">
						<div className="ml-1">
							<div className="social-buttons">
								{/** Show social media  */}
								{/** Only show links if visitor */}
								{!isOwner && (
									<Fragment>
										{user.social && user.social.facebook ? (
											<a href={user.social.facebook}>
												<i className="fab fa-facebook"></i>
											</a>
										) : (
											<i className="fab fa-facebook dark"></i>
										)}
										{user.social && user.social.email ? (
											<a href={`mailto: ${user.social.email}`}>
												<i className="fas fa-envelope"></i>
											</a>
										) : (
											<i className="fas fa-envelope dark"></i>
										)}
										{user.social && user.social.instagram ? (
											<a href={user.social.instagram}>
												<i className="fab fa-instagram"></i>
											</a>
										) : (
											<i className="fab fa-instagram dark"></i>
										)}
										{user.social && user.social.linkedin ? (
											<a href={user.social.linkedin}>
												<i className="fab fa-linkedin-in"></i>
											</a>
										) : (
											<i className="fab fa-linkedin-in dark"></i>
										)}
										{user.social && user.social.twitter ? (
											<a href={user.social.twitter}>
												<i className="fab fa-twitter"></i>
											</a>
										) : (
											<i className="fab fa-twitter dark"></i>
										)}
										{user.social && user.social.youtube ? (
											<a href={user.social.youtube}>
												<i className="fab fa-youtube"></i>
											</a>
										) : (
											<i className="fab fa-youtube dark"></i>
										)}
									</Fragment>
								)}
								{/** Show edit options if Owner */}
								{isOwner && (
									<Fragment>
										{user.social && user.social.facebook ? (
											<i onClick={() => setChangeFacebook(true)} className="fab fa-facebook"></i>
										) : (
											<i
												onClick={() => setChangeFacebook(true)}
												className="fab fa-facebook dark"
											></i>
										)}
										{user.social && user.social.email ? (
											<i
												onClick={() => setChangeSocialEmail(true)}
												className="fas fa-envelope"
											></i>
										) : (
											<i
												onClick={() => setChangeSocialEmail(true)}
												className="fas fa-envelope dark"
											></i>
										)}
										{user.social && user.social.instagram ? (
											<i
												onClick={() => setChangeInstagram(true)}
												className="fab fa-instagram"
											></i>
										) : (
											<i
												onClick={() => setChangeInstagram(true)}
												className="fab fa-instagram dark"
											></i>
										)}
										{user.social && user.social.linkedin ? (
											<i
												onClick={() => setChangeLinkedin(true)}
												className="fab fa-linkedin-in"
											></i>
										) : (
											<i
												onClick={() => setChangeLinkedin(true)}
												className="fab fa-linkedin-in dark"
											></i>
										)}
										{user.social && user.social.twitter ? (
											<i onClick={() => setChangeTwitter(true)} className="fab fa-twitter"></i>
										) : (
											<i
												onClick={() => setChangeTwitter(true)}
												className="fab fa-twitter dark"
											></i>
										)}
										{user.social && user.social.youtube ? (
											<i onClick={() => setChangeYoutube(true)} className="fab fa-youtube"></i>
										) : (
											<i
												onClick={() => setChangeYoutube(true)}
												className="fab fa-youtube dark"
											></i>
										)}
									</Fragment>
								)}
							</div>
						</div>
					</div>
				</div>
				{/** Button to change password */}
				{isOwner && (
					<button onClick={() => setChangePassword(true)} className="btn btn-primary self-center mt-1">
						Change Password
					</button>
				)}
			</div>
		</Fragment>
	);
};

export default UserCard;
