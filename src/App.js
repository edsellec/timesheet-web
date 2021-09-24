import React from "react";
import "./styles/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import RoutesIndex from "./routes/index";

function App() {
	return (
		<div className="font-display">
			<BrowserRouter>
				<Header />
				<RoutesIndex />
			</BrowserRouter>
		</div>
	);
}

export default App;
