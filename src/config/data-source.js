const { DataSource } = require("typeorm");
const { User } = require("../entities/User");
const { Places } = require("../entities/Places");
const { Events } = require("../entities/Events");

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/mapa_cultural.sqlite", 
    synchronize: true, 
    entities: [
        User,
        Places, Events            
    ],
});

module.exports = { AppDataSource };