import React from "react";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
	const history = useHistory();

	return (
		<header className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="flex sm:w-2/3 mx-auto items-center space-x-24">
					<div className="whitespace-pre font-bold text-xl">
						Timesheet
					</div>
					{window.localStorage.getItem("token") ? (
						<div className="flex w-full justify-between">
							<div className="space-x-12">
								<Link
									to="/"
									className="whitespace-pre font-medium hover:underline"
								>
									Dashboard
								</Link>
								<Link
									to="/timesheets"
									className="whitespace-pre font-medium hover:underline"
								>
									Timesheet
								</Link>
								<Link
									to="/groups"
									className="whitespace-pre font-medium hover:underline"
								>
									Group
								</Link>
								<Link
									to="/users"
									className="whitespace-pre font-medium hover:underline"
								>
									Users
								</Link>
								<Link
									to="/activities"
									className="whitespace-pre font-medium hover:underline"
								>
									Activities
								</Link>
							</div>
							<div className="space-x-12">
								<button
									onClick={() => {
										window.localStorage.removeItem("token");
										history.go(0);
									}}
									className="whitespace-pre font-medium hover:underline"
								>
									Log out
								</button>
							</div>
						</div>
					) : (
						<div className="flex w-full justify-end">
							<div className="space-x-12">
								<Link
									to="/login"
									className="whitespace-pre font-bold hover:underline"
								>
									Log in
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
