import { createSlice } from "@reduxjs/toolkit";
import { LoginAction as login } from "../actions/LoginAction";
import { LogoutAction as logout } from "../actions/LogoutAction";
import { RefreshTokenAction as refreshToken } from "../actions/RefreshTokenAction";
import { utils } from "../../utils";

const userData = localStorage.getItem('authData');
const data = userData ? JSON.parse(userData) : null;

const initialState = {
	authLoader: false,
	authError: null,
	authData: data,
};

export const authSlice = createSlice({
	name: "authLogin",
	initialState,
	reducers: {
		setAuthLoginErrorAction: (state, action) => {
			state.authError = action.payload.authError;
		},
		localLogoutAction: (state) => {
			state.authLoader = false;
			state.authError = null;
			state.authData = null;
			localStorage.removeItem('authData');
		},
		localUpdateUserAction: (state, action) => {
			state.authData = action.payload;
			localStorage.setItem('authData', JSON.stringify(action.payload));
		},
	},
	extraReducers: (builder) => {
		// Handle login actions
		builder
			.addCase(login.pending, (state) => {
				state.authLoader = true;
				state.authError = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				const data = utils.decodedUserData(action.payload);
				state.authLoader = false;
				state.authError = null;
				state.authData = data;
				localStorage.setItem('authData', JSON.stringify(data));
			})
			.addCase(login.rejected, (state, action) => {
				state.authLoader = false;
				state.authError = action.payload;
				state.authData = null;
			});

		// Handle logout actions
		builder
			.addCase(logout.pending, (state) => {
				state.authLoader = true;
				state.authError = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.authLoader = false;
				state.authError = null;
				state.authData = null;
				localStorage.removeItem('authData');
			})
			.addCase(logout.rejected, (state) => {
				state.authLoader = false;
				state.authError = null;
				state.authData = null;
				localStorage.removeItem('authData');
			});

		// Handle token refresh actions
		builder
			.addCase(refreshToken.fulfilled, (state, action) => {
				if (state.authData) {
					state.authData.access = action.payload.access;
					localStorage.setItem('authData', JSON.stringify(state.authData));
				}
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.authData = null;
				state.authError = action.payload;
				localStorage.removeItem('authData');
			});
	},
});

export const {
	localLogoutAction,
	localUpdateUserAction,
	setAuthLoginErrorAction,
} = authSlice.actions;

export default authSlice.reducer;
