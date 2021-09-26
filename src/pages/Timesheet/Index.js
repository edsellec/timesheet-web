import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

function Index() {
	const dateToday = moment().format("dddd, MMMM D");
	let history = useHistory();

	const testData = [
		{
			id: 1,
			name: "Cadenas, Edselle",
			team: "TLE-A",
			hoursWorked: "10:12",
			work: [
				{
					id: 1,
					description:
						"TEAM COMMUNICATION: Checking emails and taking action / Email and Messenger messages",
					projectCode: "TEACH",
					hoursWorked: "05:00",
				},
				{
					id: 2,
					description: "Weekly meeting with Head Teacher",
					projectCode: "MEET",
					hoursWorked: "05:12",
				},
			],
		},
		{
			id: 2,
			name: "Sample, Test",
			team: "TLE-B",
			hoursWorked: "10:12",
			work: [
				{
					id: 1,
					description:
						"TEAM COMMUNICATION: Checking emails and taking action / Email and Messenger messages",
					projectCode: "TEACH",
					hoursWorked: "05:00",
				},
				{
					id: 2,
					description: "Weekly meeting with Head Teacher",
					projectCode: "MEET",
					hoursWorked: "05:12",
				},
			],
		},
		{
			id: 3,
			name: "Doe, John",
			team: "TLE-C",
			hoursWorked: "10:12",
			work: [
				{
					id: 1,
					description:
						"TEAM COMMUNICATION: Checking emails and taking action / Email and Messenger messages",
					projectCode: "TEACH",
					hoursWorked: "05:00",
				},
				{
					id: 2,
					description: "Weekly meeting with Head Teacher",
					projectCode: "MEET",
					hoursWorked: "05:12",
				},
			],
		},
	];

	return (
		<section className="w-screen">
			<div className="w-full bg-white py-4 border-b">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full justify-between py-4">
						<div className="whitespace-pre text-3xl font-bold">
							Timesheet
						</div>
					</div>
				</div>
			</div>
			<div className="w-full bg-white py-4">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="block w-full py-4">
						<div className="whitespace-pre text-lg font-bold">
							Submitted on {dateToday}
						</div>
						<div className="w-full py-5">
							<div className="w-full border rounded">
								<div className="w-full grid grid-cols-12 gap-6 py-3 px-5">
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										No.
									</div>
									<div className="col-span-8 whitespace-pre text-base text-gray-400">
										Name
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Team
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Hours worked
									</div>
									<div className="col-span-1 whitespace-pre text-base text-gray-400">
										Action
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
	const [rowExpand, setRowExpand] = useState(false);
	console.log(value.id + ": " + rowExpand);

	return (
		<div className="w-full block py-3 px-5 border-t hover:bg-gray-100">
			<div className="w-full grid grid-cols-12 gap-6">
				<div className="col-span-1 whitespace-pre text-base">
					{value.id}
				</div>
				<div className="col-span-8 whitespace-pre text-base">
					{value.name}
				</div>
				<div className="col-span-1 whitespace-pre text-base">
					{value.team}
				</div>
				<div className="col-span-1 whitespace-pre text-base">
					{value.hoursWorked}
				</div>
				<div className="col-span-1 whitespace-pre text-base">
					{rowExpand ? (
						<button
							onClick={() => {
								setRowExpand(!rowExpand);
							}}
							className="rounded"
						>
							Collapse
						</button>
					) : (
						<button
							onClick={() => {
								setRowExpand(!rowExpand);
							}}
							className="rounded"
						>
							Expand
						</button>
					)}
				</div>
			</div>
			{rowExpand && (
				<div className="w-full bg-gray-200 border rounded mt-3">
					<div className="w-full grid grid-cols-12 gap-6 py-2 px-5">
						<div className="col-span-1 whitespace-pre text-base text-gray-500">
							No.
						</div>
						<div className="col-span-8 whitespace-pre text-base text-gray-500">
							Task description
						</div>
						<div className="col-span-1 whitespace-pre text-base text-gray-500">
							Task code
						</div>
						<div className="col-span-2 whitespace-pre text-base text-gray-500">
							Hours worked
						</div>
					</div>
					{value.work.map((value, key) => {
						return <ExpandedSingleRow key={key} value={value} />;
					})}
				</div>
			)}
		</div>
	);
}

function ExpandedSingleRow({ value }) {
	return (
		<div className="w-full grid grid-cols-12 gap-6 py-3 px-5 border-t bg-white">
			<div className="col-span-1 whitespace-pre text-base">
				{value.id}
			</div>
			<div className="col-span-8 whitespace-pre text-base">
				{value.description}
			</div>
			<div className="col-span-1 whitespace-pre text-base">
				{value.projectCode}
			</div>
			<div className="col-span-2 whitespace-pre text-base">
				{value.hoursWorked}
			</div>
		</div>
	);
}

export default Index;
