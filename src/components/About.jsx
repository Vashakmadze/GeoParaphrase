import React from "react";
import Info from "./Info";
import development from "../assets/development.svg";
import startup from "../assets/startup.svg";
import mention from "../assets/mention.svg";
import launch from "../assets/Launch.png";
import media from "../assets/Media.png";

function About() {
	const textHowItWorks =
		"პერიფრაზირების ალგორითმი იყენებს ენის დამუშავების ტექნიკას ტექსტის ანალიზისა და რესტრუქტურიზაციისთვის, რომლის დახმარებითაც დგება ახალი ტექსტი იმავე მნიშვნელობით. ალგორითმი იყენებს სიტყვის ჩანაცვლების, მათი თანმიმდევრობის შეცვლის და წინადადებების დაყოფის ტექნიკებს.";

	const aboutProject =
		"ქართული პერიფრაზირების ხელსაწყო შექმნილია იმისთვის, რომ დაგეხმაროთ ტექსტის ქართულ ენაზე სწრაფად და ზუსტად გადაწერაში. გჭირდებათ თუ არა სტატიის, ესეს ან სხვა წერილობითი შინაარსის პერიფრაზირება, ჩვენი ინსტრუმენტი მოგაწვდით მაღალი ხარისხის შედეგებს, რომლებიც თავისუფალია პლაგიატისგან.";
	const yourHelp = `რადგანაც პროექტზე მუშაობს მხოლოდ ერთი ადამიანი, რთულია მისი ხშირი განახლება და ხარვეზების პოვნა. ნებისმიერი იდეის ან ნაპოვნი ხარვეზის შემთხვევაში დამიკავშირდით მეილზე - lukavasha03@gmail.com. Subject Line - ში მიუთითეთ "GeoParaphrase", სხვა შემთხვევაში თქვენი მეილი არ მიიღება.`;

	return (
		<div className="w-10/12 m-auto px-3">
			{
				<Info
					text={aboutProject}
					vector={launch}
					imageFirst={false}
					title={"პროექტის შესახებ"}
				/>
			}
			{/* {
				<Info
					text={textHowItWorks}
					vector={development}
					imageFirst={true}
					title={"როგორ მუშაობს?"}
				/>
			} */}
			{
				<Info
					text={yourHelp}
					vector={media}
					imageFirst={true}
					title={"თქვენი დახმარება"}
				/>
			}
		</div>
	);
}

export default About;
