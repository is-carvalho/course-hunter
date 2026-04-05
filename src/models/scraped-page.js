import { mongoose } from "../config/database.js";
const { Schema } = mongoose;

const ScrapedPageSchema = new Schema({

  // Referência ao contexto de busca de origem
  searchContextId: {
    type: Schema.Types.ObjectId,
    ref: "SearchContext",
    required: true,
  },

  // Índice do item em searchContext.searchResult.items que originou esta raspagem
  searchContextItemIndex: {
    type: Number,
    required: true,
    description: "Índice do item em searchResult.items do SearchContext que originou esta página raspada",
  },

  // Referência direta ao curso relacionado (opcional, para facilitar tracking)
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: false,
  },

  // Referência à extração de IA (opcional)
  aiExtractionId: {
    type: Schema.Types.ObjectId,
    ref: "AiExtraction",
    required: false,
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
