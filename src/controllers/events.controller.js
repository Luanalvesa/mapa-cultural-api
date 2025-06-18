const { AppDataSource } = require("../config/data-source");
const EventService = require("../services/events.service");

const eventsRepo = AppDataSource.getRepository('Events')
const service = new EventService(eventsRepo)

module.exports = {
    createEvent: async (request, response) => {
        try {
            const { userId, name, description, latitude, longitude, address, checkIns } = request.body

            const place = await service.create({ createdBy: userId, name, description, latitude, longitude, address, checkIns });

            return response.status(201).json(place)

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    listEvents: async (request, response) => {
        try {
            const events = await service.list()

            return response.json(events)
        } catch (error) {
             return response.status(500).json({ error: error.message });
        }
    }
}