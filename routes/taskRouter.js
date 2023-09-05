const express = require("express");
const {
  getTasks,
  getTasksById,
  updateTask,
  createTask,
  deleteTask,
} = require("../controllers/taskController");

const tasksRouter = express.Router();

tasksRouter.get("/", getTasks);
tasksRouter.get("/:id", getTasksById);
tasksRouter.put("/:id", updateTask);
tasksRouter.post("/", createTask);
tasksRouter.delete("/:id", deleteTask);

module.exports = tasksRouter;
