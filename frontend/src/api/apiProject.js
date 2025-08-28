import apiClient from './apiClient'

export const getOwnerProjectApi = (userId) =>
  apiClient.get(`/projects/owner/${userId}`)

export const getInvitedProjectApi = (userId) =>
  apiClient.get(`/projects/invite/${userId}`)

export const updateProjectApi = (userId, editProject) =>
  apiClient.put(`/projects/${userId}`, editProject)

export const deletProjectApi = (id) => apiClient.delete(`/projects/${id}`)
