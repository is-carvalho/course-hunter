export class ISearchContextRepository {
  async save(searchContext) {
    throw new Error("Method 'save' must be implemented.");
  }

  async findByEmecTerm(emecTerm) {
    throw new Error("Method 'findByEmecTerm' must be implemented.");
  }

  async findMany() {
    throw new Error("Method 'findMany' must be implemented.");
  }

  async updateStatus(searchContextId, status) {
    throw new Error("Method 'updateStatus' must be implemented.");
  }
}
