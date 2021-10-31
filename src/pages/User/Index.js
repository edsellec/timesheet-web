import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { userFormatList } from "./../../utils";
import { Table } from "./../../components/index";

const Index = () => {
	let history = useHistory();
	const [dataList, setDataList] = useState();
	const [formattedList, setFormattedList] = useState([]);

	useEffect(() => {
		if (dataList) {
			setFormattedList(userFormatList(dataList));
		}
	}, [dataList]);

	useEffect(() => {
		const config = {
			headers: {
				Authorization: "Bearer " + window.localStorage.getItem("token"),
			},
		};

		axios
			.get(process.env.REACT_APP_API_URL + "/users", config)
			.then((response) => {
				setDataList(response.data);
			});
	}, []);

	const tableConstants = (handleRowClick) => {
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
				title: "Group",
				render: (row) => {
					return <span>{row.group.code}</span>;
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
				title: "Time ended",
				render: (row) => {
					return (
						<span>
							{row.attendance_today &&
							row.attendance_today.ended_at
								? moment(row.attendance_today.ended_at).format(
										"LT"
								  )
								: "--:-- --"}
						</span>
					);
				},
			},
			{
				title: "Hours active",
				render: (row) => {
					return (
						<span>
							{row.attendance_today
								? row.attendance_today.duration_logged_in
								: "--:--"}
						</span>
					);
				},
			},
			{
				title: "Minutes tardy",
				render: (row) => {
					return (
						<span>
							{row.attendance_today &&
							row.attendance_today.duration_late
								? row.attendance_today.duration_late
								: "--:--"}
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

	function handleTableRowAction(row) {
		console.log(row);
	}

	return (
		<section className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Users
						</div>
						<div className="whitespace-pre font-medium">
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
							<Table
								cols={tableConstants(handleTableRowAction)}
								rows={formattedList}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
