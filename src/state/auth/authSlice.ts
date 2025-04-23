import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {
    ACCESS_TOKEN,
    BASE_URL,
    LOGGED_IN_USER,
    LOGGED_IN_USER_ID,
    LOGGED_IN_USER_TYPE
} from "../../constants/constants.ts";

interface AuthState {
    user: any;
    googleUser: any;
    oAuthUrl: string;
    status: string;
    error: any;
}

const initialState: AuthState = {
    user: {},
    oAuthUrl: "",
    googleUser: {},
    status: "idle",
    error: "",
};

export const login = createAsyncThunk(
    "auth/login",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const logOutFromServer = createAsyncThunk(
    "auth/logout",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/logout`);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state: Draft<AuthState>, action: PayloadAction<any>) => {
                const {access_token, user} = action.payload;
                state.user = user;
                localStorage.setItem(ACCESS_TOKEN, access_token);
                localStorage.setItem(LOGGED_IN_USER, user?.first_name);
                localStorage.setItem(LOGGED_IN_USER_TYPE, user?.type);
                localStorage.setItem(LOGGED_IN_USER_ID, user?._id);
            })
            .addCase(logOutFromServer.fulfilled, (state: Draft<AuthState>) => {
                state.user = {};
                localStorage.clear();
                location.reload();
            })
            .addCase(logOutFromServer.rejected, (state: Draft<AuthState>) => {
                state.user = {};
                localStorage.clear();
            });
    },
});

export const {logOut} = authSlice.actions;
export default authSlice.reducer;
