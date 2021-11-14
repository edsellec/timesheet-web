import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Title, Table } from "./../../../components/index";
import { useSelector } from "react-redux";
import { headers } from "./../../../config/request";

const Index = () => {
	const authUser = useSelector((state) => state.auth.user);
	let history = useHistory();
	const dateToday = moment().format("dddd, MMMM D");
	const [dataList, setDataList] = useState();
	const [formattedList, setFormattedList] = useState([]);
	const [modalData, setModalData] = useState({});

	useEffect(() => {
		if (dataList) {
			setFormattedList(dataList);
		}
	}, [dataList]);

	useEffect(() => {
		if (authUser) {
			axios
				.get(
					process.env.REACT_APP_API_URL +
						"/timesheets/" +
						authUser.id,
					{
						params: {
							before: new Date(),
							after: new Date(),
						},
						headers: headers,
					}
				)
				.then((response) => {
					setDataList(response.data);
				});
		}
	}, [authUser]);

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
					return <span>Description</span>;
				},
				render: (row) => {
					return <span>{row.description}</span>;
				},
			},
			{
				title: () => {
					return <span>Activity code</span>;
				},
				render: (row) => {
					return <span>{row.activity.code}</span>;
				},
			},
			{
				title: () => {
					return <span>Hours worked</span>;
				},
				render: (row) => {
					return <span>{row.hours_worked}</span>;
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

	const titleConstants = () => {
		return [
			{
				title: () => {
					return (
						<div className="whitespace-pre text-3xl font-bold">
							Timesheet
						</div>
					);
				},
			},
			{
				title: () => {
					return (
						<div className="whitespace-pre font-medium">
							<button
								onClick={() =>
									history.push("/timesheets/create")
								}
								className="w-full py-3 px-5 rounded text-white bg-blue-800 hover:bg-blue-900 hover:underline"
							>
								<div className="whitespace-pre text-base font-bold text-center">
									Create an entry
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
							Submitted on {dateToday}
						</div>
						<div className="w-full py-5">
							<Table
								cols={tableConstants(handleTableRowAction)}
								rows={formattedList}
							/>
							{formattedList.length <= 0 && (
								<div className="w-full py-2 px-5 border-l border-b border-r">
									<div className="whitespace-pre text-center">
										You haven't added anything yet
									</div>
								</div>
							)}
						</div>
						{Object.keys(modalData).length !== 0 && (
							<ReadModal
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

const ReadModal = ({ props, handleClose }) => {
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
					return <span>Description</span>;
				},
				render: (row) => {
					return <span>{row.description}</span>;
				},
			},
			{
				title: () => {
					return <span>Activity code</span>;
				},
				render: (row) => {
					return <span>{row.activity.code}</span>;
				},
			},
			{
				title: () => {
					return <span>Hours worked</span>;
				},
				render: (row) => {
					return <span>{row.hours_worked}</span>;
				},
			},
		];
	};

	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-1/2 my-6 mx-auto max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex justify-between px-5 py-3 border-b rounded-t items-center">
							<div className="whitespace-pre text-lg font-bold">
								Timesheet for {props.formatted_name}
							</div>
							<div className="whitespace-pre font-medium">
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
						<div className="relative px-6 pt-6 pb-12 w-full">
							<Table
								cols={tableConstants()}
								rows={props.timesheet}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

export default Index;
