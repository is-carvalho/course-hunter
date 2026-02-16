import express from "express";
import { searchCourses } from "../controllers/course-hunter-controller.js";

const router = express.Router();

router.post("/search", searchCourses);

export default router;
