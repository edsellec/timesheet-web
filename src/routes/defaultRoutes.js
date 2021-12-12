import React, { useEffect } from "react";
import { Switch, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import PrivateRoute from "./private";
import PublicRoute from "./public";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import refreshToken from "../config/refreshToken";

import AuthLogin from "../pages/Auth/Login";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminTimesheetIndex from "../pages/Admin/Timesheet/Index";
import AdminGroupIndex from "../pages/Admin/Group/Index";
import AdminGroupCreate from "../pages/Admin/Group/Create";
import AdminUserIndex from "../pages/Admin/User/Index";
import AdminUserCreate from "../pages/Admin/User/Create";
import AdminActivityIndex from "../pages/Admin/Activity/Index";
import AdminActivityCreate from "../pages/Admin/Activity/Create";

import UserDashboard from "../pages/User/Dashboard";
import UserTimesheetIndex from "../pages/User/Timesheet/Index";
import UserTimesheetCreate from "../pages/User/Timesheet/Create";

function DefaultRoutes() {
	const auth = getAuth();
	const authState = useSelector((state) => state.auth);
	const history = useHistory();

	useEffect(() => {
		history.listen(() => {
			refreshToken({ auth, authState });
		});
	}, [history]);

	axios.interceptors.request.use(
		function (config) {
			refreshToken({ auth, authState });
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	return (
		<Switch>
			<PublicRoute path="/login" exact component={AuthLogin} restricted />
			{authState.user &&
				(authState.user.role?.name === "Admin" ? (
					<>
						<PrivateRoute
							path="/"
							exact
							component={AdminDashboard}
							role={"Admin"}
						/>
						<PrivateRoute
							path="/users"
							exact
							component={AdminUserIndex}
							role={"Admin"}
						/>
						<PrivateRoute
							path="/users/create"
							exact
							component={AdminUserCreate}
							role={"Admin"}
						/>
						<PrivateRoute
							path="/groups"
							exact
							component={AdminGroupIndex}
							role={"Admin"}
						/>
						<PrivateRoute
							path="/groups/create"
							exact
							component={AdminGroupCreate}
							role={"Admin"}
						/>
						<PrivateRoute
							path="/activities"
							exact
							component={AdminActivityIndex}
							role={"Admin"}
						/>
						<PrivateRoute
							path="/activities/create"
							exact
							component={AdminActivityCreate}
							role={"Admin"}
						/>
						<PrivateRoute
							path="/timesheets"
							exact
							component={AdminTimesheetIndex}
							role={"Admin"}
						/>
					</>
				) : (
					<>
						<PrivateRoute
							path="/"
							exact
							component={UserDashboard}
							role={"User"}
						/>
						<PrivateRoute
							path="/timesheets"
							exact
							component={UserTimesheetIndex}
							role={"User"}
						/>
						<PrivateRoute
							path="/timesheets/create"
							exact
							component={UserTimesheetCreate}
							role={"User"}
						/>
					</>
				))}
			<Redirect to="/login" />
		</Switch>
	);
}

export default DefaultRoutes;
