import "chromedriver";
import { Builder, By, until } from "selenium-webdriver";
import fs from "fs/promises";
import GeminiProvider from "./gemini-provider.js";
import { COURSE_ANALYSIS_PROMPT } from "../constants/extraction-prompts.js";

export class CourseExtractor {
  async _scrapeText(url) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      console.log(`[Selenium] Acessando: ${url}`);
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

  async executePipeline(urls) {
    const results = [];

    for (const url of urls) {
      const rawText = await this._scrapeText(url);

      if (!rawText) {
        console.warn(`[Skip] Falha ao ler ${url}`);
        continue;
      }

      const finalPrompt = COURSE_ANALYSIS_PROMPT.replace(
        "{{TEXT_CONTENT}}",
        rawText,
      );

      console.log(`[AI] Analisando dados de: ${url}...`);
      const structuredData = await GeminiProvider.generateJSON(finalPrompt);

      if (structuredData) {
        results.push({
          url: url,
          ...structuredData,
        });
      }
    }

    if (results.length > 0) {
      await this._persistResults(results);
    }

    return results;
  }
}

export default new CourseExtractor();
