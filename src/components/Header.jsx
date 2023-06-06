import React, { useState } from "react";
import icon from "../assets/Icon.png";
import x from "../assets/x.svg";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Dropdown from "./Dropdown";
import ResetPasswordModal from "./ResetPasswordModal";

function Header({ signedIn, setSignedIn, user, setUser }) {
	const [visible, setVisible] = useState(true);
	const [login, setLogin] = useState(false);
	const [register, setRegister] = useState(false);
	const [resetPassword, setResetPassword] = useState(false);

	const popupClose = () => {
		setVisible((prevState) => !prevState);
	};

	const toggleLogin = () => {
		setLogin((prevState) => !prevState);
	};

	const toggleRegister = () => {
		setRegister((prevState) => !prevState);
	};

	const toggleBoth = () => {
		toggleLogin();
		toggleRegister();
	};

	const logout = () => {
		setUser(null);
		setSignedIn(false);
		sessionStorage.removeItem("user");
	};

	const resetPasswordToggle = () => {
		setResetPassword((prevState) => !prevState);
	};

	return (
		<>
			<header className="text-white flex justify-between flex-wrap bg-blue-400 p-6 font-semibold text-xl tracking-tight">
				<section className="flex items-center flex-no-shrin mr-6 ">
					<img
						src={icon}
						className="w-12 mr-4"
					/>
					<h1 className="hidden md:block">ტექსტის ავტომატური პერიფრაზირება </h1>
				</section>
				{!signedIn ? (
					<section className="flex items-center">
						<div
							className="text-center mr-6 cursor-pointer transition duration-500 hover:scale-110"
							onClick={toggleLogin}>
							შესვლა
						</div>
						<div
							className="text-center cursor-pointer transition duration-500 hover:scale-110"
							onClick={toggleRegister}>
							რეგისტრაცია
						</div>
					</section>
				) : (
					<section className="flex items-center">
						<Dropdown
							user={user}
							logout={logout}
							resetPasswordToggle={resetPasswordToggle}
						/>
					</section>
				)}
			</header>
			{visible && (
				<div className="bg-indigo-900 text-center py-4 px-4 lg:px-4">
					<div
						className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg flex-col lg:flex-row lg:rounded-full flex lg:inline-flex"
						role="alert">
						<span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
							გამარჯობა
						</span>
						<span className="font-semibold mr-2 flex-auto my-4 lg:my-0 text-center">
							საიტი მუშაობს სატესტო რეჯიმში და მუდმივი დახვეწის პროცესშია.
							მოსალოდნელია გრამატიკული და სინტაქსური შეცდომები. მადლობა ❤
						</span>
						<img
							className="w-6 text-white hover:cursor-pointer"
							src={x}
							alt="Close Popup"
							onClick={popupClose}
						/>
					</div>
				</div>
			)}
			{login && (
				<LoginModal
					toggle={toggleLogin}
					toggleBoth={toggleBoth}
					setSignedIn={setSignedIn}
					setUser={setUser}
					user={user}
				/>
			)}
			{register && (
				<RegisterModal
					toggle={toggleRegister}
					toggleBoth={toggleBoth}
					setSignedIn={setSignedIn}
					setUser={setUser}
					user={user}
				/>
			)}
			{resetPassword && signedIn && (
				<ResetPasswordModal
					mail={user.email}
					toggle={resetPasswordToggle}
				/>
			)}
		</>
	);
}

export default Header;
