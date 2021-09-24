import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Index() {
	const [listOfUsers, setListOfUsers] = useState([]);
	let history = useHistory();

	useEffect(() => {
		axios.get("http://localhost:3001/api/users").then((response) => {
			setListOfUsers(response.data);
		});
	}, []);

	return (
		<div>
			{listOfUsers.map((value, key) => {
				return (
					<div key={key}>
						<div>{value.firstName}</div>
						<button
							onClick={() => history.push("/users/" + value.id)}
						>
							Open
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default Index;
