import { useState } from 'react'
import { useCollections } from '@/hooks/useCollections'
import { useQuickAdd } from '@/hooks/useQuickAdd'
import ProductCard from '@/components/ProductCard'
import QuickAddModal from '@/components/modal/QuickAddModal'

export default function Collections() {
  const { collections, loading, error } = useCollections()
  const { isOpen, product, open, close } = useQuickAdd()
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)

  const selectedCollection =
    collections.find((c) => c.id === selectedCollectionId) || collections[0]

  return (
    <>
      <section className="container-editorial mt-13 pt-14">
        <div className="">
          <h1>COLLECTIONS</h1>
        </div>

        <div className="mt-9 mb-5 flex">
          {collections.map((collection) => (
            <p
              key={collection.id}
              onClick={() => setSelectedCollectionId(collection.id)}
              className={`${
                selectedCollection?.id === collection.id
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {collection.name}
            </p>
          ))}
        </div>
      </section>

      <section className="relative">
        <div className="h-160 overflow-hidden">
          <img
            src={selectedCollection?.heroImage}
            alt={selectedCollection?.name}
            className="h-full w-full scale-150 object-cover"
          />
          
        </div>

        <div className="from-background via-background/40 to-background absolute inset-0 bg-linear-to-t" />
      </section>

      <section className="product-grid container-editorial section-spacing">
        {loading && (
          <div className="flex h-40 items-center justify-center">
            <p className="text-primary animate-pulse font-mono text-xs tracking-widest">
              LOADING COLLECTIONS...
            </p>
          </div>
        )}
        {error && (
          <div className="flex h-40 flex-col items-center justify-center text-center">
            <p className="mb-2 font-mono text-xs tracking-widest text-red-500">
              OFFLINE SIGNAL
            </p>
            <p className="text-muted text-sm">
              Non è stato possibile caricare i prodotti.
            </p>
          </div>
        )}
        {!loading &&
          !error &&
          selectedCollection?.products.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={open} />
          ))}
      </section>

      <QuickAddModal isOpen={isOpen} product={product} onClose={close} />
    </>
  )
}
