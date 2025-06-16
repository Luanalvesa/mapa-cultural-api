require('dotenv').config(); 
const { DataSource } = require("typeorm");
const { User } = require("../entities/User");
const { Point } = require("../entities/Point");
const { Event } = require("../entities/Event");
const { Route } = require("../entities/Route");
const { CheckIn } = require("../entities/CheckIn");
const { Badge } = require("../entities/Badge");
const { UserBadge } = require("../entities/UserBadge");


const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/mapa_cultural.sqlite", 
    synchronize: true, 
    entities: [
        User,
        Point,
              
    ],
    logging: true, 
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

module.exports = { AppDataSource };