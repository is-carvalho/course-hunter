import { ISearchContextRepository } from "../search-context-repository.js";
import { SearchContext } from "../../models/search-context.js";

export class MongoSearchContextRepository extends ISearchContextRepository {
  async save(searchContextData) {
    try {
      const searchContext = new SearchContext(searchContextData);
      return await searchContext.save();
    } catch (error) {
      throw new Error(`Failed to save search context: ${error.message}`);
    }
  }

  async findByEmecTerm(emecTerm) {
    try {
      return await SearchContext.findOne({ emecTerm });
    } catch (error) {
      throw new Error(
        `Failed to find search context by term: ${error.message}`,
      );
    }
  }

  async findMany(filter = {}) {
    try {
      return await SearchContext.find(filter);
    } catch (error) {
      throw new Error(`Failed to find search contexts: ${error.message}`);
    }
  }

  async updateStatus(searchContextId, status) {
    try {
      return await SearchContext.findByIdAndUpdate(
        searchContextId,
        { status },
        { new: true },
      );
    } catch (error) {
      throw new Error(
        `Failed to update search context status: ${error.message}`,
      );
    }
  }
}
