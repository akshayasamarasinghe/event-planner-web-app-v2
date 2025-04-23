import {Router} from "express";
import {
    createRsvpController,
    findOneRsvpController,
    findRsvpsController,
    updateRsvpController
} from "../controllers/rsvp.controller.js";

const rsvpRouter = Router();

rsvpRouter.post("/create", createRsvpController);
rsvpRouter.put("/:id", updateRsvpController);
rsvpRouter.post("/get-one", findOneRsvpController);
rsvpRouter.post("/get-all", findRsvpsController);

export default rsvpRouter;
