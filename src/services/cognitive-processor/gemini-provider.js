import { env } from "../../env/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiProvider {
  constructor() {
    this.genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async generateJSON(promptText) {
    try {
      const result = await this.model.generateContent(promptText);
      const response = await result.response;
      let textResponse = response.text();

      textResponse = textResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(textResponse);
    } catch (error) {
      console.error("Erro na comunicação com Gemini:", error.message);
      return null;
    }
  }
}

export default new GeminiProvider();
