const { Router } = require("express");
const usersControllers = require("../controllers/users.controllers");
const placeController = require('../controllers/places.controllers'); 
const eventController = require('../controllers/events.controllers'); 

const routes = Router();

routes.post("/auth/register", usersControllers.register);
routes.post("/auth/login", usersControllers.login);

routes.post('/places', placeController.create); 
routes.get('/places', placeController.getAll);   
routes.get('/places/:id', placeController.getById); 
routes.put('/places/:id', placeController.update); 
routes.delete('/places/:id', placeController.delete); 

module.exports = routes;