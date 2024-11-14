



import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api";


export const LoginAction = createAsyncThunk("auth/login", async (object, { rejectWithValue }) => {
	try {
		const response = await loginApi(object);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});