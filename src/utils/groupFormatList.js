export default function formatDataList(data) {
	let rawDataList = [];

	for (const element of data) {
		for (const formattedUser of element.user) {
			formattedUser.formatted_name =
				formattedUser.last_name + ", " + formattedUser.first_name;
		}

		rawDataList.push(element);
	}

	return rawDataList;
}
