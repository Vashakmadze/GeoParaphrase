import { React, useRef } from "react";
import { register } from "../services/authentication";

export const RegisterModal = ({
	toggle,
	toggleBoth,
	setSignedIn,
	user,
	setUser,
}) => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const repeatPasswordRef = useRef();

	const authenticate = async (e) => {
		e.preventDefault();
		if (validatePassword()) {
			try {
				const response = await register(
					emailRef.current.value,
					passwordRef.current.value
				);
				setSignedIn((prevState) => !prevState);
				setUser(response);
				sessionStorage.setItem("user", JSON.stringify(response));
				toggle();
			} catch (err) {
				handleError(err.code);
			}
		} else {
			alert("პაროლები არ ემთხვევა ერთმანეთს.");
		}
	};

	const handleError = (code) => {
		switch (code) {
			case "auth/email-already-in-use":
				alert("ელექტრონული ფოსტა უკვე გამოყენებულია.");
				break;
			case "auth/invalid-email":
				alert("არასწორი ელექტრონული ფოსტა.");
				break;
			case "auth/wrong-password":
				alert("პაროლი არასწორია.");
				break;
			case "auth/user-not-found":
				alert("არასწორი ელექტრონული ფოსტა.");
				break;
			default:
				alert("დაფიქსირდა შეცდომა. სცადეთ თავიდან.");
		}
	};

	const validatePassword = () => {
		if (passwordRef.current.value === repeatPasswordRef.current.value) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div
			id="authentication-modal"
			tabIndex="-1"
			aria-hidden="true"
			className="fixed top-0 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
			<div className="flex items-center justify-center w-full h-full backdrop-blur-sm">
				<div className="relative bg-white rounded-lg shadow w-[28rem]">
					<button
						type="button"
						className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
						data-modal-hide="authentication-modal"
						onClick={toggle}>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fillRule="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"></path>
						</svg>
						<span className="sr-only">Close modal</span>
					</button>
					<div className="px-6 py-6 lg:px-8">
						<h3 className="mb-4 text-xl font-medium text-gray-900">
							რეგისტრაცია
						</h3>
						<form
							className="space-y-6"
							action="#">
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900">
									ელექტრონული ფოსტა
								</label>
								<input
									ref={emailRef}
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="name@company.com"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900">
									პაროლი
								</label>
								<input
									ref={passwordRef}
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									required
								/>
								<label
									htmlFor="repeatPassword"
									className="block mb-2 text-sm font-medium text-gray-900">
									გაიმეორეთ პაროლი
								</label>
								<input
									ref={repeatPasswordRef}
									type="password"
									name="repeatPassword"
									id="repeatPassword"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									required
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-indigo-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								onClick={authenticate}>
								რეგისტრაცია
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterModal;
