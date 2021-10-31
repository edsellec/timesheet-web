import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { userFormatList } from "./../utils";
import { Table } from "./../components/";
import { useSelector } from "react-redux";
import { config } from "../config/request";

const Index = () => {
	const user = useSelector((state) => state.auth.user);
	const dateToday = moment().format("dddd, MMMM D");
	const history = useHistory();
	const [dataList, setDataList] = useState();
	const [formattedList, setFormattedList] = useState([]);
	const [attendance, setAttendance] = useState({
		started_at: null,
		ended_at: null,
	});
	const [summary, setSummary] = useState({
		activeUsers: [],
		ontime: 0,
		tardy: 0,
		absent: 0,
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
				activeUsers: formattedList.filter(
					(row) =>
						row.attendance_today &&
						row.attendance_today.started_at &&
						row.attendance_today.ended_at === null
				),
				ontime: formattedList.filter(
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
				tardy: formattedList.filter(
					(row) =>
						row.attendance_today &&
						row.attendance_today.duration_late
				).length,
				absent: formattedList.filter((row) => !row.attendance_today)
					.length,
			});
		}
	}, [formattedList]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_URL + "/users", config)
			.then((response) => {
				setDataList(response.data);
			});
	}, []);

	useEffect(() => {
		if (user) {
			axios
				.get(
					process.env.REACT_APP_API_URL + "/attendance/" + user.id,
					config
				)
				.then((response) => {
					if (response) {
						setAttendance({
							started_at: response.data.started_at,
							ended_at: response.data.ended_at,
						});
					} else {
						setAttendance({
							started_at: null,
							ended_at: null,
						});
					}
				});
		}
	}, [user]);

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

	return (
		<section className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Dashboard
						</div>
						<div className="whitespace-pre font-medium">
							{dateToday}
						</div>
					</div>
				</div>
			</div>
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
							<button className="py-3 px-5 rounded text-white bg-black hover:underline">
								<div className="whitespace-pre text-base font-bold text-center">
									{!attendance.ended_at
										? "Time out"
										: "Time in"}
								</div>
							</button>
						</div>
					</div>
					<div className="flex w-full justify-between space-x-6 py-4">
						<div className="w-full block border rounded p-5">
							<div className="whitespace-pre font-light text-base uppercase">
								Logged on time
							</div>
							<div className="whitespace-pre text-3xl font-bold">
								{summary.ontime}
							</div>
						</div>
						<div className="w-full block border rounded p-5">
							<div className="whitespace-pre font-light text-base uppercase">
								Tardy
							</div>
							<div className="whitespace-pre text-3xl font-bold">
								{summary.tardy}
							</div>
						</div>
						<div className="w-full block border rounded p-5">
							<div className="whitespace-pre font-light text-base uppercase">
								Absent
							</div>
							<div className="whitespace-pre text-3xl font-bold">
								{summary.absent}
							</div>
						</div>
					</div>
					<div className="block w-full py-4">
						<div className="whitespace-pre text-lg font-bold">
							Active users today
						</div>
						<div className="w-full rounded py-5">
							<Table
								cols={tableConstants()}
								rows={summary.activeUsers}
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
