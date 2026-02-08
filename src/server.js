import express from "express";
import { env } from "./env/index.js";
import "./config/database.js";
// import { Course } from "./models/course.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port: ${env.PORT}`);
});
