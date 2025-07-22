import apiClient from './apiClient'

export const createTask = (data) => apiClient.post('/tasks', data)

export const getTaskByProjectIdApi = (projectId) =>
  apiClient.get(`/tasks/${projectId}`)

export const updateTaskStatus = (taskId, status) =>
  apiClient.put(`/tasks/${taskId}`, { status })
