// File Schema
import mongoose, { model } from 'mongoose'
const { Schema } = mongoose

const FileSchema = new Schema(
  {
    fileName: { type: String, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  },
  { timestamps: true }
)

export default model('File', FileSchema)
