import express from "express";
import { env } from "./env/index.js";
import CourseExtractor from "./services/cognitive-processor/course-extractor.js";
import { MongoSearchContextRepository } from "./repositories/mongoose/mongo-search-context-repository.js";

import "./config/database.js";

import { DataProcessingPipeLine } from "./services/course-hunter/index.js";
// import { Course } from "./models/course.js";

import courseHunterRoutes from "./routes/course-hunter.js";
import cognitiveProcessorRoutes from "./routes/cognitive-processor.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/teste", async (req, res) => {
  const courseHunter = new DataProcessingPipeLine();
  courseHunter.execute();
  res.send();
});

app.get("/teste2", async (req, res) => {
  const repo = new MongoSearchContextRepository();
  const google_results = await repo.findMany();
  console.log(google_results);
});

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port: ${env.PORT}`);
});

// Rotas customizadas
app.use("/course-hunter", courseHunterRoutes);
app.use("/cognitive-processor", cognitiveProcessorRoutes);
