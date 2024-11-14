
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi } from "../../api";


export const RegisterAction = createAsyncThunk("reg/register", async function (object, { getState, rejectWithValue }) {
	try {
		const response = await registerApi(object);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});