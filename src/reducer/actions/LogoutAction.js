

import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutApi, } from "../../api";

export const LogoutAction = createAsyncThunk("auth/logout", async (_, { getState, rejectWithValue }) => {
	try {
		const response = await logoutApi();
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}

})