require("reflect-metadata");
const express = require("express");
const cors = require('cors')

const { AppDataSource } = require("./config/data-source");
const routes = require("./routes");

const app = express();

app.use(cors({
  origin: '*'
}))

app.use(express.json());
app.use("/", routes);

AppDataSource.initialize()
  .then(() => console.log("📦 Database ready!"))
  .catch((err) => console.error(err));

module.exports = app;