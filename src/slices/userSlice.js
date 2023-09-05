import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registerThunk = createAsyncThunk('users/registerThunk', async(payload, thunkAPI) => {
    try{
        const response = await axios.post(API + 'register', payload);
        console.log(response.data);
        return response.data;
    }catch(err) {
        return thunkAPI.rejectWithValue(response.data);
    }
})

const initialState = {
    status: 'idle',
    error: null,
    success: null
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {},
        extraReducers : (builder) => {
            builder
                .addCase(registerThunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.success = action.payload;
                })
                .addCase(registerThunk.rejected, (state, action) => {
                    state.status = 'rejected';
                    error = action.payload;
                })
        }
    }
)

export default userSlice.reducer;

export const getSuccess = (state) => state.user.success;

export const getError = (state) => state.user.error;