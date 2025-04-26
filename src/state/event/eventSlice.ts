import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, SERVELESS_URL} from "../../constants/constants.ts";

interface EventState {
    event: any;
    events: any;
}

const initialState: EventState = {
    event: {},
    events: [],
};

export const createEvent = createAsyncThunk(
    "event/create",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/events/create`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const updateEvent = createAsyncThunk(
    "event/update",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${BASE_URL}/events/${payload._id}`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const getEvent = createAsyncThunk(
    "event/get-one",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/events/get-one`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const getEvents = createAsyncThunk(
    "event/get-all",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/events/get-all`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const getInvitation = createAsyncThunk(
    "event/invitation",
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${SERVELESS_URL}/invitation/${id}`);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const invitationRsvp = createAsyncThunk(
    "event/invitation/rsvp",
    async (data: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${SERVELESS_URL}/invitation/rsvp/${data?.id}`, data?.payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const eventRsvp = createAsyncThunk(
    "event/rsvp",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/events/rsvp`, payload);
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

export const eventUploadImage = createAsyncThunk(
    "event/upload",
    async (payload: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/events/upload`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (err: any) {
            throw rejectWithValue(err.response.data);
        }
    }
);

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.fulfilled, (state: Draft<EventState>, action: PayloadAction<any>) => {
                state.event = action.payload;
            })
            .addCase(updateEvent.fulfilled, (state: Draft<EventState>, action: PayloadAction<any>) => {
                state.event = action.payload;
            })
            .addCase(getEvent.fulfilled, (state: Draft<EventState>, action: PayloadAction<any>) => {
                state.event = action.payload;
            })
            .addCase(getEvents.fulfilled, (state: Draft<EventState>, action: PayloadAction<any>) => {
                state.events = action.payload;
            });
    },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
