import axios from 'axios'

const apiUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? `http://${window.location.hostname}:8080` : '/api')

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
})

export default api
