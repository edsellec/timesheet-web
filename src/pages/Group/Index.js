import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { groupFormatList } from "./../../utils";
import { Table } from "./../../components/index";

const Index = () => {
	let history = useHistory();
	const [dataList, setDataList] = useState();
	const [formattedList, setFormattedList] = useState([]);
	const [modalUpdateData, setModalUpdateData] = useState({});
	const [modalReadData, setModalReadData] = useState({});

	function handleFetchData() {
		const config = {
			headers: {
				Authorization: "Bearer " + window.localStorage.getItem("token"),
			},
		};

		axios
			.get(process.env.REACT_APP_API_URL + "/groups", config)
			.then((response) => {
				setDataList(response.data);
			});
	}

	useEffect(() => {
		if (dataList) {
			setFormattedList(groupFormatList(dataList));
		}
	}, [dataList]);

	useEffect(() => {
		handleFetchData();
	}, []);

	const tableConstants = ({ handleReadModal, handleUpdateModal }) => {
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
						<span className="flex space-x-6 whitespace-pre">
							<button
								className="flex items-center hover:underline"
								onClick={() => handleUpdateModal(row)}
							>
								Update
							</button>
							<button
								className="flex items-center hover:underline"
								onClick={() => handleReadModal(row)}
							>
								Add user
							</button>
						</span>
					);
				},
			},
		];
	};

	function handleUpdateModal(row) {
		setModalUpdateData(row);
	}

	function handleReadModal(row) {
		setModalReadData(row);
	}

	function handleCloseModal(row) {
		setModalUpdateData({});
		setModalReadData({});
	}

	return (
		<section className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Groups
						</div>
						<div className="whitespace-pre font-medium">
							<button
								onClick={() => history.push("/groups/create")}
								className="w-full py-3 px-5 rounded text-white bg-black hover:underline"
							>
								<div className="whitespace-pre text-base font-bold text-center">
									Create a group
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
								cols={tableConstants({
									handleReadModal,
									handleUpdateModal,
								})}
								rows={formattedList}
							/>
						</div>
						{Object.keys(modalReadData).length !== 0 && (
							<ReadModal
								props={modalReadData}
								handleFetchData={handleFetchData}
								handleClose={handleCloseModal}
							/>
						)}
						{Object.keys(modalUpdateData).length !== 0 && (
							<UpdateModal
								props={modalUpdateData}
								handleFetchData={handleFetchData}
								handleClose={handleCloseModal}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

const ReadModal = ({ props, handleFetchData, handleClose }) => {
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
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-1/2 my-6 mx-auto max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex justify-between px-5 py-3 border-b rounded-t items-center">
							<div className="whitespace-pre text-lg font-bold">
								Active members of {props.code}
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
							<Table cols={tableConstants()} rows={props.user} />
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

const UpdateModal = ({ props, handleFetchData, handleClose }) => {
	const initialValues = {
		description: props.description,
	};

	const validationSchema = Yup.object().shape({
		description: Yup.string()
			.required("No description provided.")
			.min(
				2,
				"Description is too short - should be 2 characters minimum."
			)
			.max(
				80,
				"Description is too long - should be 80 characters maximum."
			),
	});

	const onSubmit = (data) => {
		const config = {
			headers: {
				Authorization: "Bearer " + window.localStorage.getItem("token"),
			},
		};

		axios
			.put(
				process.env.REACT_APP_API_URL + "/groups/" + props.id,
				data,
				config
			)
			.then((response) => {
				handleClose();
				handleFetchData();
			});
	};

	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-1/2 my-6 mx-auto max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex justify-between px-5 py-3 border-b rounded-t items-center">
							<div className="whitespace-pre text-lg font-bold">
								Update {props.code}
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
							<Formik
								initialValues={initialValues}
								onSubmit={onSubmit}
								validationSchema={validationSchema}
							>
								{(formik) => {
									const { errors, touched, isValid, dirty } =
										formik;
									return (
										<Form className="w-full block">
											<div className="w-full block mb-6">
												<div className="w-full">
													<div className="whitespace-pre text-base font-bold uppercase">
														Description
													</div>
													<Field
														autoComplete="off"
														type="text"
														name="description"
														placeholder="Ex. A teaching activity"
														className={
															"w-full bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
															(errors.description &&
															touched.description
																? " border-red-500"
																: null)
														}
													/>
													<ErrorMessage
														name="description"
														component="div"
														className="whitespace-pre pt-1 text-base text-red-600"
													/>
												</div>
											</div>
											<div className="w-full block">
												<div className="w-full pt-4">
													<button
														type="submit"
														className={
															"py-3 px-5 rounded" +
															(!(dirty && isValid)
																? "  bg-gray-300 text-gray-500 cursor-not-allowed"
																: " bg-black text-white hover:bg-gray-900")
														}
														disabled={
															!(dirty && isValid)
														}
													>
														<div className="whitespace-pre text-base font-bold text-center">
															Update group
														</div>
													</button>
												</div>
											</div>
										</Form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

export default Index;
