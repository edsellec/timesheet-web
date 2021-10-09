import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="flex sm:w-2/3 mx-auto items-center space-x-24">
					<div className="whitespace-pre font-bold text-xl">
						Timelycord
					</div>
					<div className="space-x-12">
						<Link
							to="/"
							className="whitespace-pre font-bold hover:underline"
						>
							Dashboard
						</Link>
						<Link
							to="/timesheets"
							className="whitespace-pre font-bold hover:underline"
						>
							Timesheet
						</Link>
						<Link
							to="/groups"
							className="whitespace-pre font-bold hover:underline"
						>
							Group
						</Link>
						<Link
							to="/users"
							className="whitespace-pre font-bold hover:underline"
						>
							Users
						</Link>
						<Link
							to="/activities"
							className="whitespace-pre font-bold hover:underline"
						>
							Activities
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
