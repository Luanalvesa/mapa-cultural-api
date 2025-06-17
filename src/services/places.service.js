const Place = require('../entities/Place'); 

class PlaceService {
  async createPlace(placeData) {
    try {
      const newPlace = await Place.create(placeData);
      return newPlace;
    } catch (error) {
      console.error('Erro ao criar lugar:', error);
      throw new Error('Falha ao criar lugar.');
    }
  }

  async getAllPlaces() {
    try {
      const places = await Place.findAll(); 
      return places;
    } catch (error) {
      console.error('Erro ao buscar lugares:', error);
      throw new Error('Falha ao buscar lugares.');
    }
  }

  async getPlaceById(id) {
    try {
      const place = await Place.findByPk(id); 
      return place;
    } catch (error) {
      console.error(`Erro ao buscar lugar com ID ${id}:`, error);
      throw new Error(`Falha ao buscar lugar.`);
    }
  }

  async updatePlace(id, updatedData) {
    try {
      const place = await Place.findByPk(id);
      if (!place) {
        return null; 
      }
      await place.update(updatedData);
      return place;
    } catch (error) {
      console.error(`Erro ao atualizar lugar com ID ${id}:`, error);
      throw new Error('Falha ao atualizar lugar.');
    }
  }

  async deletePlace(id) {
    try {
      const result = await Place.destroy({
        where: { id: id },
      });
      return result; 
    } catch (error) {
      console.error(`Erro ao deletar lugar com ID ${id}:`, error);
      throw new Error('Falha ao deletar lugar.');
    }
  }
}

module.exports = new PlaceService();