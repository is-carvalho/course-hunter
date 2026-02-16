import express from "express";
import { env } from "./env/index.js";
import "./config/database.js";

import { DataProcessingPipeLine } from "./services/course-hunter/index.js";
// import { Course } from "./models/course.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/teste", async (req, res) => {
  const courseHunter = new DataProcessingPipeLine();
  courseHunter.execute();
  res.send();
});

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port: ${env.PORT}`);
});
