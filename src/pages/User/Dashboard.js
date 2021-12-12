import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Title, Summary } from "./../../components/";
import { useSelector } from "react-redux";
import { headers } from "./../../config/request";
import { summaryTimesheetFormat } from "./../../utils";

const Index = () => {
	const authUser = useSelector((state) => state.auth.user);
	const dateToday = moment().format("dddd, MMMM D");
	const history = useHistory();
	const [attendance, setAttendance] = useState({
		id: null,
		started_at: null,
		ended_at: null,
	});
	const [summaryTimesheet, setSummaryTimesheet] = useState();

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

			axios
				.get(
					process.env.REACT_APP_API_URL +
						"/timesheets/" +
						authUser.id,
					{
						params: {
							before: moment(
								new Date(2018, 11, 24, 10, 33, 30, 0)
							).format("YYYY-MM-DD"),
							after: moment(new Date()).format("YYYY-MM-DD"),
						},
						headers: headers,
					}
				)
				.then((response) => {
					setSummaryTimesheet(summaryTimesheetFormat(response.data));
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
		const timeLeftDay = parseFloat(
			8 - summaryTimesheet.durationDay
		).toFixed(2);
		const percentDay = parseFloat(
			(summaryTimesheet.durationDay / 8) * 100
		).toFixed(0);

		const timeLeftWeek = parseFloat(
			40 - summaryTimesheet.durationWeek
		).toFixed(2);
		const percentWeek = parseFloat(
			(summaryTimesheet.durationWeek / 40) * 100
		).toFixed(0);

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
												  summaryTimesheet.minutesDay +
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
												  summaryTimesheet.minutesWeek +
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
					{summaryTimesheet && <Summary cols={summaryConstants()} />}
				</div>
			</div>
		</section>
	);
};

export default Index;
