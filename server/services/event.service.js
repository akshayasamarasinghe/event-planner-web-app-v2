import {
    aggregateEventRepo,
    createEventRepo,
    findOneAndUpdateEventRepo,
    findOneEventRepo
} from "../data-access/event.repo.js";

export const createEventService = async (data) => {
    try {
        return await createEventRepo(data);
    } catch (e) {
        throw e;
    }
};

export const updateEventService = async (filters, data) => {
    try {
        return await findOneAndUpdateEventRepo(filters, data);
    } catch (e) {
        throw e;
    }
};

export const findOneEventService = async (filters) => {
    try {
        return await findOneEventRepo(filters);
    } catch (e) {
        throw e;
    }
};

export const findEventsService = async (data) => {
    const {categories, search} = data;
    let filters = {};
    if (categories?.length > 0) {
        filters = {
            category: {
                $in: categories
            }
        }
    }

    if (search) {
        filters = {
            ...filters,
            searchText: {
                $regex: search,
                $options: "i",
            },

        }
    }
    try {
        return await aggregateEventRepo([
            {
                $addFields: {
                    searchText: {$concat: ["$title", " ", "$description"]}
                }
            },
            {
                $match: {
                    ...filters,
                }
            }
        ]);
    } catch (e) {
        throw e;
    }
};
