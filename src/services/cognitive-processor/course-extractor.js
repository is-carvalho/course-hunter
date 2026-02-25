import "chromedriver";
import { Builder, By, until } from "selenium-webdriver";
import fs from "fs/promises";
import GeminiProvider from "./gemini-provider.js";
import { COURSE_ANALYSIS_PROMPT } from "../constants/extraction-prompts.js";

export class CourseExtractor {
  #ScrepedPageRepository;
  #AiExtractionRepository;
  constructor(ScrepedPageRepository, AiExtractionRepository) {
    this.#ScrepedPageRepository = ScrepedPageRepository;
    this.#AiExtractionRepository = AiExtractionRepository;
  }

  async _scrapeText(url) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      console.log(`[Selenium] Acessing: ${url}`);
      await driver.get(url);

      await driver.wait(until.elementLocated(By.tagName("body")), 10000);

      const body = await driver.findElement(By.tagName("body"));
      const text = await body.getText();

      return text.substring(0, 30000);
    } catch (e) {
      console.error(`[Selenium] Erro em ${url}:`, e.message);
      return null;
    } finally {
      await driver.quit();
    }
  }

  async _persistResults(newResults, filePath = "resumos.json") {
    let existingData = [];
    try {
      const content = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(content);
    } catch (e) {
      existingData = [];
    }

    const existingUrls = new Set(existingData.map((i) => i.url));
    const timestamp = new Date().toISOString();

    for (const item of newResults) {
      item.processedAt = timestamp;
      if (existingUrls.has(item.url)) {
        console.log(`[Persistência] URL já existente, ignorando: ${item.url}`);
      } else {
        existingData.push(item);
      }
    }

    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
    console.log(`[Persistência] Dados salvos em ${filePath}`);
  }

  /**
   * @param {Array<{ url: string, searchContextId?: string, courseId?: string }>} urlObjects
   * urlObjects: [{ url, searchContextId, courseId }]
   */
  async executePipeline(urlObjects) {
    const results = [];

    for (const { url, searchContextId, courseId } of urlObjects) {
      const rawText = await this._scrapeText(url);

      if (!rawText) {
        console.warn(`[Skip] Fail to read ${url}`);
        continue;
      }

      // Persist raw scraped page
      let scrapedPageDoc;
      try {
        scrapedPageDoc = await this.#ScrepedPageRepository.create({
          searchContextId: searchContextId || undefined,
          url,
          rawContent: rawText,
          status: "SUCCESS",
        });
        console.log(`[DB] ScrapedPage saved for ${url}`);
      } catch (err) {
        console.error(
          `[DB] Failed to save ScrapedPage for ${url}:`,
          err.message,
        );
        continue;
      }

      const finalPrompt = COURSE_ANALYSIS_PROMPT.replace(
        "{{TEXT_CONTENT}}",
        rawText,
      );

      console.log(`[AI] Analyzing data from: ${url}...`);
      const structuredData = await GeminiProvider.generateJSON(finalPrompt);

      if (structuredData) {
        // Persist AI extraction
        try {
          await this.#AiExtractionRepository.create({
            scrapedPageId: scrapedPageDoc._id,
            courseId: courseId || undefined,
            extractedData: structuredData,
            curationStatus: "PENDING_REVIEW",
          });
          console.log(`[DB] AiExtraction saved for ${url}`);
        } catch (err) {
          console.error(
            `[DB] Failed to save AiExtraction for ${url}:`,
            err.message,
          );
        }
        results.push({
          url: url,
          ...structuredData,
        });
      }
    }

    return results;
  }
}
