import { useState, useCallback } from 'react'
import { useProducts } from '@/hooks/useProducts'
import ProductCard from '@/components/ProductCard'
import QuickAddManager from '@/components/modal/QuickAddManager'

export default function Collections() {
  const { products, loading, error } = useProducts()

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openQuickAdd = useCallback((product) => {
    setSelectedProduct(product)
    setIsQuickAddOpen(true)
  }, [])

  const closeQuickAdd = useCallback(() => {
    setIsQuickAddOpen(false)
    setSelectedProduct(null)
  }, [])

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-primary animate-pulse font-mono text-xs tracking-widest">
          LOADING COLLECTIONS...
        </p>
      </div>
    )
  }

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
      <section className="section-spacing">
        <div className="container-editorial">
          <h1>COLLECTIONS</h1>
        </div>
      </section>

      <section className="product-grid container-editorial">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpen={openQuickAdd}
          />
        ))}
      </section>

      <QuickAddManager
        isOpen={isQuickAddOpen}
        product={selectedProduct}
        onClose={closeQuickAdd}
      />
    </>
  )
}
