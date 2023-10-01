const Tasks = require("../models/Tasks");
const User = require("../models/user")
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../error/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  
  const userId = req.params.userId
  console.log(req.user)
  const user = await User.findById(userId)

  if(!user)res.status(404).send('user not found')

  const Task = await Tasks.create(req.body);
  user.tasks.push(Task._id)
  await user.save()
  res.status(201).json({ Task });

  //res.json(req.body)
});

const getTask = asyncWrapper(async (req, res,next) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOne({ _id: taskId });
  if (!task) {
    
    return next(`no task id : ${taskId}`,404)

  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(`no task id : ${taskId}`,404)
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(`no task id : ${taskId}`,404)
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
