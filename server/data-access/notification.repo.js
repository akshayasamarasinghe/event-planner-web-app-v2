import Notification from "../models/Notification.js";

export const createNotificationRepo = (data) => {
    return new Notification(data).save();
};

export const findOneAndUpdateNotificationRepo = async (filters, data) => {
    delete data._id;
    return Notification.findOneAndUpdate(
        filters,
        {$set: {...data}},
        {new: true, runValidators: true}
    ).exec();
};

export const findOneNotificationRepo = (filters) => {
    return Notification.findOne(filters).exec();
};

export const aggregateNotificationRepo = (pipeline) => {
    return Notification.aggregate(pipeline).exec();
};

export const findAllNotificationsRepo = (filters) => {
    return Notification.find(filters).exec();
};
