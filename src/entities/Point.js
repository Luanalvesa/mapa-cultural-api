// src/entities/Point.js
const { EntitySchema } = require("typeorm");

const Point = new EntitySchema({
    name: "Point",
    tableName: "points",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        description: {
            type: "text",
            nullable: true,
        },
        type: { 
            type: "varchar",
            length: 50,
            nullable: false,
        },
        latitude: {
            type: "decimal",
            precision: 10,
            scale: 8,
            nullable: true,
        },
        longitude: {
            type: "decimal",
            precision: 11,
            scale: 8,
            nullable: true,
        },
        address: { 
            type: "varchar",
            length: 255,
            nullable: true,
        },
        locationName: { 
            type: "varchar",
            length: 255,
            nullable: true,
        },
        
        imageUrls: {
            type: "json", 
            nullable: true,
            default: [],
        },
        curiosities: {
            type: "text",
            nullable: true,
        },
        openingHours: { 
            type: "json",
            nullable: true,
            default: {},
        },
        averageRating: {
            type: "decimal",
            precision: 3,
            scale: 2,
            default: 0.0,
            nullable: false,
        },
        checkInsCount: {
            type: "int",
            default: 0,
            nullable: false,
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

module.exports = { Point };