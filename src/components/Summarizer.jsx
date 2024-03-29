import React, { useEffect } from "react";
import { useState, useRef } from "react";
import summarizeMain from "../services/summarize";
import { LoaderSmallPurple } from "./Loader";
import useSummarizer from "../hooks/useSummarizer";

function Summarizer({ tier }) {
	const { charlength, loading, inputRef, outputRef, updateLength, summarize } =
		useSummarizer(tier);

	return (
		<main className="w-10/12 m-auto px-3 my-[4rem] selection:bg-[#312e81]">
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
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#312e81] focus:border-[#312e81] focus:outline-[#312e81] "
						placeholder="შეიყვანეთ თქვენი ტექსტი აქ..."
						onChange={updateLength}></textarea>
					<button
						className="bg-[#312e81] hover:bg-[#1f1c4f] text-white font-bold py-2 px-4 rounded absolute bottom-5 right-5"
						onClick={summarize}>
						გააშინაარსე
					</button>
				</div>
				<div className="relative textarea flex-1">
					<label
						htmlFor="text-output"
						className="block mb-2 text-lg font-medium text-gray-900">
						გაშინაარსებული ტექსტი
					</label>
					<textarea
						ref={outputRef}
						id="text-putput"
						rows="10"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#312e81] focus:border-[#312e81] focus:outline-[#312e81]"
						placeholder="აქ გამოისახება თქვენი ტექსტი..."
						readOnly></textarea>
					{loading && LoaderSmallPurple()}
				</div>
			</div>
		</main>
	);
}

export default Summarizer;
