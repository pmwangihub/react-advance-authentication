

import { createAsyncThunk } from "@reduxjs/toolkit";
import { accountEmailActivateApi } from "../../api";


export const AccountEmailActivateAction = createAsyncThunk("reg/accountEmailActivation", async (key, { rejectWithValue }) => {

    try {
        const response = await accountEmailActivateApi(key);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }

})