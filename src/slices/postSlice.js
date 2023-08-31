import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const IMAGE = import.meta.env.VITE_IMAGE_URL;

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    try{
        const response = await axios.get(API + 'home');
        console.log('img', response.data.response);

        response.data.response.forEach(post => {
            post.post_image = post.post_image ? IMAGE + 'post-img/' + post.post_image : null;
        });

        console.log('test', response.data.response);
        console.log('resposne data', response.data);
        // return false;

        return response.data;
    }catch (err) {
        return err.message;
    }
})

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

const postSlice = createSlice (
    {
        name: 'posts',
        initialState,
        reducers : {
            postAdded : {
                reducer(state, action)  {
                    state.posts.push(action.payload);
                },
                prepare(id, title, content, image) {
                    return {
                        payload : {
                            id,
                            title,
                            content,
                            date,
                            image
                        }
                    }
                }
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
                    console.log(action);
                    state.status = 'error';
                    state.error = action.error.message;
                })
        }
    }
)

export const allPosts = (state) => state.posts.posts;
export const postStatus = (state) => state.posts.status;
export const postError = (state) => state.posts.error;

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;