import moment from "moment";

export default function formatDataList(data) {
	let rawDataList = [];

	for (const element of data) {
		if (element.hasOwnProperty("user")) {
			for (const attendance of element.user.attendance) {
				if (moment().isSame(attendance.started_at, "day")) {
					element.user.attendance_today = attendance;

					let timeEnded = moment(
						element.user.attendance_today.ended_at
							? element.user.attendance_today.ended_at
							: new Date()
					);
					let timeStarted = moment(
						element.user.attendance_today.started_at
					);
					let timeEntry = moment(new Date()).set({
						hour: 7,
						minute: 31,
						seconds: 0,
						milliseconds: 0,
					});

					let formatted_logged_hours = timeEnded.diff(
						timeStarted,
						"hours"
					);
					let formatted_logged_minutes = moment
						.utc(
							moment(timeEnded, "HH:mm:ss").diff(
								moment(timeStarted, "HH:mm:ss")
							)
						)
						.format("mm");

					let formatted_late_hours = timeStarted.diff(
						timeEntry,
						"hours"
					);
					let formatted_late_minutes = moment
						.utc(
							moment(timeStarted, "HH:mm:ss").diff(
								moment(timeEntry, "HH:mm:ss")
							)
						)
						.format("mm");

					element.user.attendance_today.duration_logged_in =
						formatted_logged_hours + ":" + formatted_logged_minutes;

					element.user.attendance_today.duration_late =
						timeStarted.diff(timeEntry, "minutes") !== 0
							? formatted_late_hours +
							  ":" +
							  formatted_late_minutes
							: null;
				}
			}

			element.user.formatted_name =
				element.user.last_name + ", " + element.user.first_name;
		}

		rawDataList.push(element);
	}

	return rawDataList;
}
