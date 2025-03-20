import {createUserRepo, findAllUsersRepo, findOneAndUpdateUserRepo, findOneUserRepo} from "../data-access/user.repo.js";

export const createUserService = async (data) => {
    try {
        return await createUserRepo(data);
    } catch (e) {
        throw e;
    }
};

export const updateUserService = async (filters, data) => {
    try {
        return await findOneAndUpdateUserRepo(filters, data);
    } catch (e) {
        throw e;
    }
};

export const findOneUserService = async (filters) => {
    try {
        return await findOneUserRepo(filters);
    } catch (e) {
        throw e;
    }
};

export const findUsersService = async (filters) => {
    try {
        return await findAllUsersRepo(filters);
    } catch (e) {
        throw e;
    }
};
