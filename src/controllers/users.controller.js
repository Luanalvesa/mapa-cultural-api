const CryptoJS = require("crypto-js");
const { AppDataSource } = require("../config/data-source");
const UserService = require("../services/users.service");

const userRepo = AppDataSource.getRepository("User");
const service = new UserService(userRepo);

module.exports = {
  register: async (request, response) => {
    try {
      const { name, userName, email, password } = request.body;

      const existUser = await service.findOneByEmail(email) || await service.findOneByUserName(userName)

      if (existUser) return response.status(400).json({ message: 'Exist user' })

      const encrypted = CryptoJS.SHA256(password).toString();
      const user = await service.create({ name, email, userName, password: encrypted });

      response
        .status(201)
        .json({
          id: user.id,
          name: user.name,
          userName: user.userName,
          email: user.email
        });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      const encrypted = CryptoJS.SHA256(password).toString();

      const user = await service.findOneBy(email);

      if (!user) return response.status(400).json({ message: "User not found" });

      if (user.password !== encrypted) return response.status(400).json({ message: "Password not match" });

      response.json({
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};