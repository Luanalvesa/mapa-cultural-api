class UserService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(data) {
    return await this.repo.save(data);
  }

  async findOneByEmail(email) {
    return await this.repo.findOne({ where: { users: { email: email } } });
  }

    async findOneByUserName(userName) {
    return await this.repo.findOne({ where: { users: { userName: userName } } });
  }
}

module.exports = UserService;