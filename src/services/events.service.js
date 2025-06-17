const Event = require('../entities/Event'); 

class EventService {
  async createEvent(eventData) {
    try {
      const newEvent = await Event.create(eventData);
      return newEvent;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw new Error('Falha ao criar evento.');
    }
  }

  async getAllEvents() {
    try {
      const events = await Event.findAll();
      return events;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw new Error('Falha ao buscar eventos.');
    }
  }

  async getEventById(id) {
    try {
      const event = await Event.findByPk(id);
      return event;
    } catch (error) {
      console.error(`Erro ao buscar evento com ID ${id}:`, error);
      throw new Error(`Falha ao buscar evento.`);
    }
  }

  async updateEvent(id, updatedData) {
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        return null;
      }
      await event.update(updatedData);
      return event;
    } catch (error) {
      console.error(`Erro ao atualizar evento com ID ${id}:`, error);
      throw new Error('Falha ao atualizar evento.');
    }
  }

  async deleteEvent(id) {
    try {
      const result = await Event.destroy({
        where: { id: id },
      });
      return result;
    } catch (error) {
      console.error(`Erro ao deletar evento com ID ${id}:`, error);
      throw new Error('Falha ao deletar evento.');
    }
  }
}

module.exports = new EventService();