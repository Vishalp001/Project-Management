import File from '../models/File.js'

export async function createFile(req, res) {
  try {
    const file = await create(req.body)
    res.status(201).json(file)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function getAllFiles(req, res) {
  try {
    const files = await find().populate('uploadedBy task')
    res.status(200).json(files)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getFileById(req, res) {
  try {
    const file = await findById(req.params.id).populate('uploadedBy task')
    if (!file) return res.status(404).json({ error: 'File not found' })
    res.status(200).json(file)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateFile(req, res) {
  try {
    const file = await findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!file) return res.status(404).json({ error: 'File not found' })
    res.status(200).json(file)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function deleteFile(req, res) {
  try {
    const file = await findByIdAndDelete(req.params.id)
    if (!file) return res.status(404).json({ error: 'File not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function uploadFile(req, res) {
  try {
    const file = new File({
      filename: req.file.filename,
      filepath: req.file.path,
      uploadedBy: req.body.uploadedBy,
      task: req.body.task,
    })

    const savedFile = await file.save()
    res.status(201).json(savedFile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
