import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
})

let accessToken = null
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

export const setToken = (token) => {
  accessToken = token
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    const isAuthEndpoint = originalRequest.url.startsWith('/api/auth/')
    if (isAuthEndpoint) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await api.post('/api/auth/refresh')
      accessToken = data.accessToken
      processQueue(null, accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      accessToken = null
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
