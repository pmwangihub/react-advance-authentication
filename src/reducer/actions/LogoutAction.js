

import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutApi, } from "../../api";

export const LogoutAction = createAsyncThunk("auth/logout", async (_, { getState, rejectWithValue }) => {
	try {
		const response = await logoutApi();
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

})