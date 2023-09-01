import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers : {
            setCredentials : (state, action) => {
                const { user, accessToken } = action.payload;
                state.user = user;
                state.token = accessToken; 
            },
            logOut : (state, action) => {
                state.user = null;
                state.token = null;
            }
        }
    }
)