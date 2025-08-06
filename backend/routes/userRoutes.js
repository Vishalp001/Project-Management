import { Router } from 'express'
const router = Router()
import {
  registerUser,
  getAllUsers,
  updateUser,
  getUserByUid,
  deleteUser,
  loginUser,
  getUserById,
} from '../controllers/userController.js'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.get('/:uid', getUserByUid)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
