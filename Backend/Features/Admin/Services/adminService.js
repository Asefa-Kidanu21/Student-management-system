
import bcrypt from "bcryptjs";
import {
     getAllUsersModel,
     createUserModel,
     updateUserModel,
     deleteUserModel
     } from "../Models/adminModel.js";

export const getAllUsers = async () => {
    const users = await getAllUsersModel();

    return users;
};
export const createUser = async (name, email, password, role) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserModel(
        name,
        email,
        hashedPassword,
        role
    );

    return user;
};
export const updateUser = async (
    id,
    name,
    email,
    role
) => {
    const user = await updateUserModel(
        id,
        name,
        email,
        role
    );

    return user;
};

export const deleteUser = async (id) => {
    const user = await deleteUserModel(id);

    return user;
};