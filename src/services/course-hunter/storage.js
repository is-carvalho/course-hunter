export class SearchResultProcessor {
  #searchResults;
  #contextRepository;

  constructor(searchResults, contextRepository) {
    this.#searchResults = searchResults;
    this.#contextRepository = contextRepository;
  }

  async #processSingleResult(result) {
    if (result.status === "fulfilled") {
      const { value } = result;
      const searchContextData = {
        emecTerm: value.course,
        constructedQuery: value.query,
        searchResult: value.searchResult,
      };
      await this.#contextRepository.save(searchContextData);
      console.log(`✓ Search context saved for: ${searchContextData.emecTerm}`);
      return { status: "success", emecTerm: searchContextData.emecTerm };
    } else if (result.status === "rejected") {
      console.log(`⚠ Search request failed: ${result.reason.message}`);
      return { status: "failed", emecTerm: null, error: result.reason.message };
    }
  }

  async execute() {
    const savePromises = this.#searchResults.map((result) =>
      this.#processSingleResult(result),
    );

    const processResults = await Promise.all(savePromises);

    // Conta sucessos e falhas
    const successCount = processResults.filter(
      (r) => r.status === "success",
    ).length;
    const failureCount = processResults.filter(
      (r) => r.status === "failed",
    ).length;

    console.log(
      `✅ All search contexts saved successfully (${this.#searchResults.length} total)`,
    );

    return {
      totalSearches: this.#searchResults.length,
      successfulSearches: successCount,
      failedSearches: failureCount,
      savedContexts: this.#searchResults.length,
      summary: {
        message: `${successCount} successful, ${failureCount} failed out of ${this.#searchResults.length} total`,
      },
      processResults,
    };
  }
}
