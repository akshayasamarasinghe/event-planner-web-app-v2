import express, {Router} from "express";
import {
    createNotificationController,
    findNotificationsController,
    findOneNotificationController,
    updateNotificationController
} from "../controllers/notification.controller.js";

const notificationRouter = Router();

notificationRouter.post("/create", createNotificationController);
notificationRouter.put("/:id", updateNotificationController);
notificationRouter.post("/get-one", findOneNotificationController);
notificationRouter.post("/get-all", findNotificationsController);

export default notificationRouter;
