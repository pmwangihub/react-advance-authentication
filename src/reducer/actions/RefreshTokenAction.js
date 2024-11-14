
import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshTokenApi } from "../../http";

export const RefreshTokenAction = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
    const authData = localStorage.getItem("authData");
    if (!authData) return rejectWithValue({ error: "No refresh token available." });
    try {
        const response = await refreshTokenApi();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
