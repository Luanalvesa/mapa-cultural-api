const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const Task = require('../tasks/Task');
const User = require('../entities/User');
const Event = require('../entities/Event');
const EventParticipant = require('../entities/EventParticipant');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || './database.sqlite',
  synchronize: process.env.NODE_ENV === 'development',
  entities: [Task, User, Event, EventParticipant],
  logging: process.env.NODE_ENV === 'development'
});

module.exports = AppDataSource;