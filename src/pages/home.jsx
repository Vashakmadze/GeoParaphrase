import { useEffect, useState } from "react";
import Header from "../components/Header";
import Paraphraser from "../components/Paraphraser";
import About from "../components/About";
import Footer from "../components/Footer";
import Prices from "../components/Prices";
import { Analytics } from "@vercel/analytics/react";
import { register, login } from "../services/authentication";
import ErrorModal from "../components/ErrorModal";
import { getSubscription } from "../services/stripe";
import {
	addSubscriptionToDatabase,
	getSubscriptionFromDatabase,
} from "../services/database";

function App() {
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState();
	const [subscription, setSubscription] = useState();
	const [error, setError] = useState(true);
	const [tier, setTier] = useState({
		maxParaphrases: 10,
		maxChars: 500,
	});

	const searchParams = new URLSearchParams(document.location.search);
	const status = searchParams.get("status");

	useEffect(() => {
		console.log("გადი ბიჭო აქედან!");
		if (sessionStorage.getItem("user")) {
			const userFromStorage = JSON.parse(sessionStorage.getItem("user"));
			setUser(userFromStorage);
			setSignedIn(true);
		}
		if (sessionStorage.getItem("session") && status === "success") {
			const fetchSubscription = async () => {
				const respone = await getSubscription(
					sessionStorage.getItem("session")
				);
				return respone;
			};
			fetchSubscription().then((resp) => {
				if (resp.data.status === "complete") {
					const data = {
						email: resp.data.customer_details.email,
						customer: resp.data.customer,
					};
					sessionStorage.removeItem("session");
					addSubscriptionToDatabase(resp.data.id, data);
					setSubscription(true);
				} else {
					console.log("ar aris nakid", resp.data);
				}
			});
		}
	}, []);

	useEffect(() => {
		if (signedIn) {
			getSubscriptionFromDatabase(setTier, setSubscription, user, setUser);
		} else {
			setTier({
				maxParaphrases: 10,
				maxChars: 500,
			});
			setSubscription(false);
		}
	}, [signedIn]);

	return (
		<>
			<Header
				signedIn={signedIn}
				setSignedIn={setSignedIn}
				user={user}
				setUser={setUser}
			/>
			<Paraphraser tier={tier} />
			{!subscription && <Prices signedIn={signedIn} />}
			<About />
			<Footer />
			<Analytics />
			{status === "failure" && error && <ErrorModal setError={setError} />}
		</>
	);
}

export default App;
