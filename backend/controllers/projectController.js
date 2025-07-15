import Project from '../models/Project.js'

export async function createProject(req, res) {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
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
    const project = await findById(req.params.id).populate(
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
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.status(200).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
