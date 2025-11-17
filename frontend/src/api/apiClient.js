import axios from 'axios'

export const API_BASE_URL = 'http://localhost:5001/api'
// 'https://project-management-backend-aj1s.onrender.com/api'

const apiClient = axios.create({
  // baseURL: 'http://localhost:5001/api',
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
