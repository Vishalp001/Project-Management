import apiClient from './apiClient'

export const inviteUserApi = (data) => apiClient.post('/invite', data)

export const verifyInviteApi = (token, data) =>
  apiClient.post(`/invite/getInviteUserDetails/${token}`, data)

export const acceptInviteApi = (data) => apiClient.patch('/invite/accept', data)
