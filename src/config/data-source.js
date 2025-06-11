const { DataSource } = require("typeorm");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') }); 

const Task = require("../tasks/Task"); 
const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DB_NAME, 
    synchronize: true,
    entities: [Task],
    logging: true 
});


module.exports = AppDataSource;