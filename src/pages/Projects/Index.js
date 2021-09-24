import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Index() {
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

	const testData = [
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
				<div className="block sm:w-5/6 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Projects
						</div>
					</div>
				</div>
			</div>
			<div className="w-full bg-white py-4">
				<div className="block sm:w-5/6 mx-auto items-center">
					<div className="block w-full py-4">
						<div className="whitespace-pre text-lg font-bold">
							Users
						</div>
						<div className="w-full rounded py-5">
							<div className="w-full border rounded">
								<div className="w-full grid grid-cols-12 gap-6 py-3 px-5">
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										ID
									</div>
									<div className="col-span-5 whitespace-pre text-base text-gray-400">
										Name
									</div>
									<div className="col-span-2 whitespace-pre text-base text-gray-400">
										Team
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Time started
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Hours logged in
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Minutes tardy
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Status
									</div>
								</div>
								{testData.map((value, key) => {
									return (
										<div
											key={key}
											className="w-full grid grid-cols-12 gap-6 py-3 px-5 border-t hover:bg-gray-100"
										>
											<div className="col-span-1 whitespace-pre text-base">
												{value.id}
											</div>
											<div className="col-span-5 whitespace-pre text-base">
												{value.name}
											</div>
											<div className="col-span-2 whitespace-pre text-base">
												{value.team}
											</div>
											<div className="col-span-1 whitespace-pre text-base">
												{value.timeStarted}
											</div>
											<div className="col-span-1 whitespace-pre text-base">
												{value.hoursLoggedIn}
											</div>
											<div className="col-span-1 whitespace-pre text-base">
												{value.minutesTardy}
											</div>
											<div className="col-span-1 whitespace-pre text-base">
												{value.status ? (
													<span className="bg-green-600 text-white py-1 px-2 rounded">
														Active
													</span>
												) : (
													<span className="bg-red-600 text-white py-1 px-2 rounded">
														Inactive
													</span>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
