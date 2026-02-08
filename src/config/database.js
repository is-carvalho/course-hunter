import mongoose from "mongoose";
import { env } from "../env/index.js";

mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    console.log("🎲 Database connection successfully established");
  })
  .catch((error) => {
    console.error("❌ Database connection failed: ", error);
  });

export { mongoose };
