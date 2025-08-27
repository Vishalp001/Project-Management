import express from 'express'
import {
  acceptInvitation,
  getInviteUserDetails,
  inviteCollaborator,
} from '../controllers/inviteController.js'

const router = express.Router()

router.post('/', inviteCollaborator)
router.patch('/accept', acceptInvitation)
router.post('/getInviteUserDetails/:token', getInviteUserDetails)

export default router
