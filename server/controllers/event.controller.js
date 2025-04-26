import {
    createEventService,
    eventRsvpService,
    findEventsService,
    findOneEventService,
    updateEventService
} from "../services/event.service.js";
import {uploadToS3} from "../services/file.service.js";

export const createEventController = async (req, res) => {
    console.info("Event create started");
    try {
        const response = await createEventService(req?.body);
        console.info("Event create completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const updateEventController = async (req, res) => {
    console.info("Event update started");
    try {
        const response = await updateEventService({_id: req.params.id}, req?.body);
        console.info("Event update completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const findOneEventController = async (req, res) => {
    console.info("Event find one started");
    try {
        const response = await findOneEventService(req.body);
        console.info("Event find one completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const findEventsController = async (req, res) => {
    console.info("Event find all started");
    try {
        const response = await findEventsService(req.body);
        console.info("Event find all completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const eventRsvpController = async (req, res) => {
    console.info("Event rsvp started");
    try {
        const response = await eventRsvpService(req?.body);
        console.info("Event rsvp completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const uploadFile = async (req, res) => {
    console.info("File uploading started");
    try {
        const response = await uploadToS3(req?.file);
        console.info("File uploading completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};
