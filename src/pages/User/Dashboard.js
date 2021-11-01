import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Title } from "./../../components/";
import { useSelector } from "react-redux";
import { config } from "./../../config/request";

const Index = () => {
	const authUser = useSelector((state) => state.auth.user);
	const dateToday = moment().format("dddd, MMMM D");
	const history = useHistory();
	const [attendance, setAttendance] = useState({
		id: null,
		started_at: null,
		ended_at: null,
	});

	useEffect(() => {
		if (authUser) {
			axios
				.get(
					process.env.REACT_APP_API_URL +
						"/attendance/" +
						authUser.id,
					config
				)
				.then((response) => {
					if (response) {
						setAttendance({
							id: response.data.id,
							started_at: response.data.started_at,
							ended_at: response.data.ended_at,
						});
					} else {
						setAttendance({
							id: null,
							started_at: null,
							ended_at: null,
						});
					}
				});
		}
	}, [authUser]);

	function handleTimeIn() {
		let data = { user_id: authUser.id };
		axios
			.post(process.env.REACT_APP_API_URL + "/attendance", data, config)
			.then((response) => {
				history.go(0);
			});
	}

	function handleTimeOut() {
		let data = { id: attendance.id };
		axios
			.put(
				process.env.REACT_APP_API_URL + "/attendance/" + authUser.id,
				data,
				config
			)
			.then((response) => {
				history.go(0);
			});
	}

	const titleConstants = () => {
		return [
			{
				title: () => {
					return (
						<div className="whitespace-pre text-3xl font-bold">
							Dashboard
						</div>
					);
				},
			},
			{
				title: () => {
					return (
						<div className="whitespace-pre font-medium">
							{dateToday}
						</div>
					);
				},
			},
		];
	};

	return (
		<section className="w-screen">
			<Title cols={titleConstants()} />
			<div className="w-full bg-white py-4">
				<div className="block sm:w-2/3 mx-auto items-center">
					<div className="flex w-full py-4">
						<div className="w-full flex border rounded p-5 items-center justify-between">
							<div className="flex space-x-6">
								<div className="whitespace-pre font-light text-base uppercase">
									<span>Time started:</span>
									<span className="font-medium pl-1">
										{attendance.started_at
											? moment(
													attendance.started_at
											  ).format("hh:mm A")
											: "--:-- --"}
									</span>
								</div>
								<div className="whitespace-pre font-light text-base uppercase">
									<span>Time ended:</span>
									<span className="font-medium pl-1">
										{attendance.ended_at
											? moment(
													attendance.ended_at
											  ).format("hh:mm A")
											: "--:-- --"}
									</span>
								</div>
							</div>
							<button
								onClick={() => {
									if (
										attendance.started_at &&
										!attendance.ended_at
									) {
										handleTimeOut();
									} else {
										handleTimeIn();
									}
								}}
								disabled={
									attendance.started_at && attendance.ended_at
								}
								className={
									"py-3 px-5 rounded" +
									(attendance.started_at &&
									attendance.ended_at
										? " bg-gray-300 text-gray-500 cursor-not-allowed"
										: " text-white bg-black hover:underline")
								}
							>
								<div className="whitespace-pre text-base font-bold text-center">
									{attendance.started_at &&
									!attendance.ended_at
										? "Time out"
										: "Time in"}
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
