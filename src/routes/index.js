import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./../pages/Dashboard";

import TimesheetIndex from "../pages/Timesheet/Index";

import GroupIndex from "../pages/Group/Index";

import UserIndex from "../pages/User/Index";
import UserCreate from "../pages/User/Create";

import ActivityIndex from "../pages/Activity/Index";

function Index() {
	return (
		<Switch>
			<Route path="/" exact component={Dashboard} />

			<Route path="/timesheets" exact component={TimesheetIndex} />

			<Route path="/groups" exact component={GroupIndex} />

			<Route path="/users" exact component={UserIndex} />
			<Route path="/users/create" exact component={UserCreate} />

			<Route path="/activities" exact component={ActivityIndex} />
		</Switch>
	);
}

export default Index;
