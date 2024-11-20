
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi } from "../../api";


export const RegisterAction = createAsyncThunk("reg/register", async function (object, { getState, rejectWithValue }) {
	try {
		const response = await registerApi(object);
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.error ||
			error?.response?.data || { error: error.message }
		return rejectWithValue({ error: message });
	}
});