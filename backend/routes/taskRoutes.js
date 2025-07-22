import { Router } from 'express'
const router = Router()
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskByProjectId,
} from '../controllers/taskController.js'

router.post('/', createTask)
router.get('/', getAllTasks)
router.get('/:projectId', getTaskByProjectId)
router.get('/:id', getTaskById)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
