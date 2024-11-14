


import { createSlice } from "@reduxjs/toolkit";
import { RegisterAction as register } from "../actions/RegisterAction";
import { AccountEmailActivateAction as accountActivate } from "../actions/AccountEmailActivateAction";

const regData = localStorage.getItem('regData');
const data = regData ? JSON.parse(regData) : null;


const initialState = {
    regLoader: false,
    regError: null,
    regData: data,
}

export const RegisterReducer = createSlice({
    name: "authRegister",
    initialState,

    extraReducers(builder) {
        builder
            .addCase(register.pending, (state) => {
                state.regLoader = true
                state.regError = null
                state.regData = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.regLoader = false
                state.regError = null
                state.regData = action.payload
                localStorage.setItem('regData', JSON.stringify(action.payload));
            })
            .addCase(register.rejected, (state, action) => {
                state.regLoader = false
                state.regError = action.error.message
                state.regData = null
            }).addCase(accountActivate.pending, (state) => {
                state.regLoader = true
                state.regError = null
            })
            .addCase(accountActivate.fulfilled, (state, action) => {
                state.regLoader = false
                state.regError = null
                state.regData = null
                if (action.payload) localStorage.removeItem('regData');
            })
            .addCase(accountActivate.rejected, (state, action) => {
                state.regLoader = false
                state.regError = action.payload
            })

    }
})



export default RegisterReducer.reducer;