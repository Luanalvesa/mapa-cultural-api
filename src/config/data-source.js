const { DataSource } = require("typeorm");

const Task = require("../entities/Task");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/todo.sqlite",
  synchronize: true,
  entities: [Task],
});

module.exports = { AppDataSource };