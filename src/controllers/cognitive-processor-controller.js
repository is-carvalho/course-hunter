import CourseExtractor from "../services/cognitive-processor/course-extractor.js";

export const extractCourse = async (req, res, next) => {
  try {
    const result = await CourseExtractor.executePipeline(urlsParaTeste);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
