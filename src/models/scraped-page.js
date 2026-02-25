import { mongoose } from "../config/database.js";
const { Schema } = mongoose;

const ScrapedPageSchema = new Schema({
  // Reference to search context and its specific link
  searchContextId: {
    type: Schema.Types.ObjectId,
    ref: "SearchContext",
    required: true,
  },

  // A URL específica que foi raspada
  url: {
    type: String,
    required: true,
  },

  // The raw content (pure HTML, the text extracted by scraper tool)
  rawContent: {
    type: String,
    required: true,
  },

  // Scraping metadata. eg: data
  scrapedAt: {
    type: Date,
    default: Date.now,
  },

  // Status da extração (sucesso, erro de bloqueio, página fora do ar, etc.)
  status: {
    type: String,
    enum: ["SUCCESS", "ERROR_TIMEOUT", "ERROR_BLOCKED"],
    default: "SUCCESS",
  },
});

export const ScrapedPage = mongoose.model("ScrapedPage", ScrapedPageSchema);
