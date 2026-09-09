import { useState } from 'react'
import { useCollections } from '@/hooks/useCollections'
import { useQuickAdd } from '@/hooks/useQuickAdd'
import ProductCard from '@/components/ProductCard'
import QuickAddModal from '@/components/modal/QuickAddModal'

const statusClasses = {
  DISPONIBILE: 'bg-primary text-background',
  'SOLD OUT': 'bg-white/10 text-foreground',
  ARCHIVE: 'bg-background text-foreground',
}

export default function Collections() {
  const { collections, loading, error } = useCollections()
  const { isOpen, product, open, close } = useQuickAdd()
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)

  const selectedCollection =
    collections.find((c) => c.id === selectedCollectionId) || collections[0]

  const showHero = !loading && !error && selectedCollection

  return (
    <>
      <div className={`relative ${showHero ? 'lg:min-h-screen' : ''}`}>
        <section className="container-editorial top-0 right-0 left-0 z-10 pt-14 lg:absolute lg:flex lg:justify-between">
          <div className="pt-10">
            <h1>COLLECTIONS</h1>
          </div>

          <div className="mt-9 mb-5 flex lg:mb-1 lg:items-end">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollectionId(collection.id)}
                className={`px-4! text-left text-[11px]! ${
                  selectedCollection?.id === collection.id
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </section>

        {showHero && (
          <section className="relative lg:absolute lg:inset-0 lg:z-0">
            <div className="h-147 overflow-hidden lg:h-full">
              <img
                src={selectedCollection?.heroImage}
                alt={selectedCollection?.name}
                className="h-full w-full scale-150 object-cover lg:scale-100"
              />
            </div>
            <div className="absolute bottom-10 z-10 pl-6 lg:bottom-10 lg:w-150 lg:pl-15">
              <span
                className={`text-label mb-5 inline-flex px-3 py-2 font-bold ${
                  statusClasses[selectedCollection?.collectionStatus] ??
                  'bg-card text-foreground'
                }`}
              >
                {selectedCollection?.collectionStatus}
              </span>
              <h2 className="mb-4 text-[46px] lg:text-4xl">
                {selectedCollection?.name}
              </h2>
              <p className="pb-6">{selectedCollection?.description}</p>
              <div className="flex flex-col">
                <span className="text-mono tracking-wider">PIECES:</span>
                <span className="text-display text-primary text-xl">
                  {selectedCollection?.products?.length}
                </span>
              </div>
            </div>

            <div className="from-background via-background/40 to-background absolute inset-0 bg-linear-to-t" />
          </section>
        )}
      </div>

      <section className="collections-grid container-editorial section-spacing">
        {loading && (
          <div className="col-span-full flex h-40 items-center justify-center">
            <p className="text-primary animate-pulse font-mono text-xs tracking-widest">
              LOADING COLLECTIONS...
            </p>
          </div>
        )}
        {error && (
          <div className="col-span-full flex h-40 flex-col items-center justify-center text-center">
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
          selectedCollection?.products.map((product, index) => {
            // 1. Card 0: 2/3 a sinistra (alta 2 righe e 100% altezza)
            if (index === 0) {
              return (
                <div key={product.id} className="col-span-large">
                  <ProductCard
                    product={product}
                    onOpen={open}
                    className="h-full"
                  />
                </div>
              )
            }

            // 2. Card 1 e 3: incolonnate a destra (1/3)
            if (index === 1 || index === 2) {
              return (
                <div key={product.id} className="col-span-small">
                  <ProductCard product={product} onOpen={open} />
                </div>
              )
            }

            // 3. Card 2 e 4: si uniscono nella riga sotto e si dividono 50% / 50%
            if (index === 3) {
              const nextProduct = selectedCollection?.products[4]
              return (
                <div key="row-50-50" className="col-row-split-50">
                  <div>
                    <ProductCard product={product} onOpen={open} />
                  </div>
                  {nextProduct && (
                    <div>
                      <ProductCard product={nextProduct} onOpen={open} />
                    </div>
                  )}
                </div>
              )
            }

            // Saltiamo l'indice 4 (già dentro il blocco dell'indice 2)
            if (index === 4) return null

            // Card successive
            return (
              <div key={product.id} className="col-span-small">
                <ProductCard product={product} onOpen={open} />
              </div>
            )
          })}
      </section>

      <QuickAddModal isOpen={isOpen} product={product} onClose={close} />
    </>
  )
}
