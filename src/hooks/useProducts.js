import { useState, useEffect, useCallback } from 'react'
import api from '@/services/api'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/products')
      setProducts(response.data)
    } catch (err) {
      console.error('Errore durante il caricamento dei prodotti:', err)
      setError(
        err.response?.data?.message || err.message || 'Errore di connessione'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}
