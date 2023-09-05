import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

const API = import.meta.env.VITE_API_URL;

export const loginThunk = createAsyncThunk('auth/loginThunk', async(payload, thukAPI) => {
    try{
        const response = await axios.post(API + 'login', payload);
        return response.data;
    } catch (err) {
        return thukAPI.rejectWithValue(err.response.data);
    }
})

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async(id, thunkAPI) => {
    try{
        console.log('here');
        const response = await axios.post(API + 'logout', id);
        console.log(response.data);
        return response.data;
    }catch(err) {
        return console.log(err);
    }
})

const initialState = {
    token: null,
    status: 'idle',
    error: null,
    success: null,
    user: null,
    logoutMessage: null
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
                    const error = action.payload || 'Unknown error';
                    // console.log('err', error);
                    state.error = error; 
                    // console.log('state-err', state.error);
                })
                .addCase(logoutThunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.user = null;
                    state.logoutMessage = action.payload;
                    state.token = null;
                    state.success = null;
                })
                .addCase(logoutThunk.rejected, (state, action) => {
                    state.status = 'rejected';
                    const error = action.payload || 'Unknown error';
                    state.error = error
                })
        }
    }
)
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

export const logoutMessage = (state) => {
    return state.auth.logoutMessage;
}

export const selectToken = (state) => state.auth.token;