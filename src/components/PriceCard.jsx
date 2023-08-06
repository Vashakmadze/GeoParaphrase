import React from "react";
import { subscribe } from "../services/stripe";

function PriceCard({ data, signedIn }) {
	const buy = async () => {
		if (signedIn) {
			const response = await subscribe(data.price);
			sessionStorage.setItem("session", response.data.id);
			window.location.replace(response.data.url);
		} else {
			alert("გთხოვთ გაიარეთ ავტორიზაცია");
		}
	};

	return (
		<div className="max-w-[24rem] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
			<h5 className="mb-4 text-xl font-medium text-gray-500">{data.name}</h5>
			<div className="flex items-baseline text-gray-900">
				<span className="text-4xl font-semibold font-sans translate-y-[-15%] mr-1">
					€
				</span>
				<span className="text-5xl font-extrabold tracking-wider">
					{data.price}
				</span>
				<span className="ml-1 text-xl font-normal text-gray-500">/month</span>
			</div>
			<ul
				role="list"
				className="space-y-5 my-7">
				<li className="flex space-x-3">
					<svg
						aria-hidden="true"
						className="flex-shrink-0 w-5 h-5 text-indigo-700"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<title>Check icon</title>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"></path>
					</svg>
					<span className="text-base font-normal leading-tight text-gray-500">
						მაქსიმუმ {data.offers.charachters} ასო თითო გადაწერაში
					</span>
				</li>
				<li className="flex space-x-3">
					<svg
						aria-hidden="true"
						className="flex-shrink-0 w-5 h-5 text-indigo-700"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<title>Check icon</title>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"></path>
					</svg>
					<span className="text-base font-normal leading-tight text-gray-500">
						მაქსიმუმ {data.offers.words} სიტყვა თითო გადაწერაში.
					</span>
				</li>
				<li className="flex space-x-3">
					<svg
						aria-hidden="true"
						className="flex-shrink-0 w-5 h-5 text-indigo-700"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<title>Check icon</title>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"></path>
					</svg>
					<span className="text-base font-normal leading-tight text-gray-500">
						დღეში {data.offers.paraphrases} გადაწერა.
					</span>
				</li>
				{/* <li className="flex space-x-3 line-through decoration-gray-500">
					<svg
						aria-hidden="true"
						className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<title>Check icon</title>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"></path>
					</svg>
					<span className="text-base font-normal leading-tight text-gray-500">
						Sketch Files
					</span>
				</li> */}
			</ul>
			{data.price === 0 ? (
				<button
					type="button"
					className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
					სარგებლობთ
				</button>
			) : (
				<button
					onClick={buy}
					type="button"
					className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
					გაწევრიანდი
				</button>
			)}
		</div>
	);
}

export default PriceCard;
