// src/models/Task.js
const { EntitySchema } = require("typeorm"); 

const Task = new EntitySchema({
  name: "Task", 
  tableName: "tasks", 
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true, 
    },
    title: {
      type: String,
      nullable: false,
    },
    description: {
      type: String,
      nullable: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
  
});

module.exports = Task; 