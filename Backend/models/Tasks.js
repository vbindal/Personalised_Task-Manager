const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name must be provided'],
    trim: true,
    maxlength: [100, 'max characters in name can be 100'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Task = mongoose.model('tasks', TaskSchema);
module.exports = Task;
