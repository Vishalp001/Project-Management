import Project from '../models/Project.js'
import Task from '../models/Task.js'
export async function createProject(req, res) {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function getMyProjects(req, res) {
  try {
    const ownerId = req.params.ownerId
    const projects = await Project.find({ owner: ownerId }).populate(
      'owner members tasks'
    )

    if (!projects || projects.length === 0) {
      return res.status(404).json({ error: 'No projects found for this owner' })
    }
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ error: err.message })
  }
}

export async function getAllProjects(req, res) {
  try {
    const projects = await Project.find().populate('owner members tasks')
    res.status(200).json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id).populate(
      'owner members tasks'
    )
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.status(200).json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateProject(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.status(200).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    await Task.deleteMany({ project: req.params.id })

    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
