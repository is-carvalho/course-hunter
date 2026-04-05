import axios, { AxiosError } from "axios";
import { AppError } from "../../utils/global-error.js";
import type { CourseQuery } from "./queries-generator.js";

export type searchResult = {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: {
    previousPage: [
      {
        title: string;
        totalResults: string;
        searchTerms: string;
        count: number;
        startIndex: number;
        startPage: number;
        language: string;
        inputEncoding: string;
        outputEncoding: string;
        safe: string;
        cx: string;
        sort: string;
        filter: string;
        gl: string;
        cr: string;
        googleHost: string;
        disableCnTwTranslation: string;
        hq: string;
        hl: string;
        siteSearch: string;
        siteSearchFilter: string;
        exactTerms: string;
        excludeTerms: string;
        linkSite: string;
        orTerms: string;
        relatedSite: string;
        dateRestrict: string;
        lowRange: string;
        highRange: string;
        fileType: string;
        rights: string;
        searchType: string;
        imgSize: string;
        imgType: string;
        imgColorType: string;
        imgDominantColor: string;
      },
    ];
    request: [
      {
        title: string;
        totalResults: string;
        searchTerms: string;
        count: number;
        startIndex: number;
        startPage: number;
        language: string;
        inputEncoding: string;
        outputEncoding: string;
        safe: string;
        cx: string;
        sort: string;
        filter: string;
        gl: string;
        cr: string;
        googleHost: string;
        disableCnTwTranslation: string;
        hq: string;
        hl: string;
        siteSearch: string;
        siteSearchFilter: string;
        exactTerms: string;
        excludeTerms: string;
        linkSite: string;
        orTerms: string;
        relatedSite: string;
        dateRestrict: string;
        lowRange: string;
        highRange: string;
        fileType: string;
        rights: string;
        searchType: string;
        imgSize: string;
        imgType: string;
        imgColorType: string;
        imgDominantColor: string;
      },
    ];
    nextPage: [
      {
        title: string;
        totalResults: string;
        searchTerms: string;
        count: number;
        startIndex: number;
        startPage: number;
        language: string;
        inputEncoding: string;
        outputEncoding: string;
        safe: string;
        cx: string;
        sort: string;
        filter: string;
        gl: string;
        cr: string;
        googleHost: string;
        disableCnTwTranslation: string;
        hq: string;
        hl: string;
        siteSearch: string;
        siteSearchFilter: string;
        exactTerms: string;
        excludeTerms: string;
        linkSite: string;
        orTerms: string;
        relatedSite: string;
        dateRestrict: string;
        lowRange: string;
        highRange: string;
        fileType: string;
        rights: string;
        searchType: string;
        imgSize: string;
        imgType: string;
        imgColorType: string;
        imgDominantColor: string;
      },
    ];
  };
  promotions: [object];
  context: object;
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  spelling: {
    correctedQuery: string;
    htmlCorrectedQuery: string;
  };
  items: [
    {
      kind: string;
      title: string;
      htmlTitle: string;
      link: string;
      displayLink: string;
      snippet: string;
      htmlSnippet: string;
      cacheId: string;
      formattedUrl: string;
      htmlFormattedUrl: string;
      pagemap: object;
      mime: string;
      fileFormat: string;
      image: {
        contextLink: string;
        height: number;
        width: number;
        byteSize: number;
        thumbnailLink: string;
        thumbnailHeight: number;
        thumbnailWidth: number;
      };
      labels: [
        {
          name: string;
          displayName: string;
          label_with_op: string;
        },
      ];
    },
  ];
};

export type SearchResults = {
  searchResult: searchResult;
  course: string;
  query: string;
  params: URLSearchParams;
}[];

export type PromiseResults = PromiseSettledResult<SearchResults[number]>[];

export class SearchEngine {
  #course_queries;
  constructor(course_queries: CourseQuery[]) {
    this.#course_queries = course_queries;
  }

  async execute() {
    const requestPromises = this.#course_queries
      .slice(1, 5)
      .map(async (course_query) => {
        const response = await axios.get<searchResult>(course_query.query);
        return { ...course_query, searchResult: response.data };
      });
    try {
      const searchResults: PromiseResults =
        await Promise.allSettled(requestPromises);
      return { searchResults };
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
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
