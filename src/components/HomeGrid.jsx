import { useCallback, useMemo, useState, useEffect } from 'react'

import ProductCard from './ProductCard'
// Sostituito l'import del vecchio foglio con il Manager unificato
import QuickAddManager from './modal/QuickAddManager'
import api from '@/services/api'

export default function HomeGrid({ items, onProductsLoaded }) {
  const [dbProducts, setDbProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      setLoading(false)
      return
    }

    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await api.get('/products')
        setDbProducts(response.data)
      } catch (err) {
        console.error('Errore durante il caricamento dei prodotti:', err)
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [items])

  // Filtriamo i prodotti per collectionId === 1
  const gridProducts = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) return items
    return dbProducts.filter((product) => product.collectionId === 1)
  }, [items, dbProducts])

  useEffect(() => {
    if (onProductsLoaded && gridProducts.length > 0) {
      onProductsLoaded(gridProducts)
    }
  }, [gridProducts, onProductsLoaded])

  const openQuickAdd = useCallback((product) => {
    setSelectedProduct(product)
    setIsQuickAddOpen(true)
  }, [])

  const closeQuickAdd = useCallback(() => {
    setIsQuickAddOpen(false)
    setSelectedProduct(null)
  }, [])

  // Stato visivo di caricamento
  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-primary animate-pulse font-mono text-xs tracking-widest">
          LOADING DROPS...
        </p>
      </div>
    )
  }

  // Stato visivo in caso di errore
  if (error) {
    return (
      <div className="flex h-40 flex-col items-center justify-center text-center">
        <p className="mb-2 font-mono text-xs tracking-widest text-red-500">
          OFFLINE SIGNAL
        </p>
        <p className="text-muted text-sm">
          Non è stato possibile caricare i prodotti.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="product-grid">
        {gridProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={openQuickAdd}
            />
          )
        })}
      </div>

      {/* Utilizziamo QuickAddManager per sdoppiare la modale Desktop / Mobile */}
      <QuickAddManager
        isOpen={isQuickAddOpen}
        product={selectedProduct}
        onClose={closeQuickAdd}
      />
    </>
  )
}
