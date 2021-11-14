import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { userFormatList } from "./../../utils";
import { Title, Summary, Table } from "./../../components/";
import { useSelector } from "react-redux";
import { headers } from "./../../config/request";

const Index = () => {
	const authUser = useSelector((state) => state.auth.user);
	const dateToday = moment().format("dddd, MMMM D");
	const history = useHistory();
	const [dataList, setDataList] = useState();
	const [formattedList, setFormattedList] = useState([]);
	const [attendance, setAttendance] = useState({
		id: null,
		started_at: null,
		ended_at: null,
	});
	const [summary, setSummary] = useState({
		totalUser: 0,
		activeUser: [],
		earlyUser: 0,
		tardyUser: 0,
		absentUser: 0,
	});

	useEffect(() => {
		if (dataList) {
			setFormattedList(userFormatList(dataList));
		}
	}, [dataList]);

	useEffect(() => {
		if (formattedList) {
			setSummary({
				...summary,
				totalUser: formattedList.length,
				activeUser: formattedList.filter(
					(row) =>
						row.attendance_today &&
						row.attendance_today.started_at &&
						row.attendance_today.ended_at === null
				),
				earlyUser: formattedList.filter(
					(row) =>
						row.attendance_today &&
						moment(row.attendance_today.started_at).isBefore(
							moment(
								moment(new Date()).set({
									hour: 7,
									minute: 31,
									seconds: 0,
									milliseconds: 0,
								})
							)
						)
				).length,
				tardyUser: formattedList.filter(
					(row) =>
						row.attendance_today &&
						row.attendance_today.duration_late
				).length,
				absentUser: formattedList.filter((row) => !row.attendance_today)
					.length,
			});
		}
	}, [formattedList]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_URL + "/users", {
				params: {},
				headers: headers,
			})
			.then((response) => {
				setDataList(response.data);
			});
	}, []);

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

	const tableConstants = () => {
		return [
			{
				title: () => {
					return <span>ID</span>;
				},
				render: (row) => {
					return <span>{row.id}</span>;
				},
			},
			{
				title: () => {
					return <span>Name</span>;
				},
				render: (row) => {
					return <span>{row.formatted_name}</span>;
				},
			},
			{
				title: () => {
					return <span>Time started</span>;
				},
				render: (row) => {
					return (
						<span>
							{row.attendance_today &&
							row.attendance_today.started_at
								? moment(
										row.attendance_today.started_at
								  ).format("LT")
								: "--:-- --"}
						</span>
					);
				},
			},
			{
				title: () => {
					return <span>Status</span>;
				},
				render: (row) => {
					return (
						<span>
							{row.attendance_today ? (
								row.attendance_today.ended_at ? (
									<span className="bg-red-600 text-white py-1 px-2 rounded">
										Inactive
									</span>
								) : (
									<span className="bg-green-600 text-white py-1 px-2 rounded">
										Active
									</span>
								)
							) : (
								<span className="bg-red-600 text-white py-1 px-2 rounded">
									Inactive
								</span>
							)}
						</span>
					);
				},
			},
		];
	};

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
		const percentEarly = parseFloat(
			(summary.earlyUser / summary.totalUser) * 100
		).toFixed(0);
		const percentTardy = parseFloat(
			(summary.tardyUser / summary.totalUser) * 100
		).toFixed(0);
		const percentAbsent = parseFloat(
			(summary.absentUser / summary.totalUser) * 100
		).toFixed(0);

		return [
			{
				title: () => {
					return <span>Logged on time</span>;
				},
				value: () => {
					return (
						<div className="relative">
							<div className="flex mb-2 items-center justify-between">
								<div>
									<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-700 bg-gray-200">
										{summary.earlyUser > 1
											? summary.earlyUser + " users"
											: summary.earlyUser + " user"}
									</span>
								</div>
								<div className="text-right">
									<span className="text-xs font-semibold inline-block text-green-700">
										{percentEarly + "%"}
									</span>
								</div>
							</div>
							<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
								<div
									style={{
										width: percentEarly.toString() + "%",
									}}
									className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-700"
								></div>
							</div>
						</div>
					);
				},
			},
			{
				title: () => {
					return <span>Tardy</span>;
				},
				value: () => {
					return (
						<div className="relative">
							<div className="flex mb-2 items-center justify-between">
								<div>
									<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-700 bg-gray-200">
										{summary.tardyUser > 1
											? summary.tardyUser + " users"
											: summary.tardyUser + " user"}
									</span>
								</div>
								<div className="text-right">
									<span className="text-xs font-semibold inline-block text-yellow-700">
										{percentTardy + "%"}
									</span>
								</div>
							</div>
							<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
								<div
									style={{
										width: percentTardy.toString() + "%",
									}}
									className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-700"
								></div>
							</div>
						</div>
					);
				},
			},
			{
				title: () => {
					return <span>Absent</span>;
				},
				value: () => {
					return (
						<div className="relative">
							<div className="flex mb-2 items-center justify-between">
								<div>
									<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-700 bg-gray-200">
										{summary.absentUser > 1
											? summary.absentUser + " users"
											: summary.absentUser + " user"}
									</span>
								</div>
								<div className="text-right">
									<span className="text-xs font-semibold inline-block text-red-700">
										{percentAbsent + "%"}
									</span>
								</div>
							</div>
							<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
								<div
									style={{
										width: percentAbsent.toString() + "%",
									}}
									className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-700"
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
					<div className="block w-full py-4">
						<div className="whitespace-pre text-lg font-bold">
							Active users today
						</div>
						<div className="w-full rounded py-5">
							<Table
								cols={tableConstants()}
								rows={summary.activeUser}
							/>
							<button
								onClick={() => history.push("/users")}
								className="w-full py-2 px-5 border-l border-b border-r hover:bg-gray-100 hover:underline"
							>
								<div className="whitespace-pre font-medium text-center">
									See more
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
