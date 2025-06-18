const eventService = require('../services/events.service'); 

const eventController = {
  
  create: async (req, res) => {
    try {
      const eventData = req.body; 
      
      if (!eventData.title || !eventData.date) {
        return res.status(400).json({ error: 'Título e data do evento são obrigatórios.' });
      }

      const newEvent = await eventService.createEvent(eventData);
      return res.status(201).json(newEvent); 
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  
  getAll: async (req, res) => {
    try {
      const events = await eventService.getAllEvents();
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await eventService.getEventById(id);
      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado.' });
      }
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedEvent = await eventService.updateEvent(id, updatedData);
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Evento não encontrado para atualização.' });
      }
      return res.status(200).json(updatedEvent);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await eventService.deleteEvent(id);
      if (result === 0) {
        return res.status(404).json({ message: 'Evento não encontrado para exclusão.' });
      }
      return res.status(204).send(); 
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = eventController;