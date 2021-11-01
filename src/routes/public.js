import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	const authUser = useSelector((state) => state.auth.user);

	return (
		<Route
			{...rest}
			render={(props) =>
				authUser && restricted ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PublicRoute;
