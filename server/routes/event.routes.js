import {Router} from "express";
import {
    createEventController,
    findEventsController,
    findOneEventController,
    updateEventController
} from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.post("/create", createEventController);
eventRouter.put("/:id", updateEventController);
eventRouter.post("/get-one", findOneEventController);
eventRouter.post("/get-all", findEventsController);

export default eventRouter;
