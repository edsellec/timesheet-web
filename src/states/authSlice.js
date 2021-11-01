import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoading: true,
		hasError: false,
		user: null,
	},
	reducers: {
		loading: (state) => {
			state.isLoading = true;
		},
		success: (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
			state.hasError = false;
		},
		failed: (state) => {
			state.user = null;
			state.isLoading = false;
			state.hasError = true;
		},
	},
});

export const { loading, success, failed } = authSlice.actions;

export default authSlice.reducer;

export function fetchUser() {
	return async (dispatch) => {
		dispatch(loading());

		try {
			let data = { token: window.localStorage.getItem("token") };
			axios
				.post(process.env.REACT_APP_API_URL + "/user", data)
				.then((response) => {
					dispatch(success(response.data));
				});
		} catch (error) {
			dispatch(failed());
		}
	};
}
