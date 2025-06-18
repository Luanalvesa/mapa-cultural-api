class EventService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(data) {
    return await this.repo.save(data);
  }

  async list() {
    return await this.repo.find();
  }
}

module.exports = EventService;