const config = {
	headers: {
		Authorization: "Bearer " + window.localStorage.getItem("token"),
	},
};

module.exports = {
	config,
};
