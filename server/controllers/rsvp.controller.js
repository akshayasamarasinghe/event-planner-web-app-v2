import {createRsvpService, findOneRsvpService, findRsvpsService, updateRsvpService} from "../services/rsvp.service.js";

export const createRsvpController = async (req, res) => {
    console.info("Rsvp create started");
    try {
        const response = await createRsvpService(req?.body);
        console.info("Rsvp create completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const updateRsvpController = async (req, res) => {
    console.info("Rsvp update started");
    try {
        const response = await updateRsvpService({}, req?.body);
        console.info("Rsvp update completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const findOneRsvpController = async (req, res) => {
    console.info("Rsvp find one started");
    try {
        const response = await findOneRsvpService({});
        console.info("Rsvp find one completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const findRsvpsController = async (req, res) => {
    console.info("Rsvp find all started");
    try {
        const response = await findRsvpsService({});
        console.info("Rsvp find all completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};
