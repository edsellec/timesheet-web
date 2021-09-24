import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

function Create() {
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
			// console.log("Successfully created an account!");
			history.push("/");
		});
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form>
					<label>First Name: </label>
					<ErrorMessage name="firstName" component="span" />
					<Field
						autoComplete="off"
						type="text"
						name="firstName"
						placeholder="Ex. John"
					/>
					<label>Last Name: </label>
					<ErrorMessage name="lastName" component="span" />
					<Field
						autoComplete="off"
						type="text"
						name="lastName"
						placeholder="Ex. Doe"
					/>
					<label>Email: </label>
					<ErrorMessage name="email" component="span" />
					<Field
						autoComplete="off"
						type="text"
						name="email"
						placeholder="Ex. johndoe@gmail.com"
					/>
					<label>Password: </label>
					<ErrorMessage name="password" component="span" />
					<Field
						autoComplete="off"
						type="password"
						name="password"
						placeholder="password"
					/>

					<button type="submit">Create an Account</button>
				</Form>
			</Formik>
		</div>
	);
}

export default Create;
