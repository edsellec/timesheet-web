import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { groupFormatList } from "./../../utils";
import { Table } from "./../../components/index";

const Index = () => {
	let history = useHistory();
	const [dataList, setDataList] = useState();
	const [formattedList, setFormattedList] = useState([]);
	const [modalData, setModalData] = useState({});

	useEffect(() => {
		if (dataList) {
			setFormattedList(groupFormatList(dataList));
		}
	}, [dataList]);

	useEffect(() => {
		axios.get("http://localhost:3001/api/groups").then((response) => {
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
				title: "Group code",
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
				title: "Member count",
				render: (row) => {
					return <span>{row.user.length}</span>;
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
			{
				title: " ",
				render: (row) => {
					return (
						<button
							className="flex items-center hover:underline"
							onClick={() => handleRowClick(row)}
						>
							Expand
						</button>
					);
				},
			},
		];
	};

	function handleTableRowAction(row) {
		setModalData(row);
	}

	function handleCloseModal(row) {
		setModalData({});
	}

	return (
		<section className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Groups
						</div>
						<div className="whitespace-pre font-bold">
							<button
								onClick={() => history.push("/users/create")}
								className="w-full py-3 px-5 rounded text-white bg-black hover:underline"
							>
								<div className="whitespace-pre text-base font-bold text-center">
									Add a group
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
							Active groups
						</div>
						<div className="w-full py-5">
							<Table
								cols={tableConstants(handleTableRowAction)}
								rows={formattedList}
							/>
						</div>
						{Object.keys(modalData).length !== 0 && (
							<Modal
								props={modalData}
								handleClose={handleCloseModal}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

const Modal = ({ props, handleClose }) => {
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
		];
	};

	return (
		<>
			<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"></div>
			<div className="relative bottom-20 mx-auto p-5 border w-auto shadow-lg rounded-md bg-white">
				<div className="block w-full">
					<div className="flex w-full justify-between items-center">
						<div className="whitespace-pre text-lg font-bold">
							Active members of {props.code}
						</div>
						<div className="whitespace-pre font-bold">
							<button
								onClick={() => handleClose()}
								className="w-full p-3 rounded"
							>
								<svg
									height="24px"
									viewBox="0 0 24 24"
									width="24px"
									fill="#000000"
								>
									<path d="M0 0h24v24H0V0z" fill="none" />
									<path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
								</svg>
							</button>
						</div>
					</div>
					<div className="w-full py-5">
						<Table cols={tableConstants()} rows={props.user} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
