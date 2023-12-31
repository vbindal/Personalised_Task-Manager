const Tasks = require("../models/Tasks");
const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const userEmail = req.params.email;

  // Find the user by email
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const taskIds = user.tasks;

  const tasks = await Tasks.find({ _id: { $in: taskIds } });

  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const userEmail = req.params.email;
  console.log("email", userEmail);
  const user = await User.findOne({ email: userEmail });
  // console.log(userEmail)
  // console.log(user)
  if (!user) res.status(404).send("user not found");

  const Task = await Tasks.create(req.body);
  user.tasks.push(Task._id);
  await user.save();
  res.status(201).json({ Task });

  //res.json(req.body)
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOne({ _id: taskId });
  if (!task) {
    return next(`no task id : ${taskId}`, 404);
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.taskId;
  const { completed } = req.body; 
  const isCompleted = completed === true;

  const task = await Tasks.findOneAndUpdate(
    { _id: taskId },
    { $set: { completed: isCompleted } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) {
    return next(`No task found with id: ${taskId}`, 404);
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.taskId;
  const task = await Tasks.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(`no task id : ${taskId}`, 404);
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
