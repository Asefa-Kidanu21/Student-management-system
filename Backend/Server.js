import express from "express";
import cors from "cors";
import authRoutes from "./Features/Auth/Routes/authRoutes.js";
import adminRoutes from "./Features/Admin/Routes/adminRoutes.js";
import taskRoutes from "./Features/Tasks/Routes/taskRoutes.js";
import studentRoutes from "./Features/Students/Routes/studentRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/students", studentRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});