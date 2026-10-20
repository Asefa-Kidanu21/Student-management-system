import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { 
createUserModel,
findUserByEmailModel,
 } from "../Models/authModel.js";

export const registerUser = async (name, email, password) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserModel(
        name,
        email,
        hashedPassword
    );

    return user;
};


export const loginUser = async (email, password) => {

    const user = await findUserByEmailModel(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token
    };
};

