// User Schema
import mongoose, { model } from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
)

export default model('User', UserSchema)
