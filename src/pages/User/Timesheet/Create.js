import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { headers } from "./../../../config/request";
import { activityFormatList } from "./../../../utils";

const Create = () => {
	const history = useHistory();
	const initialValues = {
		activity_id: "",
		description: "",
		hours: 0,
		minutes: 1,
	};
	const [formattedList, setFormattedList] = useState([]);
	const [dataList, setDataList] = useState();

	function handleFetchData() {
		axios
			.get(process.env.REACT_APP_API_URL + "/activities", {
				params: {},
				headers: headers,
			})
			.then((response) => {
				setDataList(response.data);
			});
	}

	useEffect(() => {
		if (dataList) {
			setFormattedList(activityFormatList(dataList));
		}
	}, [dataList]);

	useEffect(() => {
		handleFetchData();
	}, []);

	const validationSchema = Yup.object().shape({
		activity_id: Yup.string().required("No group code provided."),
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
		hours: Yup.number()
			.required("No hours entered.")
			.min(0, "Hours worked can't start with a minus")
			.integer("Hours worked can't include a decimal point"),
		minutes: Yup.number()
			.required("No minutes entered.")
			.positive("Hours worked can't start with a minus")
			.integer("Minutes worked can't include a decimal point"),
	});

	const onSubmit = (data) => {
		axios
			.post(process.env.REACT_APP_API_URL + "/timesheets", data, {
				params: {},
				headers: headers,
			})
			.then((response) => {
				history.push("/timesheets");
			});
	};

	return (
		<section className="w-screen">
			<div className="sm:w-2/3 mx-auto">
				<div className="w-full bg-white py-4">
					<div className="block  items-center">
						<div className="flex w-full justify-between py-4">
							<div className="whitespace-pre text-3xl font-bold">
								Create a timesheet entry
							</div>
						</div>
					</div>
				</div>
				<div className="w-full bg-white">
					<div className="block items-center">
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
										<div className="w-full block mb-12">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#1 "}</span>
												Select the activity code
											</div>
											<div className="w-full pt-4">
												<div className="whitespace-pre text-base font-bold uppercase">
													Activity code:
												</div>
												<Field
													autoComplete="off"
													component="select"
													name="activity_id"
													placeholder="Ex. PROEJCT"
													className={
														"w-1/4 bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
														(errors.activity_id &&
														touched.activity_id
															? " border-red-500"
															: null)
													}
												>
													<option disabled value="">
														{" "}
														-- Select an option --{" "}
													</option>
													{formattedList.map(
														(item, index) => (
															<option
																key={index}
																value={item.id}
															>
																{item.code}
															</option>
														)
													)}
												</Field>
												<ErrorMessage
													name="activity_id"
													component="div"
													className="whitespace-pre pt-1 text-base text-red-600"
												/>
											</div>
										</div>
										<div className="w-full block mb-12">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#2 "}</span>
												Enter the entry's description
											</div>
											<div className="w-full pt-4">
												<div className="whitespace-pre text-base font-bold uppercase">
													Description
												</div>
												<Field
													autoComplete="off"
													type="text"
													name="description"
													placeholder="Ex. Prepared lesson plan for the said activity"
													className={
														"w-2/3 bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
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
										<div className="w-full block mb-12">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#3 "}</span>
												Enter hours wokred
											</div>
											<div className="flex w-1/4 pt-4 space-x-3">
												<div className="w-full">
													<div className="whitespace-pre text-base font-bold uppercase">
														Hours:
													</div>
													<Field
														autoComplete="off"
														type="number"
														name="hours"
														placeholder="00"
														className={
															"w-full bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
															(errors.hours &&
															touched.hours
																? " border-red-500"
																: null)
														}
													/>
													<ErrorMessage
														name="hours"
														component="div"
														className="whitespace-pre pt-1 text-base text-red-600"
													/>
												</div>
												<div className="w-full">
													<div className="whitespace-pre text-base font-bold uppercase">
														Minutes:
													</div>
													<Field
														autoComplete="off"
														type="number"
														name="minutes"
														placeholder="00"
														className={
															"w-full bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
															(errors.minutes &&
															touched.minutes
																? " border-red-500"
																: null)
														}
													/>
													<ErrorMessage
														name="minutes"
														component="div"
														className="whitespace-pre pt-1 text-base text-red-600"
													/>
												</div>
											</div>
										</div>
										<div className="w-full block">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#4 "}</span>
												Finalize creating your entry
											</div>
											<div className="w-full pt-4">
												<button
													type="submit"
													className={
														"py-3 px-5 rounded" +
														(!(dirty && isValid)
															? " bg-gray-300 text-gray-500 cursor-not-allowed"
															: " bg-blue-800 text-white hover:bg-blue-900")
													}
													disabled={
														!(dirty && isValid)
													}
												>
													<div className="whitespace-pre font-medium text-center">
														Create an Entry
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
		</section>
	);
};

export default Create;
