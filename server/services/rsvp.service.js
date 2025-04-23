import {createRsvpRepo, findAllRsvpsRepo, findOneAndUpdateRsvpRepo, findOneRsvpRepo} from "../data-access/rsvp.repo.js";

export const createRsvpService = async (data) => {
    try {
        return await createRsvpRepo(data);
    } catch (e) {
        throw e;
    }
};

export const updateRsvpService = async (filters, data) => {
    try {
        return await findOneAndUpdateRsvpRepo(filters, data);
    } catch (e) {
        throw e;
    }
};

export const findOneRsvpService = async (filters) => {
    try {
        return await findOneRsvpRepo(filters);
    } catch (e) {
        throw e;
    }
};

export const findRsvpsService = async (filters) => {
    try {
        return await findAllRsvpsRepo(filters);
    } catch (e) {
        throw e;
    }
};
