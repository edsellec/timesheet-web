import React from "react";
import { useHistory } from "react-router-dom";

function Index() {
	let history = useHistory();

	const testData = [
		{
			id: 1,
			code: "TEACH",
			description: "Teaching-related activities",
			dateCreated: "Sept 8, 2021 07:43 AM",
		},
		{
			id: 2,
			code: "MEET",
			description: "Meetings, seminars, and meetup-related activities",
			dateCreated: "Sept 8, 2021 07:43 AM",
		},
		{
			id: 3,
			code: "PREP",
			description: "Preparation of exams, quizzes, and projects",
			dateCreated: "Sept 8, 2021 07:43 AM",
		},
	];

	return (
		<section className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Tasks
						</div>
						<div className="whitespace-pre font-bold">
							<button
								onClick={() => history.push("/tasks/create")}
								className="w-full py-3 px-5 rounded text-white bg-black hover:underline"
							>
								<div className="whitespace-pre text-base font-bold text-center">
									Create new task
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
							Active tasks
						</div>
						<div className="w-full py-5">
							<div className="w-full border rounded">
								<div className="w-full grid grid-cols-12 gap-6 py-3 px-5">
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										No.
									</div>
									<div className="col-span-6 whitespace-pre text-base text-gray-400">
										Project code
									</div>
									<div className="col-span-3 whitespace-pre text-base text-gray-400">
										Project description
									</div>
									<div className="col-span-2 whitespace-pre text-base text-gray-400">
										Date created
									</div>
								</div>
								{testData.map((value, key) => {
									return (
										<SingleRow key={key} value={value} />
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function SingleRow({ value }) {
	return (
		<div className="w-full grid grid-cols-12 gap-6 py-3 px-5 border-t hover:bg-gray-100">
			<div className="col-span-1 whitespace-pre text-base">
				{value.id}
			</div>
			<div className="col-span-6 whitespace-pre text-base">
				{value.code}
			</div>
			<div className="col-span-3 whitespace-pre text-base">
				{value.description}
			</div>
			<div className="col-span-2 whitespace-pre text-base">
				{value.dateCreated}
			</div>
		</div>
	);
}

export default Index;
