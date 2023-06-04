import { useEffect, useState } from "react";
import Header from "../components/Header";
import Paraphraser from "../components/Paraphraser";
import About from "../components/About";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { register, login } from "../services/authentication";

function App() {
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState();

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
			<About />
			<Footer />
			<Analytics />
		</>
	);
}

export default App;
