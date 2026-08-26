import { useMemo, useEffect } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useQuickAdd } from '@/hooks/useQuickAdd'
import ProductCard from './ProductCard'
import QuickAddModal from './modal/QuickAddModal'

export default function HomeGrid({ onProductsLoaded }) {
  const { products, loading, error } = useProducts()
  const { isOpen, product, open, close } = useQuickAdd()

  const gridProducts = useMemo(
    () => products.filter((product) => product.collectionId === 1),
    [products]
  )

  useEffect(() => {
    if (onProductsLoaded && gridProducts.length > 0) {
      onProductsLoaded(gridProducts)
    }
  }, [gridProducts, onProductsLoaded])

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
              onOpen={open}
            />
          )
        })}
      </div>

      <QuickAddModal isOpen={isOpen} product={product} onClose={close} />
    </>
  )
}
