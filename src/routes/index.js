const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller'); 
const placeController = require('../controllers/places.controller'); 
const eventController = require('../controllers/events.controller'); 

router.post('/login', userController.login);
router.post('/register', userController.register);

router.post('/places', placeController.create); 
router.get('/places', placeController.getAll);   
router.get('/places/:id', placeController.getById); 
router.put('/places/:id', placeController.update); 
router.delete('/places/:id', placeController.delete); 

router.post('/events', eventController.create); 
router.get('/events', eventController.getAll);   
router.get('/events/:id', eventController.getById); 
router.put('/events/:id', eventController.update); 
router.delete('/events/:id', eventController.delete); 

module.exports = router;