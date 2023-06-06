import React from "react";
import PriceCard from "./PriceCard";

function Prices() {
	const offerStandard = {
		name: "უფასო პაკეტი",
		price: 0,
		offers: {},
	};

	const offerPremium = {
		name: "პრემიუმ პაკეტი",
		price: 15,
		offers: {},
	};

	const offerUnlimited = {
		name: "ულიმიტო პაკეტი",
		price: 25,
		offers: {},
	};
	return (
		<section className="w-10/12 m-auto space-y-6 mb-14">
			<h1 className="text-2xl">შეთავაზებები - გადაწერე შეუზღუდავად</h1>
			<div className="flex justify-between flex-col gap-4 md:flex-row">
				<PriceCard data={offerStandard} />
				<PriceCard data={offerPremium} />
				<PriceCard data={offerUnlimited} />
			</div>
		</section>
	);
}

export default Prices;
