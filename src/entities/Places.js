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
    relations: {
        createdBy: {
            target: 'User',
            type: 'many-to-one',
            joinColumn: true,
            onDelete: "SET NULL",
        }
    }
});

module.exports = { Places };