import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return api(error.config.url, error.config.method, error.config.data, error.config.headers)
        .then((res) => res.data)
        .catch((err) => {
          return Promise.reject(err)
        })
    }
    return Promise.reject(error)
  }
)

export default api
