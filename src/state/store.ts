import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.ts";
import userReducer from "./user/userSlice.ts";
import eventReducer from "./event/eventSlice.ts";
import rsvpReducer from "./rsvp/rsvpSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        event: eventReducer,
        rsvp: rsvpReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
