import { createContext, useContext, useState, useCallback } from 'react'

const AlertContext = createContext(null)

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null)

  const showAlert = useCallback((message, type = 'error') => {
    setAlert({ message, type })
  }, [])

  const hideAlert = useCallback(() => {
    setAlert(null)
  }, [])

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)
