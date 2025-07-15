// Task Schema
import mongoose, { model } from 'mongoose'
const { Schema } = mongoose

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      default: 'To Do',
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

export default model('Task', TaskSchema)
