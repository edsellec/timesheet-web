import moment from "moment";

export default function formatDataList(data) {
	let rawDataList = [];

	for (const element of data) {
		if (element.hasOwnProperty("user")) {
			let hours_worked = 0;

			for (const timesheet of element.user.timesheet) {
				let timeStarted = moment(timesheet.started_at);
				let timeEnded = moment(timesheet.ended_at);

				timesheet.hours_worked = moment
					.duration(timeEnded.diff(timeStarted))
					.asHours();
				hours_worked = hours_worked + timesheet.hours_worked;
			}

			element.user.hours_worked = hours_worked;
			element.user.formatted_name =
				element.user.last_name + ", " + element.user.first_name;
		}
		rawDataList.push(element);
	}

	return rawDataList;
}
