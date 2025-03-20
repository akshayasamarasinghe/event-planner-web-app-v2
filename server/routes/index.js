import userRouter from "./user.routes.js";
import eventRouter from "./event.routes.js";
import notificationRouter from "./notification.routes.js";
import rsvpRouter from "./rsvp.routes.js";

export const routes = (app) => {
    app.get("/", (req, res) => {
        res.send(
            `App running on developer mode`
        );
    });
    app.use("/auth", userRouter);
    app.use("/events", eventRouter);
    app.use("/notifications", notificationRouter);
    app.use("/rsvps", rsvpRouter);
};
