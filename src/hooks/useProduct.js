import { useState, useEffect } from 'react'
import api from '@/services/api'

export function useProduct(slug) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get(`/products/${slug}`)
        if (!cancelled) setProduct(response.data)
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              'Errore di connessione'
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProduct()
    return () => {
      cancelled = true
    }
  }, [slug])

  return { product, loading, error }
}
