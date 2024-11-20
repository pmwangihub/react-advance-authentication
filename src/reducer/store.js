import { configureStore } from "@reduxjs/toolkit";
import AuthLoginReducer from "./reducer/LoginReducer";
import RegisterReducer from "./reducer/RegisterReducer";

export const store = configureStore({
	reducer: {
		AuthLoginReducer,
		RegisterReducer
	},
	devTools: import.meta.env.PROD,
})
