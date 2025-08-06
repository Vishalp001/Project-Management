import apiClient from './apiClient'

export const inviteUserApi = (data) => apiClient.post('/invite', data)

// export const getTaskByProjectIdApi = (projectId) =>
//   apiClient.get(`/tasks/${projectId}`)

// export const updateTaskStatusApi = (taskId, status) =>
//   apiClient.put(`/tasks/${taskId}`, { status })

// export const deleteTaskApi = (cardId) => apiClient.delete(`/tasks/${cardId}`)
