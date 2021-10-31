import React, { useEffect } from "react";
import "./styles/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import RoutesIndex from "./routes/index";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./states/authSlice";

function App() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	console.log(user);

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
