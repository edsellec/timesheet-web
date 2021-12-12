import React, { useEffect } from "react";
import "./styles/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import DefaultRoutes from "./routes/defaultRoutes";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./states/authSlice";

function App() {
	const authState = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	console.log(authState);

	return (
		<div className="w-screen h-screen font-display overflow-y-auto">
			{authState.isLoading ? (
				<div className=""> Loading .... </div>
			) : (
				<BrowserRouter>
					<Header />
					<DefaultRoutes />
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
