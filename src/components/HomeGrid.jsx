import { useCallback, useMemo, useState } from 'react'

import ProductCard from './ProductCard'
import QuickAddSheet from './QuickAddSheet'
import { products } from '@/data/products'

export default function HomeGrid({ items }) {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const gridProducts = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) return items
    return products.filter((product) => product.collection === 'SS25')
  }, [items])

  const openQuickAdd = useCallback((product) => {
    setSelectedProduct(product)
    setIsQuickAddOpen(true)
  }, [])

  const closeQuickAdd = useCallback(() => {
    setIsQuickAddOpen(false)
    setSelectedProduct(null)
  }, [])

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

      <QuickAddSheet
        isOpen={isQuickAddOpen}
        product={selectedProduct}
        onClose={closeQuickAdd}
      />
    </>
  )
}
