import { createContext, useContext, useState, useEffect } from 'react'
import api, { setToken } from '@/services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData)
      return response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Errore durante la registrazione'
      throw new Error(errorMessage)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials, {
        withCredentials: true,
      })
      const result = response.data
      setToken(result.accessToken)
      setUser({
        id: result.id,
        email: result.email,
        roles: result.roles,
        name: result.name,
        surname: result.surname,
      })

      return result
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Email o password errati'
      throw new Error(errorMessage)
    }
  }

  const logout = async () => {
    let logoutError = null
    try {
      await api.post('/api/auth/logout', {}, { withCredentials: true })
    } catch (err) {
      console.error('Errore durante il logout sul server', err)
      logoutError = err
    } finally {
      setToken(null)
      setUser(null)
    }
    if (logoutError) throw logoutError
  }

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await api.get('/api/auth/me', {
          withCredentials: true,
        })
        setToken(response.data.accessToken)
        setUser({
          id: response.data.id,
          email: response.data.email,
          roles: response.data.roles,
          name: response.data.name,
          surname: response.data.surname,
        })
      } catch (error) {
        setToken(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
