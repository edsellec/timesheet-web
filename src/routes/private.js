import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, role, ...rest }) => {
	const authState = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) =>
				authState.user && authState.user.role?.name === role ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
