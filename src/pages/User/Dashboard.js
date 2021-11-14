import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Title, Summary } from "./../../components/";
import { useSelector } from "react-redux";
import { headers } from "./../../config/request";

const Index = () => {
	const authUser = useSelector((state) => state.auth.user);
	const dateToday = moment().format("dddd, MMMM D");
	const history = useHistory();
	const [attendance, setAttendance] = useState({
		id: null,
		started_at: null,
		ended_at: null,
	});

	useEffect(() => {
		if (authUser) {
			axios
				.get(
					process.env.REACT_APP_API_URL +
						"/attendance/" +
						authUser.id,
					{
						params: {},
						headers: headers,
					}
				)
				.then((response) => {
					if (response) {
						setAttendance({
							id: response.data.id,
							started_at: response.data.started_at,
							ended_at: response.data.ended_at,
						});
					} else {
						setAttendance({
							id: null,
							started_at: null,
							ended_at: null,
						});
					}
				});
		}
	}, [authUser]);

	function handleTimeIn() {
		let data = { user_id: authUser.id };
		axios
			.post(process.env.REACT_APP_API_URL + "/attendance", data, {
				params: {},
				headers: headers,
			})
			.then((response) => {
				history.go(0);
			});
	}

	function handleTimeOut() {
		let data = { id: attendance.id };
		axios
			.put(
				process.env.REACT_APP_API_URL + "/attendance/" + authUser.id,
				data,
				{
					params: {},
					headers: headers,
				}
			)
			.then((response) => {
				history.go(0);
			});
	}

	const titleConstants = () => {
		return [
			{
				title: () => {
					return (
						<div className="whitespace-pre text-3xl font-bold">
							Dashboard
						</div>
					);
				},
			},
			{
				title: () => {
					return (
						<div className="whitespace-pre font-medium">
							{dateToday}
						</div>
					);
				},
			},
		];
	};

	const summaryConstants = () => {
		const durationDay = "07:10";
		const hoursDay =
			parseInt(durationDay.split(":")[0]) +
			parseInt(durationDay.split(":")[1]) / 60;

		const durationWeek = "39:10";
		const hoursWeek =
			parseInt(durationWeek.split(":")[0]) +
			parseInt(durationWeek.split(":")[1]) / 60;

		const timeLeftDay = parseFloat(8 - hoursDay).toFixed(2);
		const percentDay = parseFloat((hoursDay / 8) * 100).toFixed(0);
		const timeLeftWeek = parseFloat(40 - hoursWeek).toFixed(2);
		const percentWeek = parseFloat((hoursWeek / 40) * 100).toFixed(0);

		return [
			{
				title: () => {
					return <span>My hours this day</span>;
				},
				value: () => {
					return (
						<div className="relative">
							<div className="flex mb-2 items-center justify-between">
								<div>
									<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-800 bg-gray-200">
										{timeLeftDay > 0
											? timeLeftDay > 1
												? timeLeftDay + " hours left"
												: timeLeftDay === 1
												? timeLeftDay + " hour left"
												: 60 -
												  parseInt(
														durationDay.split(
															":"
														)[1]
												  ) +
												  " minutes left"
											: "Completed"}
									</span>
								</div>
								<div className="text-right">
									<span className="text-xs font-semibold inline-block text-blue-800">
										{percentDay + "%"}
									</span>
								</div>
							</div>
							<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
								<div
									style={{
										width: percentDay.toString() + "%",
									}}
									className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-800"
								></div>
							</div>
						</div>
					);
				},
			},
			{
				title: () => {
					return <span>My hours this week</span>;
				},
				value: () => {
					return (
						<div className="relative">
							<div className="flex mb-2 items-center justify-between">
								<div>
									<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-800 bg-gray-200">
										{timeLeftWeek > 0
											? timeLeftWeek > 1
												? timeLeftWeek + " hours left"
												: timeLeftWeek === 1
												? timeLeftWeek + " hour left"
												: 60 -
												  parseInt(
														durationWeek.split(
															":"
														)[1]
												  ) +
												  " minutes left"
											: "Completed"}
									</span>
								</div>
								<div className="text-right">
									<span className="text-xs font-semibold inline-block text-blue-800">
										{percentWeek + "%"}
									</span>
								</div>
							</div>
							<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
								<div
									style={{
										width: percentWeek.toString() + "%",
									}}
									className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-800"
								></div>
							</div>
						</div>
					);
				},
			},
		];
	};

	return (
		<section className="w-screen">
			<Title cols={titleConstants()} />
			<div className="w-full bg-white py-4">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full py-4">
						<div className="w-full flex border rounded p-5 items-center justify-between">
							<div className="flex space-x-6">
								<div className="whitespace-pre font-light text-base uppercase">
									<span>Time started:</span>
									<span className="font-medium pl-1">
										{attendance.started_at
											? moment(
													attendance.started_at
											  ).format("hh:mm A")
											: "--:-- --"}
									</span>
								</div>
								<div className="whitespace-pre font-light text-base uppercase">
									<span>Time ended:</span>
									<span className="font-medium pl-1">
										{attendance.ended_at
											? moment(
													attendance.ended_at
											  ).format("hh:mm A")
											: "--:-- --"}
									</span>
								</div>
							</div>
							<button
								onClick={() => {
									if (
										attendance.started_at &&
										!attendance.ended_at
									) {
										handleTimeOut();
									} else {
										handleTimeIn();
									}
								}}
								disabled={
									attendance.started_at && attendance.ended_at
								}
								className={
									"py-3 px-5 rounded" +
									(attendance.started_at &&
									attendance.ended_at
										? " bg-gray-300 text-gray-500 cursor-not-allowed"
										: " text-white bg-blue-800 hover:bg-blue-900 hover:underline")
								}
							>
								<div className="whitespace-pre text-base font-bold text-center">
									{attendance.started_at &&
									!attendance.ended_at
										? "Time out"
										: "Time in"}
								</div>
							</button>
						</div>
					</div>
					<Summary cols={summaryConstants()} />
				</div>
			</div>
		</section>
	);
};

export default Index;
