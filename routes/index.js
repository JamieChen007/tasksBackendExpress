const express = require("express");
const tasksRouter = require("./taskRouter");

const router = express.Router();

router.use("/tasks", tasksRouter);

module.exports = router;
