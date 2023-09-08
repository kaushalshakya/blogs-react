import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registerThunk = createAsyncThunk('users/registerThunk', async(payload, thunkAPI) => {
    try{
        const response = await axios.post(API + 'register', payload, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data;
    }catch(err) {
        return thunkAPI.rejectWithValue(response.data);
    }
})

export const getProfile = createAsyncThunk('users/getProfile', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        const response = await axios.get(API + 'profile', {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data.posts;
    }catch (err) {
        return console.log(err);
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
        reducers: {
            resetSuccess : (state, action) => {
                state.success = null;
            }
        },
        extraReducers : (builder) => {
            builder
                .addCase(registerThunk.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.success = action.payload;
                })
                .addCase(registerThunk.rejected, (state, action) => {
                    state.status = 'rejected';
                    state.error = action.payload;
                })
                .addCase(getProfile.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.success = action.payload;
                })
        }
    }
)

export default userSlice.reducer;

export const getSuccess = (state) => state.user.success;

export const getError = (state) => state.user.error;

export const { resetSuccess } = userSlice.actions;