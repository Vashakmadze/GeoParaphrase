import { lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { LoaderFullPage } from "../components/Loader";
import Summarizer from "../components/Summarizer";

function App() {
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState();
	const [subscription, setSubscription] = useState();
	const [error, setError] = useState(true);
	const [tier, setTier] = useState({
		maxParaphrases: 10,
		maxChars: 500,
	});
	const [tierSummary, setTierSummary] = useState({
		maxParaphrases: 15,
		maxChars: 500,
	});
	const [loading, setLoading] = useState(false);
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
					// console.log("ar aris nakid", resp.data);
				}
			});
		}
	}, []);

	useEffect(() => {
		if (signedIn) {
			getSubscriptionFromDatabase(
				setTier,
				setSubscription,
				user,
				setUser,
				setLoading
			);
		} else {
			setTier({
				maxParaphrases: 10,
				maxChars: 500,
			});
			setSubscription(false);
		}
	}, [signedIn]);

	return (
		<main className="selection:text-white select-none">
			<BrowserRouter>
				{loading && LoaderFullPage()}
				<Routes>
					<Route
						path="/"
						index
						element={
							<>
								<Header
									signedIn={signedIn}
									setSignedIn={setSignedIn}
									user={user}
									setUser={setUser}
								/>
								<Paraphraser tier={tier} />
								{!subscription && <Prices signedIn={signedIn} />}
							</>
						}
					/>
					<Route
						path="/summary"
						element={
							<>
								<Header
									signedIn={signedIn}
									setSignedIn={setSignedIn}
									user={user}
									setUser={setUser}
								/>
								<Summarizer tier={tierSummary} />
							</>
						}
					/>
					<Route
						path="*"
						index
						element={
							<>
								<Header
									signedIn={signedIn}
									setSignedIn={setSignedIn}
									user={user}
									setUser={setUser}
								/>
								<Paraphraser tier={tier} />
								{!subscription && <Prices signedIn={signedIn} />}
							</>
						}
					/>
				</Routes>
				<About />
				<Footer />
				<Analytics />
				{status === "failure" && error && <ErrorModal setError={setError} />}
			</BrowserRouter>
		</main>
	);
}

export default App;
