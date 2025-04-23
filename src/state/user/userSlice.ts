import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants.ts";

interface UserState {
    user: any;
    users: any;
}

const initialState: UserState = {
    user: {},
    users: {},
};

export const getOneUser = createAsyncThunk(
    "user/get-one",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/get-one`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const getUsers = createAsyncThunk(
    "user/get-all",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/get-all`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/update",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${BASE_URL}/auth/${id}`);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOneUser.fulfilled, (state: Draft<UserState>, action: PayloadAction<any>) => {
                state.user = action.payload;
            })
            .addCase(getUsers.fulfilled, (state: Draft<UserState>, action: PayloadAction<any>) => {
                state.users = action.payload;
            })
            .addCase(updateUser.fulfilled, (state: Draft<UserState>, action: PayloadAction<any>) => {
                state.user = action.payload;
            });
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
