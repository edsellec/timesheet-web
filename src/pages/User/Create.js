import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

const Create = () => {
	const history = useHistory();
	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
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
		password: Yup.string()
			.required("No password provided.")
			.min(8, "Password is too short - should be 8 characters minimum."),
		// .matches(
		// 	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		// 	"Password must contain eight (8) characters, one (1) uppercase, one (1) lowercase, one (1) number and one (1) special case character."
		// ),
	});

	const onSubmit = (data) => {
		axios.post("http://localhost:3001/api/users", data).then((response) => {
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
							<Form className="w-full block">
								<div className="w-full block mb-12">
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
												className="w-full bg-gray-200 rounded mt-2 p-3 whitespace-pre text-base"
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
												className="w-full bg-gray-200 rounded mt-2 p-3 whitespace-pre text-base"
											/>
											<ErrorMessage
												name="lastName"
												component="div"
												className="whitespace-pre pt-1 text-base text-red-600"
											/>
										</div>
									</div>
								</div>
								<div className="w-full block mb-12">
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
											className="w-2/3 bg-gray-200 rounded mt-2 p-3 whitespace-pre text-base"
										/>
										<ErrorMessage
											name="email"
											component="div"
											className="whitespace-pre pt-1 text-base text-red-600"
										/>
									</div>
								</div>
								<div className="w-full block mb-12">
									<div className="whitespace-pre text-xl font-bold">
										<span>{"#3 "}</span>
										Enter a secure password:
									</div>
									<div className="w-full pt-4">
										<div className="whitespace-pre text-base font-bold uppercase">
											Password
										</div>
										<Field
											autoComplete="off"
											type="password"
											name="password"
											placeholder=""
											className="w-2/3 bg-gray-200 rounded mt-2 p-3 whitespace-pre text-base"
										/>
										<ErrorMessage
											name="password"
											component="div"
											className="whitespace-pre pt-1 text-base text-red-600"
										/>
									</div>
								</div>
								<div className="w-full block">
									<div className="whitespace-pre text-xl font-bold">
										<span>{"#4 "}</span>
										Finalize creating the account
									</div>
									<div className="w-full pt-4">
										<button
											type="submit"
											className="py-3 px-5 rounded text-white bg-black hover:underline"
										>
											<div className="whitespace-pre text-base font-bold text-center">
												Create an Account
											</div>
										</button>
									</div>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Create;
