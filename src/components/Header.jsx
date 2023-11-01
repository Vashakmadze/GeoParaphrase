import React, { useState, useEffect } from "react";
import icon from "../assets/Icon.png";
import x from "../assets/x.svg";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Dropdown from "./Dropdown";
import ResetPasswordModal from "./ResetPasswordModal";
import { logoutFirebase } from "../services/authentication";
import { Link, useLocation } from "react-router-dom";

function Header({ signedIn, setSignedIn, user, setUser }) {
	const [visible, setVisible] = useState(true);
	const [login, setLogin] = useState(false);
	const [register, setRegister] = useState(false);
	const [resetPassword, setResetPassword] = useState(false);
	const [headerStyle, setHeaderStyle] = useState("#60A5FA");
	const [headerText, setHeaderText] = useState("პერიფრაზირება");
	const { pathname } = useLocation();
	const [navText, setNavText] = useState("გაშინაარსება");
	const [nav, setNav] = useState("summary");
	const [colorText, setColorText] = useState("cublue");

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
		logoutFirebase();
		setUser(null);
		setSignedIn(false);
		sessionStorage.removeItem("user");
	};

	const resetPasswordToggle = () => {
		setResetPassword((prevState) => !prevState);
	};

	useEffect(() => {
		if (pathname === "/summary") {
			setHeaderStyle((prev) => "#312e81");
			setHeaderText((prev) => "გაშინაარსება");
			setNavText((prev) => "პერიფრაზირება");
			setNav("paraphrase");
			setColorText((prev) => "cupurple");
		} else {
			setHeaderStyle((prev) => "#60A5FA");
			setHeaderText((prev) => "პერიფრაზირება");
			setNavText((prev) => "გაშინაარსება");
			setNav("summary");
			setColorText((prev) => "cublue");
		}
	}, [pathname]);

	return (
		<>
			<header
				className={`text-white flex md:justify-between flex-col items-center gap-10 md:gap-0 md:flex-row flex-wrap  p-6 font-semibold text-xl tracking-tight bg-[${headerStyle}]`}>
				<section className="nav">
					<nav
						className={`text-center mr-6 cursor-pointer transition duration-500 hover:-translate-y-2 border-solid border-white bg-white text-${colorText} p-2 rounded-md`}>
						<Link to={`/${nav}`}> {navText}</Link>
					</nav>
				</section>
				<section className="flex items-center flex-no-shrin md:mr-6">
					{/* <img
						src={icon}
						className="w-12 mr-4"
					/> */}
					<h1 className="hidden md:block">ტექსტის ავტომატური {headerText} </h1>
				</section>
				{!signedIn ? (
					<section className="flex items-center">
						<div
							className={`text-center mr-6 cursor-pointer transition duration-500 hover:-translate-y-2 border-solid border-white bg-white text-${colorText} p-2 rounded-md`}
							onClick={toggleLogin}>
							შესვლა
						</div>
						<div
							className={`text-center cursor-pointer transition duration-500 hover:-translate-y-2 border-solid border-white bg-white text-${colorText} p-2 rounded-md`}
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
			{/* {visible && (
				<div className="bg-indigo-900 text-center py-4 px-4 lg:px-4">
					<div
						className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg flex-col lg:flex-row lg:rounded-full flex lg:inline-flex"
						role="alert">
						<span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
							გამარჯობა
						</span>
						<span className="font-semibold mr-2 flex-auto my-4 lg:my-0 text-center">
							საიტი მუშაობს სატესტო რეჟიმში და მუდმივი დახვეწის პროცესშია.
							მოსალოდნელია გრამატიკული და სინტაქსური შეცდომები. თუ პაკეტის
							შეძენისას პრობლემები შეგექმნათ, გთხოვთ დამიკავშირდით მეილზე.
							მადლობა ❤
						</span>
						<img
							className="w-6 text-white hover:cursor-pointer"
							src={x}
							alt="Close Popup"
							onClick={popupClose}
						/>
					</div>
				</div>
			)} */}
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
					setReset={setResetPassword}
				/>
			)}
		</>
	);
}

export default Header;
