const { EntitySchema } = require("typeorm");

const Places = new EntitySchema({
    name: "Places",
    tableName: "place",
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
        averageRating: {
            type: "integer",
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

module.exports = { Places };