import Task from '../models/Task.js'

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      'project assignedUsers comments files owner'
    )
    res.status(200).json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'project assignedUsers comments files owner'
    )
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.status(200).json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
