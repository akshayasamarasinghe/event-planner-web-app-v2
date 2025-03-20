import Rsvp from "../models/Rsvp.js";

export const createRsvpRepo = (data) => {
    return new Rsvp(data).save();
};

export const findOneAndUpdateRsvpRepo = async (filters, data) => {
    delete data._id;
    return Rsvp.findOneAndUpdate(
        filters,
        {$set: {...data}},
        {new: true, runValidators: true}
    ).exec();
};

export const findOneRsvpRepo = (filters) => {
    return Rsvp.findOne(filters).exec();
};

export const aggregateRsvpRepo = (pipeline) => {
    return Rsvp.aggregate(pipeline).exec();
};

export const findAllRsvpsRepo = (filters) => {
    return Rsvp.find(filters).exec();
};
