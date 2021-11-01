import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { config } from "./../../../config/request";

const Create = () => {
	const history = useHistory();
	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
	};

	const validationSchema = Yup.object().shape({
		firstName: Yup.string()
			.required("No first name provided.")
			.min(2, "First name is too short - should be 2 characters minimum.")
			.max(
				40,
				"First name is too long - should be 40 characters maximum."
			)
			.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
		lastName: Yup.string()
			.required("No last name provided.")
			.min(2, "Last name is too short - should be 2 characters minimum.")
			.max(80, "Last name is too long - should be 80 characters maximum.")
			.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
		email: Yup.string()
			.required("No email address provided")
			.max(
				255,
				"Email address is too long - should be 255 characters maximum."
			)
			.email("Invalid email format"),
	});

	const onSubmit = (data) => {
		axios
			.post(process.env.REACT_APP_API_URL + "/users", data, config)
			.then((response) => {
				history.push("/users");
			});
	};

	return (
		<section className="w-screen">
			<div className="sm:w-2/3 mx-auto">
				<div className="w-full bg-white py-4">
					<div className="block  items-center">
						<div className="flex w-full justify-between py-4">
							<div className="whitespace-pre text-3xl font-bold">
								Add a user
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
									<Form className="w-full block space-y-12">
										<div className="w-full block">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#1 "}</span>
												Enter the account's name
											</div>
											<div className="flex w-2/3 pt-4 space-x-4">
												<div className="w-full pt-4">
													<div className="whitespace-pre text-base font-bold uppercase">
														First Name:
													</div>
													<Field
														autoComplete="off"
														type="text"
														name="firstName"
														placeholder="Ex. John"
														className={
															"w-full bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
															(errors.firstName &&
															touched.firstName
																? " border-red-500"
																: null)
														}
													/>
													<ErrorMessage
														name="firstName"
														component="div"
														className="whitespace-pre pt-1 text-base text-red-600"
													/>
												</div>
												<div className="w-full pt-4">
													<div className="whitespace-pre text-base font-bold uppercase">
														Last Name:
													</div>
													<Field
														autoComplete="off"
														type="text"
														name="lastName"
														placeholder="Ex. Doe"
														className={
															"w-full bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
															(errors.lastName &&
															touched.lastName
																? " border-red-500"
																: null)
														}
													/>
													<ErrorMessage
														name="lastName"
														component="div"
														className="whitespace-pre pt-1 text-base text-red-600"
													/>
												</div>
											</div>
										</div>
										<div className="w-full block">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#2 "}</span>
												Add a valid email address:
											</div>
											<div className="w-full pt-4">
												<div className="whitespace-pre text-base font-bold uppercase">
													Email address:
												</div>
												<Field
													autoComplete="off"
													type="text"
													name="email"
													placeholder="Ex. johndoe@gmail.com"
													className={
														"w-2/3 bg-gray-100 rounded mt-2 p-3 whitespace-pre text-base border focus:bg-white" +
														(errors.email &&
														touched.email
															? " border-red-500"
															: null)
													}
												/>
												<ErrorMessage
													name="email"
													component="div"
													className="whitespace-pre pt-1 text-base text-red-600"
												/>
											</div>
										</div>
										<div className="w-full block">
											<div className="whitespace-pre text-xl font-bold">
												<span>{"#3 "}</span>
												Finalize creating the account
											</div>
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
													<div className="whitespace-pre font-medium text-center">
														Create an Account
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
