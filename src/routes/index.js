import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./private";
import PublicRoute from "./public";

import AuthLogin from "./../pages/Auth/Login";
import Dashboard from "./../pages/Dashboard";

import TimesheetIndex from "../pages/Timesheet/Index";

import GroupIndex from "../pages/Group/Index";
import GroupCreate from "../pages/Group/Create";

import UserIndex from "../pages/User/Index";
import UserCreate from "../pages/User/Create";

import ActivityIndex from "../pages/Activity/Index";
import ActivityCreate from "../pages/Activity/Create";

function Index() {
	return (
		<Switch>
			<PublicRoute path="/login" exact component={AuthLogin} restricted />

			<PrivateRoute path="/" exact component={Dashboard} />

			<PrivateRoute path="/timesheets" exact component={TimesheetIndex} />

			<PrivateRoute path="/groups" exact component={GroupIndex} />
			<PrivateRoute path="/groups/create" exact component={GroupCreate} />

			<PrivateRoute path="/users" exact component={UserIndex} />
			<PrivateRoute path="/users/create" exact component={UserCreate} />

			<PrivateRoute path="/activities" exact component={ActivityIndex} />
			<PrivateRoute
				path="/activities/create"
				exact
				component={ActivityCreate}
			/>
		</Switch>
	);
}

export default Index;
