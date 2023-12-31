import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const IMAGE = import.meta.env.VITE_IMAGE_URL;

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    try{
        const response = await axios.get(API + 'home');

        response.data.response.forEach(post => {
            post.post_image = post.post_image ? IMAGE + 'post-img/' + post.post_image : null;
            post.image = post.image ? IMAGE + 'profile-img/' + post.image : null;
        });

        return response.data;
    }catch (err) {
        return err.message;
    }
})

export const addPosts = createAsyncThunk('posts/addPosts', async(payload, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.token;
        const response = await axios.post(API + 'posts', payload,
        {
            headers : {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response.data;
    }catch(err) {
        return thunkAPI.rejectWithValue(err.response ? err.response.data : err.message);
    }
})

export const deletePost = createAsyncThunk('posts/deletePosts', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        const response = await axios.delete(API + 'posts/' + id, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        return response.data;
    }catch (err) {
        (err);
        return thunkAPI.rejectWithValue(err.response ? err.response.data : err.message);
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async({id, payload}, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.token;
        console.log('id', id);
        console.log('payload', payload);
        const response = await axios.put(API + 'posts/' + id, payload, {
            headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'multipart/form-data'
            }
        })
        return response.data;
    }catch(err) {
        console.log(err)
        return thunkAPI.rejectWithValue(err.message);
    }
})

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
    success: null
}

const postSlice = createSlice (
    {
        name: 'posts',
        initialState,
        reducers: {
            resetSuccess : (state, action) => {
                state.success = null;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getPosts.pending, (state, action) => {
                    state.status = 'idle';
                })
                .addCase(getPosts.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.posts = action.payload;
                })
                .addCase(getPosts.rejected, (state, action) => {
                    state.status = 'error';
                    state.error = action.error.message;
                })
                .addCase(addPosts.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.success = action.payload;
                })
                .addCase(addPosts.rejected, (state, action) => {
                    state.status = 'rejected';
                    state.error = action.error.message
                })
                .addCase(deletePost.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.success = action.payload;
                })
                .addCase(deletePost.rejected, (state, action) => {
                    state.status = 'rejected';
                    state.error = action.error.message;
                })
                .addCase(updatePost.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.success = action.payload;
                })
                .addCase(updatePost.rejected, (state, action) => {
                    state.status = 'rejected';
                    state.error = action.error.message;
                })
        }
    }
)

export const allPosts = (state) => state.posts.posts;
export const postStatus = (state) => state.posts.status;
export const postError = (state) => state.posts.error;
export const postSuccess = (state) => state.posts.success;

export const { resetSuccess } = postSlice.actions;

export default postSlice.reducer;