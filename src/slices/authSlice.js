import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

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
    success: null,
    user: null
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
                    state.token = action.payload.accessToken;
                    const user = jwtDecode(action.payload.accessToken);
                    state.user = user;
                    state.success = action.payload;
                })
                .addCase(loginThunk.rejected, (state, action) => {
                    state.status = 'rejected';
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

export const getUser = (state) => {
    return state.auth.user;
}

export const selectToken = (state) => state.auth.token;