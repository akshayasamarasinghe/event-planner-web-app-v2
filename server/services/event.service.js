import {
    aggregateEventRepo,
    createEventRepo,
    findOneAndUpdateEventRepo,
    findOneEventRepo
} from "../data-access/event.repo.js";
import {findOneUserRepo} from "../data-access/user.repo.js";

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
    const {user, _id} = filters;
    try {
        return await findOneEventRepo({_id});
    } catch (e) {
        throw e;
    }
};

export const eventRsvpService = async (data) => {
    try {
        let existingUser = {};
        const selectedEvent = await findOneEventRepo({_id: data?.event});
        const modifiedRsvps = selectedEvent?.rsvps?.length > 0 ? selectedEvent?.rsvps : [];
        const isExist = modifiedRsvps?.find((rsvp) => rsvp?.user?.toString() === data?.user);
        if (isExist) {
            return {message: "User is already responded to this invitation!"};
        }
        existingUser = await findOneUserRepo({_id: data?.user});
        modifiedRsvps?.push({
            name: `${existingUser?.first_name} ${existingUser?.last_name}`,
            email: existingUser?.email,
            phone_no: existingUser?.phone_no,
            user: existingUser?._id ? existingUser?._id : undefined,
        });
        return await findOneAndUpdateEventRepo(
            {_id: data?.event},
            {rsvps: modifiedRsvps},
        );
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
