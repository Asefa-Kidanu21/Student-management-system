

import express from "express";
import {
    register,
    login
 } from "../Controllers/authController.js";
 import { authMiddleware } from "../../../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "You are authenticated",
        user: req.user
    });

});


export default router;