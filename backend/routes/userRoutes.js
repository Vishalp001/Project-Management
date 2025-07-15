import { Router } from 'express'
const router = Router()
import {
  createOrUpdateUser,
  getAllUsers,
  getUserById,
  updateUser,
  getUserByUid,
  deleteUser,
} from '../controllers/userController.js'

router.post('/', createOrUpdateUser)
router.get('/', getAllUsers)
router.get('/:uid', getUserByUid)
// router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
