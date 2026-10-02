import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, animate } from 'motion/react'
import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import InfiniteCarousel from '@/components/InfiniteCarousel'

const tagClasses = {
  RESTOCKED: 'bg-background text-foreground',
  'NEW DROP': 'bg-primary text-background',
  LIMITED: 'bg-foreground text-background',
  'SOLD OUT': 'bg-secondary text-foreground',
}

const GAP = 24
const VISIBLE = 3
const MOBILE_GAP = 16 // gap-4
const MOBILE_SLIDE = 0.76 // larghezza card: con centratura lascia peek simmetrici (prev/successivo) pari a (1-0.76)/2*W - gap
const SPRING = { type: 'spring', stiffness: 300, damping: 30 }

/* riporta un indice qualsiasi nella banda centrale [n, 2n-1] della track clonata */
function wrapIndex(value, n) {
  let v = value
  while (v >= 2 * n) v -= n
  while (v < n) v += n
  return v
}

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

/* MOBILE: carosello a prodotto singolo con peek simmetrico (prev + successivo)
   e scorrimento infinito in entrambe le direzioni: la track è la lista clonata
   3x, quando l'indice esce dalla banda centrale viene riportato dentro con uno
   scatto silenzioso (la lista ha periodo n, quindi nessuno scambio visibile) */
function MobileCarousel({ products }) {
  const n = products.length
  const infinite = n > 1
  const x = useMotionValue(0)
  const [step, setStep] = useState(0)
  const [padX, setPadX] = useState(0)
  const [pos, setPos] = useState(infinite ? n : 0)
  const trackRef = useRef(null)
  const draggedRef = useRef(false)
  const initializedRef = useRef(false)
  const posRef = useRef(pos)
  const controlsRef = useRef(null)
  const animIdRef = useRef(0)

  const track = useMemo(
    () => (infinite ? [...products, ...products, ...products] : products),
    [products, infinite]
  )

  // posizione corrente: se lo stato è rimasto fuori dalla track (prodotti
  // cambiati) viene riportato in banda, preservando lo stesso prodotto
  const current =
    pos >= 0 && pos <= track.length - 1
      ? pos
      : infinite
        ? wrapIndex(pos, n)
        : 0

  useEffect(() => {
    posRef.current = pos
  }, [pos])

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return

    const update = () => {
      const w = el.clientWidth
      const pad = (w * (1 - MOBILE_SLIDE)) / 2
      const st = w * MOBILE_SLIDE + MOBILE_GAP
      // pos deve restare valido per l'attuale n (può cambiare senza remount):
      // la track è periodica, lo scatto nella banda è invisibile
      const valid = infinite
        ? wrapIndex(Math.min(Math.max(posRef.current, 0), 3 * n - 1), n)
        : 0
      if (valid !== posRef.current) {
        posRef.current = valid
        setPos(valid)
      }
      // posiziona prima del paint così la card risulta centrata al primo frame
      x.set(pad - valid * st)
      setPadX(pad)
      setStep(st)
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [x, n, infinite])

  useEffect(() => {
    if (step === 0) return

    const target = padX - current * step

    // prima misurazione: posiziona senza animazione
    if (!initializedRef.current) {
      initializedRef.current = true
      x.set(target)
      return
    }

    // stato fuori dalla track: scatto silenzioso, si normalizza al prossimo
    // gesto (onComplete/setPos preservano il prodotto per il periodo n)
    if (current !== pos) {
      x.set(target)
      return
    }

    // già a destinazione (es. heal al pointerdown): nessuna animazione, così
    // non entra in conflitto con il drag appena avviato
    if (x.get() === target) return

    const id = ++animIdRef.current
    const controls = animate(x, target, {
      ...SPRING,
      onComplete: () => {
        // animazione interrotta/riscalata: questa generazione è scaduta
        if (id !== animIdRef.current) return
        if (controlsRef.current === controls) controlsRef.current = null
        if (!infinite) return
        const wrapped = wrapIndex(current, n)
        if (wrapped === current) return
        x.set(padX - wrapped * step)
        setPos(wrapped)
      },
    })
    controlsRef.current = controls
    return () => {
      // ferma solo se è ancora l'animazione attiva (heal/nuova gen l'hanno
      // già fermata e fermarla due volte è inutile)
      if (controlsRef.current === controls) {
        controls.stop()
        controlsRef.current = null
      }
    }
  }, [current, pos, step, padX, x, infinite, n])

  const handleDragEnd = (_, info) => {
    if (step === 0 || !infinite) return
    const { offset, velocity } = info
    const threshold = step * 0.2

    let next = current
    if (offset.x < -threshold || velocity.x < -500) next = current + 1
    else if (offset.x > threshold || velocity.x > 500) next = current - 1

    if (next === current) {
      const wrapped = infinite ? wrapIndex(current, n) : current
      if (wrapped !== current) {
        // già fuori banda: scatto identico + rientro in banda, nessuna animazione
        x.set(padX - wrapped * step)
        setPos(wrapped)
      } else {
        animIdRef.current += 1
        controlsRef.current = animate(x, padX - current * step, SPRING)
      }
    } else {
      setPos(next)
    }
  }

  const handlePointerDownCapture = () => {
    draggedRef.current = false
    if (step === 0 || !infinite) return
    // Ferma ogni animazione e riporta pos/x in banda PRIMA che framer risolva
    // i constraints: la track clonata 3x è periodica, quindi lo scatto di n
    // slot è invisibile e il drag parte sempre con x dentro il box.
    animIdRef.current += 1
    controlsRef.current?.stop()
    controlsRef.current = null
    const slot = Math.round((padX - x.get()) / step)
    const safe = wrapIndex(Math.min(Math.max(slot, 0), track.length - 1), n)
    x.set(padX - safe * step)
    if (safe !== posRef.current) setPos(safe)
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
        drag={infinite ? 'x' : false}
        dragConstraints={
          infinite
            ? { left: padX - 2 * n * step, right: padX - (n - 1) * step }
            : undefined
        }
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {track.map((product, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{ width: `${MOBILE_SLIDE * 100}%` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function RelatedProducts({
  products = [],
  collectionName,
  collectionId,
}) {
  const n = products.length
  const isCarousel = n > VISIBLE

  if (n === 0) return null

  const resolvedName = collectionName ?? products[0]?.collectionName
  const resolvedId = collectionId ?? products[0]?.collectionId
  const collectionLink = resolvedId
    ? `/collections?collection=${resolvedId}`
    : '/collections'

  return (
    <section className="mt-12 mb-16 lg:mt-16">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between lg:gap-4">
        <h3 className="text-label font-mono text-xs font-bold uppercase">
          Also in{' '}
          <span className="text-primary">
            {resolvedName ?? 'this collection'}
          </span>
        </h3>
        <div className="bg-border hidden h-px flex-1 lg:block" />
        <Link
          to={collectionLink}
          className="text-label text-muted hover:text-foreground flex items-center gap-2 text-xs transition-colors"
        >
          <span className="text-primary flex items-center gap-2">
            VIEW ALL
            <ArrowRight size={12} />{' '}
          </span>
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
          /* Carosello infinito con rotazione, 3 visibili */
          <InfiniteCarousel
            products={products}
            visible={VISIBLE}
            gap={GAP}
            renderItem={(product) => <ProductCard product={product} />}
          />
        )}
      </div>
    </section>
  )
}
