import mongoose, { model } from 'mongoose'

const { Schema } = mongoose

const InvitationSchema = new Schema(
  {
    email: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
    invitedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default model('Invitation', InvitationSchema)
