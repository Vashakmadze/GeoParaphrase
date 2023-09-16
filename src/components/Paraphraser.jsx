import React, { useRef, useState } from "react";
import paraphraseMain from "../services/paraphrase";
import { LoaderSmall } from "./Loader";

function Paraphraser({ tier }) {
	const [charlength, setCharlength] = useState(0);
	const [loading, setLoading] = useState(false);
	const date = new Date().toLocaleDateString("en-US");
	const inputRef = useRef(null);
	const outputRef = useRef(null);

	const updateLength = (e) => {
		setCharlength(e.target.value.length);
	};

	const paraphrasedResult = async () => {
		const text = inputRef.current.value;

		if (text.length > 1) {
			const finalResult = await paraphraseMain(text, setLoading);

			outputRef.current.value = finalResult.data;
		}
	};

	const updateDailyUsage = () => {
		const usage = JSON.parse(localStorage.getItem("usage"));
		usage[date]++;
		localStorage.setItem("usage", JSON.stringify(usage));
	};

	const createDailyUsage = () => {
		const usageObject = {
			[date]: 0,
		};
		localStorage.setItem(`usage`, JSON.stringify(usageObject));
	};

	const paraphrase = () => {
		const usage = JSON.parse(localStorage.getItem("usage"));
		if (usage) {
			if (Object.keys(usage)[0] === date) {
				if (usage[date] < tier.maxParaphrases) {
					paraphrasedResult();
					updateDailyUsage();
				} else {
					alert(
						"თქვენ დღიური ლიმიტი ამოგეწურათ. ამჟამინდელი ყოველდღიური ლიმიტია - " +
							tier.maxParaphrases
					);
				}
			} else {
				createDailyUsage();
				paraphrasedResult();
			}
		} else {
			createDailyUsage();
			paraphrasedResult();
		}
	};

	return (
		<main className="w-10/12 m-auto px-3 my-[4rem]">
			<div className="paraphraser flex flex-col lg:flex-row">
				<div className="relative textarea flex-1 mb-6 lg:mr-6">
					<label
						htmlFor="text"
						className="block mb-2 font-medium text-gray-90 text-lg">
						თქვენი ტექსტი{" "}
						<span className="max float-right">
							{charlength} / {tier.maxChars}
						</span>
					</label>
					<textarea
						ref={inputRef}
						maxLength={tier.maxChars}
						id="text"
						rows="10"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-400"
						placeholder="შეიყვანეთ თქვენი ტექსტი აქ..."
						onChange={updateLength}></textarea>
					<button
						className="bg-[#60A5FA] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded absolute bottom-5 right-5"
						onClick={paraphrase}>
						გადაწერე
					</button>
				</div>
				<div className="relative textarea flex-1">
					<label
						htmlFor="text-output"
						className="block mb-2 text-lg font-medium text-gray-900">
						პერიფრაზირებული ტექსტი
					</label>
					<textarea
						ref={outputRef}
						id="text-putput"
						rows="10"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-400"
						placeholder="აქ გამოისახება თქვენი ტექსტი..."
						readOnly></textarea>
					{loading && LoaderSmall()}
				</div>
			</div>
		</main>
	);
}

export default Paraphraser;
