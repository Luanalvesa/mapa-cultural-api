const { EntitySchema } = require("typeorm");

const Events = new EntitySchema({
    name: "Events",
    tableName: "event",
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
        },
        description: {
            type: "varchar",
        },
        latitude: {
            type: "integer",
        },
        longitude: {
            type: "integer",
        },
        address: { 
            type: "varchar",
        },       
        checkInsCount: {
            type: "integer",
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

module.exports = { Events };