import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

const Create = () => {
	const history = useHistory();
	const initialValues = {
		code: "",
		description: "",
	};

	const validationSchema = Yup.object().shape({
		code: Yup.string()
			.required("No group code provided.")
			.min(2, "Group code is too short - should be 2 characters minimum.")
			.max(6, "Group code is too long - should be 6 characters maximum.")
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
			.post("http://localhost:3001/api/groups", data)
			.then((response) => {
				history.push("/groups");
			});
	};

	return (
		<section className="w-screen">
			<div className="sm:w-2/3 mx-auto">
				<div className="w-full bg-white py-4">
					<div className="block  items-center">
						<div className="flex w-full justify-between py-4">
							<div className="whitespace-pre text-3xl font-bold">
								Create a group
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
										Enter the group's code name
									</div>
									<div className="w-full pt-4">
										<div className="whitespace-pre text-base font-bold uppercase">
											Group code:
										</div>
										<Field
											autoComplete="off"
											type="text"
											name="code"
											placeholder="Ex. TEAM"
											className="w-1/3 bg-gray-200 rounded mt-2 p-3 whitespace-pre text-base"
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
										Enter the group's description
									</div>
									<div className="w-full pt-4">
										<div className="whitespace-pre text-base font-bold uppercase">
											Description
										</div>
										<Field
											autoComplete="off"
											type="text"
											name="description"
											placeholder="Ex. For teachers in specific subject"
											className="w-2/3 bg-gray-200 rounded mt-2 p-3 whitespace-pre text-base"
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
										Finalize creating the group
									</div>
									<div className="w-full pt-4">
										<button
											type="submit"
											className="py-3 px-5 rounded text-white bg-black hover:underline"
										>
											<div className="whitespace-pre text-base font-bold text-center">
												Create a Group
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
