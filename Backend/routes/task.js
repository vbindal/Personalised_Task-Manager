const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route('/:userId').get(getAllTasks).post(createTask)
router.route('/:userId/:taskId').get(getTask).patch(updateTask).delete(deleteTask)

// router.route('/').get((req,res)=>{
//     res.send("data")
// })

module.exports = router;
