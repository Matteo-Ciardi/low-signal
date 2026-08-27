import { useState, useEffect, useCallback } from 'react'
import api from '@/services/api'

export function useCollections() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/collections')
      const filtered = response.data.filter(
        (col) => col.name !== 'pippo / SUMMER 27'
      )
      setCollections(filtered)
    } catch (err) {
      console.error('Errore durante il caricamento delle collezioni:', err)
      setError(
        err.response?.data?.message || err.message || 'Errore di connessione'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  return { collections, loading, error, refetch: fetchCollections }
}
