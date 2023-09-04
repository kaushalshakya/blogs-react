import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginThunk = createAsyncThunk('auth/loginThunk', async(payload, thukAPI) => {
    try{
        console.log('payload', payload);
        console.log('API + login', API + 'login');
        const response = await axios.post(API + 'login', payload);
        return response.data;
    } catch (err) {
        return thukAPI.rejectWithValue(err.response.data);
    }
})

const initialState = {
    token: null,
    status: 'idle',
    error: null,
    success: null
}

const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder
                .addCase(loginThunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    console.log('succeeded', action.payload);
                    state.success = action.payload
                    // state.user = action.payload;
                    // state.token = action.payload
                })
                .addCase(loginThunk.rejected, (state, action) => {
                    state.status = 'rejected';
                    console.log('rejected', action.payload);
                    const error = action.payload || 'Unkown error';
                    // console.log('err', error);
                    state.error = error; 
                    // console.log('state-err', state.error);
                })
        }
    }
)

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const getError = (state) => {
    return state.auth.error;
} 

export const getMessage = (state) => {
    return state.auth.success;
}

export const selectToken = (state) => state.auth.token;