import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
	const [listOfUsers, setListOfUsers] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3001/api/users").then((response) => {
			setListOfUsers(response.data);
		});
	}, []);

	return (
		<div>
			{listOfUsers.map((value, key) => {
				return <div key={key}>{value.firstName}</div>;
			})}
		</div>
	);
}

export default Home;
