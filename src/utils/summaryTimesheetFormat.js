import moment from "moment";

export default function formatDataList(data) {
	let hoursDay = 0,
		minutesDay = 0,
		durationDay = 0,
		hoursWeek = 0,
		minutesWeek = 0,
		durationWeek = 0;

	for (const element of data) {
		if (moment(element.created_at).isSame(new Date(), "day")) {
			hoursDay =
				hoursDay + parseFloat(element.hours_worked.split(":")[0]);
			minutesDay =
				minutesDay + parseFloat(element.hours_worked.split(":")[1]);
			durationDay =
				durationDay +
				parseFloat(element.hours_worked.split(":")[0]) +
				parseFloat(element.hours_worked.split(":")[1]) / 60;
		}

		hoursWeek = hoursWeek + parseFloat(element.hours_worked.split(":")[0]);
		minutesWeek =
			minutesWeek + parseFloat(element.hours_worked.split(":")[1]);
		durationWeek =
			durationWeek +
			parseFloat(element.hours_worked.split(":")[0]) +
			parseFloat(element.hours_worked.split(":")[1]) / 60;
	}

	let quotientHoursDay = Math.floor(minutesDay / 60);
	let remainderMinutesDay = ((minutesDay / 60) % 1).toFixed(2);

	if (quotientHoursDay >= 1) {
		hoursDay = hoursDay + quotientHoursDay;
		minutesDay = remainderMinutesDay;
	}

	hoursDay = ("00" + hoursDay.toString()).substring(
		hoursDay.toString().length
	);

	minutesDay = ("00" + minutesDay.toString()).substring(
		minutesDay.toString().length
	);

	let quotientHoursWeek = Math.floor(minutesWeek / 60);
	let remainderMinutesWeek = ((minutesWeek / 60) % 1).toFixed(2);

	if (quotientHoursWeek >= 1) {
		hoursWeek = hoursWeek + quotientHoursWeek;
		minutesWeek = remainderMinutesWeek;
	}

	hoursWeek = ("00" + hoursWeek.toString()).substring(
		hoursWeek.toString().length
	);

	minutesWeek = ("00" + minutesWeek.toString()).substring(
		minutesWeek.toString().length
	);

	return {
		hoursDay,
		minutesDay,
		durationDay,
		hoursWeek,
		minutesWeek,
		durationWeek,
	};
}
