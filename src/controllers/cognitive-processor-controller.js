import { CourseExtractor } from "../services/cognitive-processor/course-extractor.js";
import { MongoSearchContextRepository } from "../repositories/mongoose/mongo-search-context-repository.js";
import ScrapedPageRepository from "../repositories/mongoose/mongo-scraped-page-repository.js";
import AiExtractionRepository from "../repositories/mongoose/mongo-ai-extraction-repository.js";

export const extractCourse = async (req, res, next) => {
  try {
    // Search all relevant contexts (for example: status PENDING_ANALYSIS)
    const searchContexts = (
      await new MongoSearchContextRepository().findMany({
        status: "PENDING_ANALYSIS",
      })
    ).slice(0, 4);
    console.log("searchContexts", searchContexts);
    // Build object array to extractor
    const urlObjects = [];
    for (const context of searchContexts) {
      if (context.searchResult && context.searchResult.items) {
        for (const item of context.searchResult.items) {
          urlObjects.push({
            url: item.link,
            searchContextId: context._id,
            // courseId can be added if exists on context
          });
        }
      }
    }
    const courseExtractor = new CourseExtractor(
      ScrapedPageRepository,
      AiExtractionRepository,
    );
    const result = await courseExtractor.executePipeline(urlObjects);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
