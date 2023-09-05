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
    description: "task3",
    done: false,
  },
];

let i = 4;

const getTasks = (req, res) => {
  const { description } = req.query;
  if (!description) {
    res.json(tasks);
    return;
  }
  const foundItems = tasks.filter((task) => {
    return task.description.includes(description);
  });
  return res.json(foundItems);
};

const getTasksById = (req, res) => {
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

  res.json(filterTask[0]);
};

const updateTask = (req, res) => {
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

  res.json(tasks[foundIndex]);
};

const createTask = (req, res) => {
  const { description } = req.body;
  if (description === undefined) {
    res.status(400).send("Description must be filled");
    return;
  }

  const newTask = {
    id: i,
    description: description,
    done: false,
  };

  i++;

  tasks.push(newTask);

  res.json(newTask);
};

const deleteTask = (req, res) => {
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

  res.json(deletedTask[0]);
};

module.exports = {
  getTasks,
  getTasksById,
  updateTask,
  createTask,
  deleteTask,
};
