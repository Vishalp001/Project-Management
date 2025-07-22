import { Router } from 'express'
const router = Router()
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getMyProjects,
} from '../controllers/projectController.js'

router.post('/', createProject)
router.get('/', getAllProjects)
router.get('/:id', getProjectById)
router.get('/owner/:ownerId', getMyProjects)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

export default router
