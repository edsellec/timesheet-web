import axios from "axios";

async function apiRequest(args, timeout = 0) {
	let result = null;

	if (args.method === "POST") {
		result = await axios
			.post("/api" + args.url, args.data, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization:
						"Bearer " + window.localStorage.getItem("token"),
				},
			})
			.then((response) => {
				return response;
			});
	} else {
		result = await axios
			.get("/api" + args.url, {
				params: args.params || {},
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					Authorization:
						"Bearer " + window.localStorage.getItem("token"),
				},
			})
			.then((response) => {
				return response;
			});
	}

	return result;
}

export default apiRequest;
