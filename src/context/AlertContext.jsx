import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

const AlertContext = createContext(null)

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null)
  const timerRef = useRef(null)

  const hideAlert = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setAlert(null)
  }, [])

  const showAlert = useCallback((message, type = 'error') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setAlert({ message, type })
    timerRef.current = setTimeout(() => {
      setAlert(null)
      timerRef.current = null
    }, 5000)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)
