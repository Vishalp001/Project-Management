// Comment Schema
import mongoose, { model } from 'mongoose'
const { Schema } = mongoose

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

export default model('Comment', CommentSchema)
