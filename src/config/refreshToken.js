import { onAuthStateChanged } from "firebase/auth";

export default function refreshToken({ auth, authState }) {
	onAuthStateChanged(auth, (user) => {
		auth.currentUser.getIdToken().then((token) => {
			window.localStorage.setItem("token", token);
		});
	});
}
