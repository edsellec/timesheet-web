import moment from "moment";

export default function formatDataList(data) {
	let rawDataList = [];

	for (const element of data) {
		let hours_worked = 0;

		if (element.timesheet.length > 0) {
			for (const timesheet of element.timesheet) {
				let timeStarted = moment(timesheet.started_at);
				let timeEnded = moment(timesheet.ended_at);

				timesheet.hours_worked = moment
					.duration(timeEnded.diff(timeStarted))
					.asHours();
				hours_worked = hours_worked + timesheet.hours_worked;
			}
		}

		element.hours_worked = hours_worked;
		element.formatted_name = element.last_name + ", " + element.first_name;

		if (element.group.length > 0) {
			for (const group of element.group) {
				element.group = group;
			}
		} else {
			element.group = {};
		}

		rawDataList.push(element);
	}

	return rawDataList;
}
