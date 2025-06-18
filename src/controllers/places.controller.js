const { AppDataSource } = require("../config/data-source")
const PlaceService = require("../services/places.service")

const placesRepo = AppDataSource.getRepository('Places')
const service = new PlaceService(placesRepo)

module.exports = {
    createPlace: async (request, response) => {
        try {
            const { userId, name, description, latitude, longitude, address  } = request.body

            const place = await service.create({ createdBy: userId, name, description, longitude, address });

            return response.status(201).json(place)
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    listPlaces: async (request, response) => {
        try {
            const places = await service.list()

            return response.json(places)
        } catch (error) {
           return response.status(500).json({ error: error.message });
        }
    }
}