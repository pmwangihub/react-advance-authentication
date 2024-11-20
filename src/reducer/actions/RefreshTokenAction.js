
import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshTokenApi } from "../../http";

export const RefreshTokenAction = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
    const authData = localStorage.getItem("authData");
    if (!authData) return rejectWithValue({ error: "No refresh token available." });
    try {
        const response = await refreshTokenApi();
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
