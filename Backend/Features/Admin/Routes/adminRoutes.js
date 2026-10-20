

import express from "express";

import { 
    getUsers,
    createUserController,
    updateUserController,
    deleteUserController
 } from "../Controllers/adminController.js";

import { authMiddleware } from "../../../Middleware/authMiddleware.js";
import { roleMiddleware } from "../../../Middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    roleMiddleware(["admin", "student"]),
    getUsers
);

router.post(
    "/users",
    authMiddleware,
    roleMiddleware(["admin"]),
    createUserController
);
router.put(
    "/users/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateUserController
);
router.delete(
    "/users/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteUserController
);

export default router;