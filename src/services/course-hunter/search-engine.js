import axios from "axios";
import { AppError } from "../../utils/global-error.js";

export class SearchEngine {
  #course_queries;
  constructor(course_queries) {
    this.#course_queries = course_queries;
  }

  async execute() {
    const requestPromises = this.#course_queries
      .slice(1, 5)
      .map(async (course_query) => {
        const response = await axios.get(course_query.query);
        return { ...course_query, searchResult: response.data };
      });
    try {
      const searchResults = await Promise.allSettled(requestPromises);
      return { searchResults };
    } catch (error) {
      if (error.response) {
        throw new AppError(
          `Search to url failed: ${error.response.statusText}`,
          error.response.status,
        );
      }
      console.error(error);
      throw new AppError("Search service not available", 500);
    }
  }
}
