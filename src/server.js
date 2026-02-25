import express from "express";
import { env } from "./env/index.js";

import courseHunterRoutes from "./routes/course-hunter.js";
import cognitiveProcessorRoutes from "./routes/cognitive-processor.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/course-hunter", courseHunterRoutes);
app.use("/cognitive-processor", cognitiveProcessorRoutes);

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port: ${env.PORT}`);
});
