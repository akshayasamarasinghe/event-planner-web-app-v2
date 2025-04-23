import User from "../models/User.js";

export const createUserRepo = (data) => {
    return new User(data).save();
};

export const findOneAndUpdateUserRepo = async (filters, data) => {
    delete data._id;
    return User.findOneAndUpdate(
        filters,
        {$set: {...data}},
        {new: true, runValidators: true}
    ).exec();
};

export const findOneUserRepo = (filters) => {
    return User.findOne(filters).exec();
};

export const aggregateUserRepo = (pipeline) => {
    return User.aggregate(pipeline).exec();
};

export const findAllUsersRepo = (filters) => {
    return User.find(filters).exec();
};
