

import { createAsyncThunk } from "@reduxjs/toolkit";
import { accountEmailActivateApi } from "../../api";


export const AccountEmailActivateAction = createAsyncThunk("reg/accountEmailActivation", async (key, { rejectWithValue }) => {

    try {
        const response = await accountEmailActivateApi(key);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.error ||
            error?.response?.data || { error: error.message }
        return rejectWithValue({ error: message });
    }

})