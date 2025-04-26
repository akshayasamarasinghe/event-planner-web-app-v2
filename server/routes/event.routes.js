import {Router} from "express";
import {
    createEventController,
    eventRsvpController,
    findEventsController,
    findOneEventController,
    updateEventController,
    uploadFile
} from "../controllers/event.controller.js";
import multer from 'multer';

const upload = multer();

const eventRouter = Router();

eventRouter.post("/create", createEventController);
eventRouter.put("/:id", updateEventController);
eventRouter.post("/get-one", findOneEventController);
eventRouter.post("/get-all", findEventsController);
eventRouter.post("/rsvp", eventRsvpController);
eventRouter.post("/upload", upload.single('file'), uploadFile);

export default eventRouter;
