import Event from "../models/Event.js";

export const createEventRepo = (data) => {
    return new Event(data).save();
};

export const findOneAndUpdateEventRepo = async (filters, data) => {
    delete data._id;
    return Event.findOneAndUpdate(
        filters,
        {$set: {...data}},
        {new: true, runValidators: true}
    ).exec();
};

export const findOneEventRepo = (filters) => {
    return Event.findOne(filters).exec();
};

export const aggregateEventRepo = (pipeline) => {
    return Event.aggregate(pipeline).exec();
};

export const findAllEventsRepo = (filters) => {
    return Event.find(filters).exec();
};
