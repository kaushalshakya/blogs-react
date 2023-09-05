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
    state: 'idle',
    error: null,
    success: false
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {},
        extraReducers : (builder) => {
            builder
                .addCase(registerThunk.fulfilled, (state, action) => {

                })
                .addCase(registerThunk.rejected, (state, action) => {

                })
        }
    }
)

export default userSlice.reducer;