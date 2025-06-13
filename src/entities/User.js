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
        username: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        email: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        password: {
            type: "varchar",
            nullable: false,
        },
        xp: { 
            type: "int",
            default: 0,
            nullable: false,
        },
        level: { 
            type: "int",
            default: 1,
            nullable: false,
        },
        preferences: { 
            type: "json", 
            nullable: true,
            default: {} 
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
    },
});

module.exports = { User };