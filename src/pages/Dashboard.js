import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import moment from "moment";
import { TableMini } from "./../components/";

function Home() {
	const [dateToday, setDateToday] = useState(moment().format("dddd, MMMM D"));
	let history = useHistory();

	// useEffect(() => {
	// 	axios.get("http://localhost:3001/api/users").then((response) => {
	// 		console.log(response.data);
	// 	});
	// }, []);

	// useEffect(() => { // every second render
	// 	const interval = setInterval(() => {
	// 		setDateToday(moment().format("DD MM YYYY hh:mm:ss"));
	// 	}, 1000);
	// 	return () => clearInterval(interval);
	// }, []);

	const testDataTeams = [
		{
			id: 1,
			name: "TLE-A",
			userCount: 5,
			dateCreated: "Sept 8, 2021 07:43 AM",
		},
		{
			id: 2,
			name: "TLE-B",
			userCount: 3,
			dateCreated: "Sept 8, 2021 07:43 AM",
		},
		{
			id: 3,
			name: "TLE-C",
			userCount: 10,
			dateCreated: "Sept 8, 2021 07:43 AM",
		},
	];

	const testDataUsers = [
		{
			id: 1,
			name: "Cadenas, Edselle",
			team: "TLE-A",
			timeStarted: "07:43 AM",
			hoursLoggedIn: "10:12",
			minutesTardy: "--:--",
			status: 1,
		},
		{
			id: 2,
			name: "Sample, Test",
			team: "TLE-B",
			timeStarted: "07:43 AM",
			hoursLoggedIn: "10:12",
			minutesTardy: "--:--",
			status: 1,
		},
		{
			id: 3,
			name: "Doe, John",
			team: "TLE-C",
			timeStarted: "--:-- --",
			hoursLoggedIn: "--:--",
			minutesTardy: "--:--",
			status: 0,
		},
	];

	return (
		<section className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Dashboard
						</div>
						<div className="whitespace-pre font-bold">
							{dateToday}
						</div>
					</div>
				</div>
			</div>
			<div className="w-full bg-white py-4">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between space-x-6 py-4">
						<div className="w-full block border rounded p-5">
							<div className="whitespace-pre text-base uppercase">
								Logged on time
							</div>
							<div className="whitespace-pre text-3xl font-bold">
								{3}
							</div>
						</div>
						<div className="w-full block border rounded p-5">
							<div className="whitespace-pre text-base uppercase">
								Tardy
							</div>
							<div className="whitespace-pre text-3xl font-bold">
								{3}
							</div>
						</div>
						<div className="w-full block border rounded p-5">
							<div className="whitespace-pre text-base uppercase">
								Absent
							</div>
							<div className="whitespace-pre text-3xl font-bold">
								{3}
							</div>
						</div>
					</div>
					<TableMini
						type={"Teams"}
						title={"Active teams"}
						data={testDataTeams}
						history={history}
					/>
					<TableMini
						type={"Users"}
						title={"Active users"}
						data={testDataUsers}
						history={history}
					/>
				</div>
			</div>
		</section>
	);
}

export default Home;
