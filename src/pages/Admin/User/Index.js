import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { userFormatList } from "./../../../utils";
import { Title, Table } from "./../../../components/index";
import { config } from "./../../../config/request";

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
		axios
			.get(process.env.REACT_APP_API_URL + "/users", config)
			.then((response) => {
				setDataList(response.data);
			});
	}, []);

	const tableConstants = (handleRowClick) => {
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
					return <span>Group</span>;
				},
				render: (row) => {
					return <span>{row.group.code}</span>;
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
					return <span>Time ended</span>;
				},
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
				title: () => {
					return <span>Hours active</span>;
				},
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
				title: () => {
					return <span>Hours tardy</span>;
				},
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

	function handleTableRowAction(row) {
		console.log(row);
	}

	const titleConstants = () => {
		return [
			{
				title: () => {
					return (
						<div className="whitespace-pre text-3xl font-bold">
							Users
						</div>
					);
				},
			},
			{
				title: () => {
					return (
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
