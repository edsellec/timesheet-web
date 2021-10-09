export default function formatDataList(data) {
	let rawDataList = [];

	for (const element of data) {
		if (
			rawDataList.filter((row) => row.id === element.group_id).length > 0
		) {
			continue;
		}

		rawDataList.push(element.group);
	}

	for (const formatttedElement of rawDataList) {
		formatttedElement.user = [];
		for (const element of data) {
			if (formatttedElement.id === element.group_id) {
				element.user.formatted_name =
					element.user.last_name + ", " + element.user.first_name;
				formatttedElement.user.push(element.user);
			}
		}
	}

	return rawDataList;
}
