import { useEffect, useState } from "react";
import Header from "../components/Header";
import Paraphraser from "../components/Paraphraser";
import About from "../components/About";
import Footer from "../components/Footer";
import Prices from "../components/Prices";
import { Analytics } from "@vercel/analytics/react";
import { register, login } from "../services/authentication";
import ErrorModal from "../components/ErrorModal";

function App() {
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState();
	const [subscription, setSubscription] = useState();
	const [error, setError] = useState(true);

	const searchParams = new URLSearchParams(document.location.search);
	const status = searchParams.get("status");
	console.log(status);

	useEffect(() => {
		console.log("გადი ბიჭო აქედან!");
		if (sessionStorage.getItem("user")) {
			setUser(JSON.parse(sessionStorage.getItem("user")));
			setSignedIn(true);
		}
	}, []);

	return (
		<>
			<Header
				signedIn={signedIn}
				setSignedIn={setSignedIn}
				user={user}
				setUser={setUser}
			/>
			<Paraphraser />
			{!subscription && <Prices signedIn={signedIn} />}
			<About />
			<Footer />
			<Analytics />
			{status === "failure" && error && <ErrorModal setError={setError} />}
		</>
	);
}

export default App;
