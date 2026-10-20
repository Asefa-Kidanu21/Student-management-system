import express from "express";

import {
    getTasks,
    getAllTasksAsAdmin,
    createTaskController,
    updateTaskController,
    deleteTaskController
} from "../Controllers/taskController.js";

import { authMiddleware } from "../../../Middleware/authMiddleware.js";
import { roleMiddleware } from "../../../Middleware/roleMiddleware.js";

const router = express.Router();


// ========================================
// ADMIN — Get all tasks
// ========================================

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllTasksAsAdmin
);


// ========================================
// ADMIN + STUDENT — Get tasks
// ========================================

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "student"]),
    getTasks
);


// ========================================
// ADMIN + STUDENT — Create task
// ========================================

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "student"]),
    createTaskController
);


// ========================================
// ADMIN + STUDENT — Update task
// ========================================

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin", "student"]),
    updateTaskController
);


// ========================================
// ADMIN + STUDENT — Delete task
// ========================================

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin", "student"]),
    deleteTaskController
);


export default router;