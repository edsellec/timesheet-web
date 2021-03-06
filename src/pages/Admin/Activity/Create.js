import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { headers } from "./../../../config/request";

const Create = () => {
	const history = useHistory();
	const initialValues = {
		code: "",
		description: "",
	};

	const validationSchema = Yup.object().shape({
		code: Yup.string()
			.required("No activity code provided.")
			.min(
				2,
				"Acivity code is too short - should be 2 characters minimum."
			)
			.max(
				5,
				"Acivity code is too long - should be 5 characters maximum."
			)
			.matches(/[a-zA-Z]/, "Group code can only contain Latin letters."),
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
		axios
			.post(process.env.REACT_APP_API_URL + "/activities", data, {
				params: {},
				headers: headers,
			})
			.then((response) => {
				history.push("/activities");
			});
	};

	return (
		<section className="w-screen">
			<div className="sm:w-2/3 mx-auto">
				<div className="w-full bg-white py-4">
					<div className="block  items-center">
						<div className="flex w-full justify-between py-4">
							<div className="whitespace-pre text-3xl font-bold">
								Create an activity
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
												Enter the activity code name
											</div>
											<div className="w-full pt-4">
												<div className="whitespace-pre text-base font-bold uppercase">
													Activity code:
												</div>
												<Field
													autoComplete="off"
													type="text"
													name="code"
													placeholder="Ex. TEACH"
													className={
														"w-1/3 bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
														(errors.code &&
														touched.code
															? " border-red-500"
															: null)
													}
												/>
												<ErrorMessage
													name="code"
													component="div"
													className="whitespace-pre pt-1 text-base text-red-600"
												/>
											</div>
										</div>
										<div className="w-full block mb-12">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#2 "}</span>
												Enter the activiy description
											</div>
											<div className="w-full pt-4">
												<div className="whitespace-pre text-base font-bold uppercase">
													Description
												</div>
												<Field
													autoComplete="off"
													type="text"
													name="description"
													placeholder="Ex. A teaching activity"
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
										<div className="w-full block">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#3 "}</span>
												Finalize creating the activity
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
													<div className="whitespace-pre text-base font-medium text-center">
														Create an activity
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
