
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi } from "../../api";


export const RegisterAction = createAsyncThunk("reg/register", async function (object, { getState, rejectWithValue }) {
	try {
		const response = await registerApi(object);
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