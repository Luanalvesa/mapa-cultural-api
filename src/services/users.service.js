class UserService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(data) {
    return await this.repo.save(data);
  }

  async findOneByEmail(email) {
    return await this.repo.find({ where: { users: { email: email } } });
  }
}

module.exports = UserService;