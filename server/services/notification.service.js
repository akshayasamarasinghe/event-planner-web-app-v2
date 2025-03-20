import {
    createNotificationRepo,
    findAllNotificationsRepo,
    findOneAndUpdateNotificationRepo,
    findOneNotificationRepo
} from "../data-access/notification.repo.js";

export const createNotificationService = async (data) => {
    try {
        return await createNotificationRepo(data);
    } catch (e) {
        throw e;
    }
};

export const updateNotificationService = async (filters, data) => {
    try {
        return await findOneAndUpdateNotificationRepo(filters, data);
    } catch (e) {
        throw e;
    }
};

export const findOneNotificationService = async (filters) => {
    try {
        return await findOneNotificationRepo(filters);
    } catch (e) {
        throw e;
    }
};

export const findNotificationsService = async (filters) => {
    try {
        return await findAllNotificationsRepo(filters);
    } catch (e) {
        throw e;
    }
};
