import React, { useRef, useState } from "react";
import paraphraseMain from "../services/paraphrase";
import { LoaderSmall } from "./Loader";
import useParaphraser from "../hooks/useParaphraser";

function Paraphraser({ tier }) {
	const { charlength, loading, inputRef, outputRef, updateLength, paraphrase } =
		useParaphraser(tier);

	return (
		<div className="w-10/12 m-auto px-3 my-[4rem] selection:bg-blue-400">
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
		</div>
	);
}

export default Paraphraser;
