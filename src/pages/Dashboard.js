import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { userFormatList } from "./../utils";
import { Table } from "./../components/";

const Index = () => {
	const dateToday = moment().format("dddd, MMMM D");
	const history = useHistory();
	const [dataList, setDataList] = useState();
	const [formattedList, setFormattedList] = useState([]);
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
		axios.get("http://localhost:3001/api/users").then((response) => {
			setDataList(response.data);
		});
	}, []);

	const tableConstants = () => {
		return [
			{
				title: "No.",
				render: (row) => {
					return <span>{row.id}</span>;
				},
			},
			{
				title: "Name",
				render: (row) => {
					return <span>{row.formatted_name}</span>;
				},
			},
			{
				title: "Time started",
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
				title: "Status",
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
								{summary.ontime}
							</div>
						</div>
						<div className="w-full block border rounded p-5">
							<div className="whitespace-pre text-base uppercase">
								Tardy
							</div>
							<div className="whitespace-pre text-3xl font-bold">
								{summary.tardy}
							</div>
						</div>
						<div className="w-full block border rounded p-5">
							<div className="whitespace-pre text-base uppercase">
								Absent
							</div>
							<div className="whitespace-pre text-3xl font-bold">
								{summary.absent}
							</div>
						</div>
					</div>
					<div className="flex w-full space-x-6">
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
									<div className="whitespace-pre text-base font-bold text-center">
										See more
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
