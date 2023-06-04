import React, { useRef, useState } from "react";
import paraphraseMain from "../services/paraphrase";

function Paraphraser() {
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
				if (usage[date] < 10) {
					paraphrasedResult();
					updateDailyUsage();
				} else {
					alert(
						"თქვენ დღიური ლიმიტი ამოგეწურათ. ამჟამინდელი ყოველდღიური ლიმიტია - 10."
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
						<span className="max float-right">{charlength} / 200</span>
					</label>
					<textarea
						ref={inputRef}
						maxLength={200}
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
					{loading && (
						<div
							role="status"
							className="absolute top-[50%] right-[50%] translate-x-[50%] flex justify-center items-center">
							<svg
								aria-hidden="true"
								className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
							<span className="">მუშავდება...</span>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}

export default Paraphraser;
