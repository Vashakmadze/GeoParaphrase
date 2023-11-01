import React from "react";

function Info(props) {
	return (
		<section
			className={`about mb-16 flex flex-col justify-between lg:justify-between items-center lg:flex-row ${
				props.imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"
			}`}>
			<img
				className="m-8 lg:my-0s max-w-sm"
				src={props.vector}
				alt="Startup Icon"
			/>
			<div className="text-area 9/12 lg:w-8/12">
				<h1 className="title mb-6 text-2xl w-fit">{props.title}</h1>
				<p className="text-[#8c8d94] text-xl">{props.text}</p>
			</div>
		</section>
	);
}

export default Info;
