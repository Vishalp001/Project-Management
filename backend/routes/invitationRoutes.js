import express from 'express'
import {
  acceptInvitation,
  inviteCollaborator,
} from '../controllers/inviteController.js'

const router = express.Router()

router.post('/accept', acceptInvitation)
router.post('/', inviteCollaborator)

export default router
