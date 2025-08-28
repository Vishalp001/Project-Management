import mongoose, { model } from 'mongoose'
const { Schema } = mongoose

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    color: { type: String },
  },
  { timestamps: true }
)

export default model('Project', ProjectSchema)
