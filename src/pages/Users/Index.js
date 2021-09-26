import React from "react";
import { useHistory } from "react-router-dom";

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
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Users
						</div>
						<div className="whitespace-pre font-bold">
							<button
								onClick={() => history.push("/users/create")}
								className="w-full py-3 px-5 rounded text-white bg-black hover:underline"
							>
								<div className="whitespace-pre text-base font-bold text-center">
									Add a user
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full bg-white py-4">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="block w-full py-4">
						<div className="whitespace-pre text-lg font-bold">
							Active users
						</div>
						<div className="w-full py-5">
							<div className="w-full border rounded">
								<div className="w-full grid grid-cols-12 gap-6 py-3 px-5">
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										No.
									</div>
									<div className="col-span-6 whitespace-pre text-base text-gray-400">
										Name
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Team
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Time started
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Hours logged
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
										<SingleRow key={key} value={value} />
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

function SingleRow({ value }) {
	return (
		<div className="w-full grid grid-cols-12 gap-6 py-3 px-5 border-t hover:bg-gray-100">
			<div className="col-span-1 whitespace-pre text-base">
				{value.id}
			</div>
			<div className="col-span-6 whitespace-pre text-base">
				{value.name}
			</div>
			<div className="col-span-1 whitespace-pre text-base">
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
}

export default Index;
