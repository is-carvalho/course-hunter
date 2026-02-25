import { ScrapedPage } from '../../models/scraped-page.js';

export class ScrapedPageRepository {
  async create(data) {
    // data: { searchContextId, url, rawContent, status, scrapedAt }
    const doc = new ScrapedPage(data);
    return await doc.save();
  }

  async findByUrl(url) {
    return await ScrapedPage.findOne({ url });
  }

  async findById(id) {
    return await ScrapedPage.findById(id);
  }

  async findAll(filter = {}) {
    return await ScrapedPage.find(filter);
  }

  async updateStatus(id, status) {
    return await ScrapedPage.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export default new ScrapedPageRepository();
