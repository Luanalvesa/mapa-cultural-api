const CryptoJS = require("crypto-js");
const { AppDataSource } = require("../config/data-source");
const UserService = require("../services/users.service");

const userRepo = AppDataSource.getRepository("User");
const service = new UserService(userRepo);

module.exports = {
    register: async (request, response) => {
        const { name, email, password } = request.body;
        
        if (!name || name.trim() === "") {
      return response.status(400).json({ error: "O campo 'name' é obrigatório." });
    }
    if (!email || email.trim() === "") {
      return response.status(400).json({ error: "O campo 'email' é obrigatório." });
    }

        try {
            const encrypted = CryptoJS.SHA256(password).toString();
            const user = await service.create({ name, email, password: encrypted });

            response
                .status(201)
                .json({ id: user.id, name: user.name, email: user.email });
        } catch (err) {
            response.status(400).json({ error: err.message });
        }
    },

    login: async (request, response) => {
        const { email, password } = request.body;

        if (!email || email.trim() === "") {
      return response.status(400).json({ error: "O campo 'email' é obrigatório." });
    }
    if (!password || password.trim() === "") {
      return response.status(400).json({ error: "O campo 'password' é obrigatório." });
    }
    
        const encrypted = CryptoJS.SHA256(password).toString();

        const user = await service.findOneBy({ email, password: encrypted });

        if (!user)
            return response.status(401).json({ message: "Invalid credentials" });


        response.json({
            user: { id: user.id, name: user.name, email: user.email },
        });
    },
};