import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Create = () => {
	const history = useHistory();
	const [status, setStatus] = useState(null);
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	console.log(process.env.REACT_APP_API_URL);

	const handleLoginWithGoogle = () => {
		setStatus(null);

		signInWithPopup(auth, provider)
			.then((result) => {
				let data = { email: result.user.email };
				axios
					.post(process.env.REACT_APP_API_URL + "/login", data)
					.then((response) => {
						if (response.data) {
							auth.currentUser.getIdToken().then((token) => {
								window.localStorage.setItem("token", token);
								history.go(0);
							});
						} else {
							setStatus(
								"Account is not added by the administrator"
							);
						}
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<section className="w-screen">
			<div className="sm:w-2/3 mx-auto">
				<div className="w-full bg-white py-4">
					<div className="block  items-center">
						<div className="flex w-full justify-between py-4">
							<div className="whitespace-pre text-3xl font-bold">
								Log in to your account
							</div>
						</div>
					</div>
				</div>
				<div className="w-full bg-white">
					<div className="block items-center">
						<div className="w-full space-y-2">
							<button
								onClick={handleLoginWithGoogle}
								className="py-3 px-5 rounded text-white bg-black hover:underline"
							>
								<div className="whitespace-pre font-medium text-center">
									Log in with Google
								</div>
							</button>
							{status && (
								<div className="whitespace-pre text-red-600">
									{status}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Create;
