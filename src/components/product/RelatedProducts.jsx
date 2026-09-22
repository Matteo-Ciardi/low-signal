import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'

const tagClasses = {
  RESTOCKED: 'bg-background text-foreground',
  'NEW DROP': 'bg-primary text-background',
  LIMITED: 'bg-foreground text-background',
  'SOLD OUT': 'bg-secondary text-foreground',
}

const GAP = 24
const VISIBLE = 3

function ProductCard({ product }) {
  const primaryImg =
    product.images?.find((img) => img.isPrimary) || product.images?.[0]

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="bg-card relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
        <span
          className={`text-label absolute top-3 left-3 z-20 inline-flex px-3 py-2 font-bold ${
            tagClasses[product.tag] ?? 'bg-card text-foreground'
          }`}
        >
          {product.tag || 'NEW DROP'}
        </span>

        {primaryImg && (
          <img
            src={primaryImg.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 flex">
          <span className="text-mono bg-card border-border flex-1 border-t py-2.5 text-center text-xs font-bold uppercase">
            Details
          </span>
          <span className="bg-primary text-background flex-1 border-t py-2.5 text-center text-xs font-bold uppercase">
            Quick Add
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-foreground text-sm font-semibold">
            {product.name}
          </p>
          <span className="text-mono text-foreground shrink-0 text-sm">
            ${product.price}
          </span>
        </div>
        <p className="text-muted text-xs uppercase">
          {product.collectionName}
        </p>
      </div>
    </Link>
  )
}

export default function RelatedProducts({ products = [] }) {
  const [rawIndex, setRawIndex] = useState(null)
  const [animate, setAnimate] = useState(true)
  const [cardW, setCardW] = useState(0)
  const containerRef = useRef(null)

  const n = products.length
  const isCarousel = n > VISIBLE
  const index = rawIndex ?? n
  const looped = isCarousel
    ? [...products, ...products, ...products]
    : products

  useLayoutEffect(() => {
    if (!isCarousel) return
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const w = el.clientWidth
      setCardW(Math.max(0, (w - GAP * (VISIBLE - 1)) / VISIBLE))
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isCarousel])

  const next = () => {
    if (index >= 2 * n) return
    setAnimate(true)
    setRawIndex(index + 1)
  }

  const prev = () => {
    if (index <= 0) return
    setAnimate(true)
    setRawIndex(index - 1)
  }

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return
    if (index <= 0 || index >= 2 * n) {
      setAnimate(false)
      setRawIndex(n)
      requestAnimationFrame(() => setAnimate(true))
    }
  }

  if (n === 0) return null

  return (
    <section className="mt-12 mb-16 lg:mt-16">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between lg:gap-4">
        <h3 className="text-label font-mono text-xs font-bold uppercase">
          Also in SS25
        </h3>
        <div className="bg-border hidden h-px flex-1 lg:block" />
        <Link
          to="/collections"
          className="text-label text-muted flex items-center gap-2 text-xs transition-colors hover:text-foreground"
        >
          VIEW ALL
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* MOBILE: griglia 2 colonne */}
      <div className="grid grid-cols-2 gap-4 lg:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        {!isCarousel ? (
          /* Pochi prodotti: griglia statica */
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Carosello infinito, 3 visibili */
          <div ref={containerRef} className="relative overflow-hidden">
            <div
              className={`flex gap-6 ${animate ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${index * (cardW + GAP)}px)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {looped.map((product, i) => (
                <div key={`${i}-${product.id}`} className="shrink-0" style={{ width: cardW }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous products"
              className="border-border bg-background/80 text-foreground absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors hover:bg-background"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next products"
              className="border-border bg-background/80 text-foreground absolute top-1/2 right-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors hover:bg-background"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
