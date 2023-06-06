import React from "react";
import PriceCard from "./PriceCard";

function Prices() {
	const offerStandard = {
		name: "უფასო პაკეტი",
		price: 0,
		offers: {
			charachters: 200,
			words: 50,
			paraphrases: 10,
		},
	};

	const offerPremium = {
		name: "პრემიუმ პაკეტი",
		price: 5,
		offers: {
			charachters: 1000,
			words: 100,
			paraphrases: 50,
		},
	};

	const offerUnlimited = {
		name: "გრანდიოზული პაკეტი",
		price: 10,
		offers: {
			charachters: 2000,
			words: 200,
			paraphrases: "ულიმიტო",
		},
	};
	return (
		<section className="w-10/12 m-auto space-y-6 mb-14">
			<h1 className="text-2xl">შეთავაზებები - გადაწერე ნაკლები შეზღუდვით</h1>
			<div className="flex justify-between flex-col gap-4 md:flex-row">
				<PriceCard data={offerStandard} />
				<PriceCard data={offerPremium} />
				<PriceCard data={offerUnlimited} />
			</div>
		</section>
	);
}

export default Prices;
