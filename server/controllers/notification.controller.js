import {
    createNotificationService,
    findNotificationsService,
    findOneNotificationService,
    updateNotificationService
} from "../services/notification.service.js";

export const createNotificationController = async (req, res) => {
    console.info("Notification create started");
    try {
        const response = await createNotificationService(req?.body);
        console.info("Notification create completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const updateNotificationController = async (req, res) => {
    console.info("Notification update started");
    try {
        const response = await updateNotificationService({}, req?.body);
        console.info("Notification update completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const findOneNotificationController = async (req, res) => {
    console.info("Notification find one started");
    try {
        const response = await findOneNotificationService({});
        console.info("Notification find one completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const findNotificationsController = async (req, res) => {
    console.info("Notification find all started");
    try {
        const response = await findNotificationsService({});
        console.info("Notification find all completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};
