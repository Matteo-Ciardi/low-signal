import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 1. Funzione di REGISTRAZIONE
  const signup = async (userData) => {
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(
        result.error || result.message || 'Errore durante la registrazione'
      )
    }
    return result
  }

  // 2. Funzione di LOGIN
  const login = async (credentials) => {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(
        result.error || result.message || 'Email o password errati'
      )
    }

    // Salvi l'utente e il token nello stato globale
    setUser({
      id: result.id,
      email: result.email,
      roles: result.roles,
      accessToken: result.accessToken, // Il refreshToken è al sicuro nel cookie HTTP-Only gestito da Java
    })

    return result
  }

  // 3. Funzione di LOGOUT
  const logout = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', { method: 'POST' })
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

// Custom hook per usare l'autenticazione al volo nei componenti
export const useAuth = () => useContext(AuthContext)
