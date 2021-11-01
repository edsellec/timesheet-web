export default function formatDataList(data) {
	let rawDataList = [];

	for (const element of data) {
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
