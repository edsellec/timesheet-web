import apiRequest from "../utils/apiRequest";

const apiRoutes = {
	login: async (email) => {
		return await apiRequest({
			url: "/login",
			data: {
				email: email,
			},
			method: "POST",
		}).then((result) => {
			return result.data;
		});
	},

	logout: async () => {
		return await apiRequest({
			url: "/logout",
			method: "POST",
		}).then((result) => {
			return result.data;
		});
	},
};

export default apiRoutes;
