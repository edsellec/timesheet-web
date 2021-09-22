import axios from "axios";
import { useState, useEffect } from "react";

function App() {
	const [listOfUsers, setListOfUsers] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3001/api/users").then((response) => {
			setListOfUsers(response.data.data);
		});
	}, []);

	return (
		<div>
			{listOfUsers.map((value, key) => {
				return <div>{value.firstName}</div>;
			})}
		</div>
	);
}

export default App;
