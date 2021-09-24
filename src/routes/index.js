import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./../pages/Dashboard";
import ProjectIndex from "../pages/Projects/Index";
import TeamIndex from "../pages/Teams/Index";
import UserIndex from "../pages/Users/Index";
import TimesheetIndex from "../pages/Timesheet/Index";

import TestCreate from "../pages/Test/Create";
import TestIndex from "../pages/Test/Index";
import TestView from "../pages/Test/View";

function Index() {
	return (
		<Switch>
			<Route path="/" exact component={Dashboard} />
			<Route path="/projects" exact component={ProjectIndex} />
			<Route path="/teams" exact component={TeamIndex} />
			<Route path="/users" exact component={UserIndex} />
			<Route path="/timesheet" exact component={TimesheetIndex} />

			<Route path="/test/create" exact component={TestCreate} />
			<Route path="/test/" exact component={TestIndex} />
			<Route path="/test/:id" exact component={TestView} />
		</Switch>
	);
}

export default Index;
