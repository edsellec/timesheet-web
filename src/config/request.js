const headers = {
	Authorization: "Bearer " + window.localStorage.getItem("token"),
};

module.exports = {
	headers,
};
