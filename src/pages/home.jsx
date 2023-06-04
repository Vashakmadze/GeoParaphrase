import { useEffect } from "react";
import Header from "../components/Header";
import Paraphraser from "../components/Paraphraser";
import About from "../components/About";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { register, login } from "../services/authentication";

function App() {
	useEffect(() => {
		console.log("გადი ბიჭო აქედან!");
		// register("someemail@gmail.com", "lukasaba");
		// login("someemail@gmail.com", "lukasaba");
	}, []);

	return (
		<>
			<Header />
			<Paraphraser />
			<About />
			<Footer />
			<Analytics />
		</>
	);
}

export default App;
