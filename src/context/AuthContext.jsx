import { createContext, useContext, useState, useEffect } from 'react'
import api from '@/services/api'

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
      const response = await api.post('/api/auth/login', credentials)
      const result = response.data

      setUser({
        id: result.id,
        email: result.email,
        roles: result.roles,
        accessToken: result.accessToken,
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
    try {
      await api.post('/api/auth/logout')
    } catch (err) {
      console.error('Errore durante il logout sul server', err)
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
