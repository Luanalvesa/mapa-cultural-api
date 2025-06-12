const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../../database.sqlite');

class Database {
  constructor() {
    this.db = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          console.error('Erro ao conectar com SQLite:', err.message);
          reject(err);
        } else {
          console.log('✅ Conectado ao banco SQLite');
          resolve();
        }
      });
    });
  }

  async initTables() {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createEventsTable = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date_start DATETIME NOT NULL,
        date_end DATETIME,
        location TEXT,
        address TEXT,
        latitude REAL,
        longitude REAL,
        category TEXT,
        max_participants INTEGER,
        current_participants INTEGER DEFAULT 0,
        price DECIMAL(10,2) DEFAULT 0,
        image_url TEXT,
        status TEXT DEFAULT 'active',
        created_by INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users (id)
      )
    `;

    const createEventParticipantsTable = `
      CREATE TABLE IF NOT EXISTS event_participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'confirmed',
        FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        UNIQUE(event_id, user_id)
      )
    `;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(createUsersTable);
        this.db.run(createEventsTable);
        this.db.run(createEventParticipantsTable, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Tabelas criadas/verificadas com sucesso');
            resolve();
          }
        });
      });
    });
  }

  getDb() {
    return this.db;
  }

  close() {
    return new Promise((resolve) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) {
            console.error('Erro ao fechar banco:', err.message);
          } else {
            console.log('Conexão com banco fechada');
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

const database = new Database();

const initDatabase = async () => {
  await database.connect();
  await database.initTables();
};

module.exports = {
  database,
  initDatabase,
  getDb: () => database.getDb()
};