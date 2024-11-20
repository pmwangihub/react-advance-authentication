



import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api";


export const LoginAction = createAsyncThunk("auth/login", async (object, { rejectWithValue }) => {
	try {
		const response = await loginApi(object);
		return response.data;
	} catch (error) {
		console.log(error)
		const message = error?.response?.data?.error ||
			error?.response?.data || { error: error.message }
		return rejectWithValue({ error: message });
	}
});