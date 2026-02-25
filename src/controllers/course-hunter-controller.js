import { DataProcessingPipeLine } from "../services/course-hunter/index.js";

export const searchCourses = async (req, res, next) => {
  try {
    const results = await new DataProcessingPipeLine().execute();
    res.json(results);
  } catch (error) {
    next(error);
  }
};
