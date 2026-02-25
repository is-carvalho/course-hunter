export class IAiExtractionRepository {
  async create(data) {
    throw new Error("Method 'create' must be implemented.");
  }

  async findById(id) {
    throw new Error("Method 'findById' must be implemented.");
  }

  async findAll(filter = {}) {
    throw new Error("Method 'findAll' must be implemented.");
  }

  async updateStatus(id, status) {
    throw new Error("Method 'updateStatus' must be implemented.");
  }
}
