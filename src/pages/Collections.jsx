import { useProducts } from '@/hooks/useProducts'
import { useQuickAdd } from '@/hooks/useQuickAdd'
import ProductCard from '@/components/ProductCard'
import QuickAddModal from '@/components/modal/QuickAddModal'

export default function Collections() {
  const { products, loading, error } = useProducts()
  const { isOpen, product, open, close } = useQuickAdd()

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
            onOpen={open}
          />
        ))}
      </section>

      <QuickAddModal isOpen={isOpen} product={product} onClose={close} />
    </>
  )
}
