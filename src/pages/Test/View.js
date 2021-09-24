import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function View() {
	const { id } = useParams();
	const [userObject, setUserObject] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3001/api/users/" + id).then((response) => {
			setUserObject(response.data);
		});
	}, [id]);

	return <div>{userObject.firstName}</div>;
}

export default View;
