// User Schema
import mongoose, { model } from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    photoURL: { type: String },
    password: { type: String, require: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
)

export default model('User', UserSchema)
