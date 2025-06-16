const { Router } = require("express");
const usersControllers = require("../controllers/users.controllers");

const routes = Router();

routes.post("/auth/register", usersControllers.register);
routes.post("/auth/login", usersControllers.login);

module.exports = routes;