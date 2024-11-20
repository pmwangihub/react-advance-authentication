

import { createAsyncThunk } from "@reduxjs/toolkit";
import { accountEmailActivateApi } from "../../api";


export const AccountEmailActivateAction = createAsyncThunk("reg/accountEmailActivation", async (key, { rejectWithValue }) => {

    try {
        const response = await accountEmailActivateApi(key);
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