import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../states/authSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
	},
});
