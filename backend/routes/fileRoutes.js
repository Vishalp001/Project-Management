import { Router } from 'express'
const router = Router()
import multer, { diskStorage } from 'multer'
import {
  uploadFile,
  getAllFiles,
  getFileById,
  deleteFile,
} from '../controllers/fileController.js'

// Set up disk storage
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage })

// Upload file route
router.post('/upload', upload.single('file'), uploadFile)
router.get('/', getAllFiles)
router.get('/:id', getFileById)
router.delete('/:id', deleteFile)

export default router
