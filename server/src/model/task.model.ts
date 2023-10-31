import mongoose from "mongoose"
const priorityValues = ["high", "medium", "low"]
const statusValues = ["todo", "done", "pending"]

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: true,
    enum: priorityValues,
  },
  status: {
    type: String,
    enum: statusValues,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Task", TaskSchema, "Tasks")
