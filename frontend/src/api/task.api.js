import apiClient from './apiClient'

export const createTask = (data) => apiClient.post('/tasks', data)

export const getTaskByProjectIdApi = (projectId) =>
  apiClient.get(`/tasks/${projectId}`)

export const updateTaskStatusApi = (taskId, status) =>
  apiClient.put(`/tasks/${taskId}`, { status })

export const deleteTaskApi = (cardId) => apiClient.delete(`/tasks/${cardId}`)
