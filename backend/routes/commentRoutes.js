import { Router } from 'express'
const router = Router()
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js'

router.post('/', createComment)
router.get('/', getAllComments)
router.get('/:id', getCommentById)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

export default router
