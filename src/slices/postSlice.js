import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "dotenv";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    try{
        const response = await axios.get(API + '/posts');
        return [...response.data];
    }catch (err) {
        return err.message;
    }
})

const initialState = {
    posts: [],
    status: idle,
    error: null
}


const postSlice = createSlice (
    {
        name: posts,
        initialState,
        reducers : {

        },
        extraReducers: (builder) => {
            builder
                .addCase(getPosts.pending, (state, action) => {
                    state.status = 'loading';
                })
                .addCase(getPosts.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                })
                .addCase(getPosts.rejected, (state, action) => {
                    state.status = 'error';
                })
        }
    }
)

export default postSlice.reducer;