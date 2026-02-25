import { AiExtraction } from '../../models/Ai-extraction.js';

export class AiExtractionRepository {
  async create(data) {
    // data: { scrapedPageId, courseId, extractedData, suggestedPostText, curationStatus, processedAt, reviewedBy }
    const doc = new AiExtraction(data);
    return await doc.save();
  }

  async findById(id) {
    return await AiExtraction.findById(id);
  }

  async findAll(filter = {}) {
    return await AiExtraction.find(filter);
  }

  async updateStatus(id, status) {
    return await AiExtraction.findByIdAndUpdate(id, { curationStatus: status }, { new: true });
  }
}

export default new AiExtractionRepository();
