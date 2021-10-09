import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { activityFormatList } from "./../../utils";
import { Table } from "./../../components/index";

const Index = () => {
	let history = useHistory();
	const [dataList, setDataList] = useState();
	const [formattedList, setFormattedList] = useState([]);

	useEffect(() => {
		if (dataList) {
			setFormattedList(activityFormatList(dataList));
		}
	}, [dataList]);

	useEffect(() => {
		axios.get("http://localhost:3001/api/activities").then((response) => {
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
				title: "Code",
				render: (row) => {
					return <span>{row.code}</span>;
				},
			},
			{
				title: "Description",
				render: (row) => {
					return <span>{row.description}</span>;
				},
			},
			{
				title: "Date created",
				render: (row) => {
					return (
						<span>
							{row.created_at
								? moment(row.created_at).format("lll")
								: "--:-- --"}
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
							Activities
						</div>
						<div className="whitespace-pre font-bold">
							<button
								onClick={() =>
									history.push("/activities/create")
								}
								className="w-full py-3 px-5 rounded text-white bg-black hover:underline"
							>
								<div className="whitespace-pre text-base font-bold text-center">
									Create new activity
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
							Active activities
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
