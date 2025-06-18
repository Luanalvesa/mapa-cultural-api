// src/entities/User.js
const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        userName: {
            type: "varchar",
            unique: true,
        },
        email: {
            type: "varchar",
            unique: true,
        },
        password: {
            type: "varchar",
        },
        createdAt: {
            type: "datetime",
            createDate: true,
        },
        updatedAt: {
            type: "datetime",
            updateDate: true,
        },
    },
});

module.exports = { User };