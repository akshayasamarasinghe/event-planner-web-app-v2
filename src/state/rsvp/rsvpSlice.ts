import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants.ts";

interface RsvpState {
    rsvp: any;
    rsvps: any;
}

const initialState: RsvpState = {
    rsvp: {},
    rsvps: {},
};

export const createRsvp = createAsyncThunk(
    "rsvp/create",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/rsvps/create`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const updateRsvp = createAsyncThunk(
    "rsvp/update",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${BASE_URL}/rsvps/${id}`);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const getRsvp = createAsyncThunk(
    "rsvp/get-one",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/rsvps/get-one`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const getRsvps = createAsyncThunk(
    "rsvp/get-all",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/rsvps/get-all`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

const rsvpSlice = createSlice({
    name: "rsvp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRsvp.fulfilled, (state: Draft<RsvpState>, action: PayloadAction<any>) => {
                state.rsvp = action.payload;
            })
            .addCase(updateRsvp.fulfilled, (state: Draft<RsvpState>, action: PayloadAction<any>) => {
                state.rsvp = action.payload;
            })
            .addCase(getRsvp.fulfilled, (state: Draft<RsvpState>, action: PayloadAction<any>) => {
                state.rsvp = action.payload;
            })
            .addCase(getRsvps.fulfilled, (state: Draft<RsvpState>, action: PayloadAction<any>) => {
                state.rsvps = action.payload;
            });
    },
});

export const {} = rsvpSlice.actions;
export default rsvpSlice.reducer;
