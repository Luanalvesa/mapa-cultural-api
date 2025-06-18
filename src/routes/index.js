const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller'); 
const placeController = require('../controllers/places.controller'); 
const eventController = require('../controllers/events.controller'); 

router.post('/login', userController.login);
router.post('/register', userController.register);

router.post('/places', placeController.createPlace); 
router.get('/places', placeController.listPlaces);   

router.post('/events', eventController.createEvent); 
router.get('/events', eventController.listEvents);   

module.exports = router;