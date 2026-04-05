import { mongoose } from "../config/database.js";
const { Schema } = mongoose;

const SearchContextSchema = new Schema({
  // 1. The seed (The valided term on pre-filtered e-mec base)
  emecTerm: {
    type: String,
    required: true,
    index: true, // Indexado para buscas rápidas (evitar reprocessar o mesmo termo)
    description: "Course name extracted from public IES base",
  },

  // Referência ao curso de origem
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  // 2. Optimized Query
  // Here you can save final string with injected sufix ("Federal", "Grátis", etc.)
  constructedQuery: {
    type: String,
    required: true,
  },

  // 3. Execution Metadatas
  executionDate: { type: Date, default: Date.now },

  // 4. Searcher results (Google Custom Search JSON)
  searchResult: {
    totalResults: Number,
    items: [
      {
        title: String,
        link: String,
        snippet: String, // Summary gave from google.
      },
    ],
  },

  // Referência às páginas raspadas relacionadas a este contexto
  scrapedPages: [
    {
      type: Schema.Types.ObjectId,
      ref: "ScrapedPage",
    },
  ],

  // 5. Relevance flag (post-processing)
  status: {
    type: String,
    enum: ["PENDING_ANALYSIS", "POTENTIAL_MATCH", "DISCARDED_NO_MATCH"],
    default: "PENDING_ANALYSIS",
  },
});

export const SearchContext = mongoose.model(
  "SearchContext",
  SearchContextSchema,
);
