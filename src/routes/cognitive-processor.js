import express from "express";
import { extractCourse } from "../controllers/cognitive-processor-controller.js";

const router = express.Router();

router.get("/extract", extractCourse);

export default router;
