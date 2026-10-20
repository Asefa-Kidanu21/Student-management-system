

import express from "express";

import {
    getProfile
} from "../Controllers/studentController.js";

import { authMiddleware } from "../../../Middleware/authMiddleware.js";
import { roleMiddleware } from "../../../Middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/profile",
    authMiddleware,
    roleMiddleware(["student"]),
    getProfile
);

export default router;