const express = require("express");

const tasksRouter = express.Router();

const tasks = [
  {
    id: 1,
    description: "task 1",
    done: false,
  },
  {
    id: 2,
    description: "task 2",
    done: true,
  },
  {
    id: 3,
    description: "task 3",
    done: false,
  },
];

// 1.GET /tasks get all tasks (allow query params for filtering)
tasksRouter.get("/tasks", (req, res) => {
  res.send(tasks);
});

// 2.GET /tasks/:id get task by id
tasksRouter.get("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).send("id must be number");
    return;
  }
  const filterTask = tasks.filter((item) => {
    return item.id === id;
  });

  if (filterTask.length === 0) {
    return res.status(404).send("task not found");
  }

  res.send(filterTask);
});

// 3.PUT /tasks/:id update task by id
tasksRouter.put("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).send("id must be number");
    return;
  }

  const { description, done } = req.body;

  const foundIndex = tasks.findIndex((task) => task.id === id);

  if (foundIndex === -1) {
    return res.status(404).send("task not found");
  }

  tasks[foundIndex].description = description;
  tasks[foundIndex].done = done;
  res.send({
    msg: "Task update success",
    updatedTask: tasks[foundIndex],
  });
});

// 4.POST/tasks create a new task
tasksRouter.post("/tasks", (req, res) => {
  const { description } = req.body;
  if (description === undefined) {
    res.status(400).send("Description must be filled");
    return;
  }

  const newTask = {
    id: tasks[tasks.length - 1].id + 1,
    description: description,
    done: false,
  };

  tasks.push(newTask);

  res.send({
    msg: "Task create success",
    createdTask: newTask,
  });
});

// 5.DELETE /tasks/:id delete task by id
tasksRouter.delete("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).send("id must be number");
    return;
  }
  const foundIndex = tasks.findIndex((task) => task.id === id);

  if (foundIndex === -1) {
    return res.status(404).send("task not found");
  }

  const deletedTask = tasks.splice(foundIndex, 1);

  res.send({
    msg: "Task delete success",
    deletedTask: deletedTask[0],
  });
});

module.exports = tasksRouter;
