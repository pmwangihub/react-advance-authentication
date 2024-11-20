



import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api";


export const LoginAction = createAsyncThunk("auth/login", async (object, { rejectWithValue }) => {
	try {
		const response = await loginApi(object);
		return response.data;
	} catch (error) {

		let message;
		if (error?.response?.headers["content-type"]?.includes("application/json")) {
			message = error?.response?.data?.error || error?.response?.data || { error: error.message };
		} else {
			message = { error: "An unexpected server error occurred. Please try again later." };
		}
		return rejectWithValue(message);
	}
});