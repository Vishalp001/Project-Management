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

export async function getTaskByProjectId(req, res) {
  try {
    const projectId = req.params.projectId
    const tasks = await Task.find({ project: projectId }).populate(
      'owner assignedUsers'
    )
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: 'No tasks found for this Project' })
    }
    res.status(200).json(tasks)
  } catch (error) {
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
    const { id } = req.params
    const updates = req.body

    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true })

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' })

    res.json(updatedTask)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to update task' })
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
