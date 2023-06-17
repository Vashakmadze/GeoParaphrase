import { useRef, React, useState, useEffect } from "react";

export const ErrorModal = ({ error, setError }) => {
	useEffect(() => {
		setTimeout(function () {
			setError(false);
		}, 9500);
	}, []);

	return (
		<div
			id="error-modal"
			tabIndex="-1"
			aria-hidden="true"
			className="fixed bottom-10 right-10 z-50 w-fit overflow-x-hidden overflow-y-auto h-fit shadow-2xl">
			<div className="flex items-center justify-center w-full h-full">
				<div className="relative bg-white rounded-lg shadow max-w-xl">
					<button
						type="button"
						className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
						data-modal-hide="error-modal"
						onClick={() => setError(false)}>
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
						<h3 className="mb-4 mr-4 text-xl font-medium text-gray-900">
							შეცდომა
						</h3>
						<p className="text-lg font-semibold text-gray-700">
							{error ? error : "დაფიქსირდა შეცდომა. სცადეთ თავიდან"}
						</p>
					</div>
					<div className="progress progress-striped">
						<div className="progress-bar !bg-red-500"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorModal;
