import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useMotionValue, animate } from 'motion/react'
import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const tagClasses = {
  RESTOCKED: 'bg-background text-foreground',
  'NEW DROP': 'bg-primary text-background',
  LIMITED: 'bg-foreground text-background',
  'SOLD OUT': 'bg-secondary text-foreground',
}

const GAP = 24
const VISIBLE = 3
const MOBILE_GAP = 16 // gap-4
const MOBILE_PEEK = 0.88 // larghezza slide: 88% per anteprima del successivo
const SPRING = { type: 'spring', stiffness: 300, damping: 30 }

function ProductCard({ product }) {
  const primaryImg =
    product.images?.find((img) => img.isPrimary) || product.images?.[0]

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
      draggable={false}
    >
      <div className="bg-card relative aspect-4/5 overflow-hidden lg:aspect-3/4">
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
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-foreground text-lg font-semibold">
            {product.name}
          </p>
          <span className="text-mono text-foreground shrink-0 text-lg">
            € {product.price?.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  )
}

/* MOBILE: carosello a prodotto singolo con peek, swipe gestito da motion */
function MobileCarousel({ products }) {
  const n = products.length
  const x = useMotionValue(0)
  const [step, setStep] = useState(0)
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)
  const draggedRef = useRef(false)

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return

    const update = () => setStep(el.clientWidth * MOBILE_PEEK + MOBILE_GAP)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (step === 0) return
    const controls = animate(x, -index * step, SPRING)
    return () => controls.stop()
  }, [index, step, x])

  const handleDragEnd = (_, info) => {
    if (step === 0) return
    const { offset, velocity } = info
    const threshold = step * 0.2

    let next = index
    if (offset.x < -threshold || velocity.x < -500) next = index + 1
    else if (offset.x > threshold || velocity.x > 500) next = index - 1

    next = Math.max(0, Math.min(next, n - 1))

    if (next === index) {
      animate(x, -index * step, SPRING)
    } else {
      setIndex(next)
    }
  }

  const handlePointerDownCapture = () => {
    draggedRef.current = false
  }

  const handleFocusCapture = () => {
    draggedRef.current = false
  }

  const handleDragStart = () => {
    draggedRef.current = true
  }

  const handleClickCapture = (event) => {
    if (!draggedRef.current) return
    draggedRef.current = false
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div
      ref={trackRef}
      className="relative overflow-clip lg:hidden"
      onPointerDownCapture={handlePointerDownCapture}
      onFocusCapture={handleFocusCapture}
      onClickCapture={handleClickCapture}
    >
      <motion.div
        className="flex gap-4"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -(n - 1) * step, right: 0 }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {products.map((product) => (
          <div key={product.id} className="w-[88%] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>
    </div>
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
  const looped = isCarousel ? [...products, ...products, ...products] : products

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
          className="text-label text-muted hover:text-foreground flex items-center gap-2 text-xs transition-colors"
        >
          VIEW ALL
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* MOBILE: carosello a prodotto singolo con peek */}
      <MobileCarousel products={products} />

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
                <div
                  key={`${i}-${product.id}`}
                  className="shrink-0"
                  style={{ width: cardW }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous products"
              className="border-border bg-background/80 text-foreground hover:bg-background absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next products"
              className="border-border bg-background/80 text-foreground hover:bg-background absolute top-1/2 right-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
