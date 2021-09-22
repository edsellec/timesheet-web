import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserCreate from "./pages/User/Create";

function App() {
	return (
		<div>
			<Router>
				<Link to="/">Dashboard</Link>
				<Link to="/users/create">Create User</Link>
				<Switch>
					<Route path="/" exact component={Dashboard} />
					<Route path="/users/create" exact component={UserCreate} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
