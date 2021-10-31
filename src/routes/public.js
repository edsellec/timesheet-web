import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			window.localStorage.getItem("token") && restricted ? (
				<Redirect to="/" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

export default PublicRoute;
