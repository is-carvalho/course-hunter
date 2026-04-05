import { QueryGenerator } from "./queries-generator.js";
import { MongoCourseRepository } from "../../repositories/mongoose/mongo-course-repository.js";
import { MongoSearchContextRepository } from "../../repositories/mongoose/mongo-search-context-repository.js";
import { SearchEngine } from "./search-engine.js";
import { SearchResultProcessor } from "./storage.js";

export class DataProcessingPipeLine {
  constructor() {}

  async execute() {
    try {
      const courseRepository = new MongoCourseRepository();
      const searchContextRepository = new MongoSearchContextRepository();

      const queryGenerator = new QueryGenerator(courseRepository);
      const { course_queries } = await queryGenerator.execute();
      console.log(`📝 Generated ${course_queries.length} queries from courses`);

      const searchEngine = new SearchEngine(course_queries);
      const { searchResults } = await searchEngine.execute();
      console.log(`🔍 Executed searches, processing results...`);

      const searchResultProcessor = new SearchResultProcessor(
        searchResults,
        searchContextRepository,
      );
      const { totalSearches, successfulSearches, failedSearches, summary } =
        await searchResultProcessor.execute();

      return {
        totalSearches,
        successfulSearches,
        failedSearches,
        savedContexts: totalSearches,
        summary,
      };
    } catch (error: any) {
      console.error("❌ Error in DataProcessingPipeLine:", error.message);
      throw error;
    }
  }
}
