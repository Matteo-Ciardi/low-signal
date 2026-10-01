import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useMotionValue, animate } from 'motion/react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const SLIDE = { duration: 0.5, ease: 'easeInOut' }

/* DESKTOP: carosello infinito con rotazione della lista, scorre in entrambe le
   direzioni. Con meno prodotti di `visible` mostra lo slot minimo necessario
   (mai due card duplicate affiancate) e ruota comunque in loop. */
export default function InfiniteCarousel({
  products = [],
  visible = 3,
  gap = 24,
  renderItem,
}) {
  const n = products.length
  const vis = Math.min(Math.max(visible, 1), Math.max(n, 1))
  const len = Math.max(n, vis + 1)
  const maxS = len - vis

  const x = useMotionValue(0)
  const [step, setStep] = useState(0)
  const [rot, setRot] = useState(0)
  const sRef = useRef(0)
  const settledRef = useRef(true)
  const pendingRef = useRef(null)
  const queueRef = useRef(0)
  const controlsRef = useRef(null)
  const animIdRef = useRef(0)
  const advanceRef = useRef(null)
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const w = el.clientWidth
      const cardW = Math.max(0, (w - gap * (vis - 1)) / vis)
      setStep(cardW + gap)
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [gap, vis])

  useLayoutEffect(() => {
    if (step === 0) return
    animIdRef.current += 1
    controlsRef.current?.stop()
    queueRef.current = 0
    settledRef.current = true
    x.set(-sRef.current * step)
  }, [step, x])

  useEffect(() => () => controlsRef.current?.stop(), [])

  const goTo = useCallback(
    (targetX) => {
      const id = ++animIdRef.current
      settledRef.current = false
      controlsRef.current = animate(x, targetX, {
        ...SLIDE,
        onComplete: () => {
          if (id !== animIdRef.current) return
          settledRef.current = true
          const dir = queueRef.current
          if (dir === 0) return
          queueRef.current = 0
          advanceRef.current?.(dir)
        },
      })
    },
    [x]
  )

  function advance(dir) {
    if (step === 0 || maxS < 1) return
    queueRef.current = 0
    const nextS = sRef.current + dir

    if (nextS >= 0 && nextS <= maxS) {
      sRef.current = nextS
      goTo(-nextS * step)
      return
    }

    const atRest = settledRef.current || x.get() === -sRef.current * step
    if (!atRest) {
      queueRef.current = dir
      return
    }

    const newRot =
      dir > 0
        ? (rot + sRef.current) % n
        : (((rot + sRef.current - maxS) % n) + n) % n
    const silentS = dir > 0 ? 0 : maxS
    const targetS = dir > 0 ? 1 : maxS - 1
    sRef.current = targetS

    if (newRot === rot) {
      x.set(-silentS * step)
      goTo(-targetS * step)
      return
    }

    pendingRef.current = { silentS, targetS }
    setRot(newRot)
  }

  useEffect(() => {
    advanceRef.current = advance
  })

  useLayoutEffect(() => {
    const pending = pendingRef.current
    if (!pending || step === 0) return
    pendingRef.current = null
    x.set(-pending.silentS * step)
    goTo(-pending.targetS * step)
  }, [rot, step, x, goTo])

  if (n === 0) return null

  const cardW = Math.max(0, step - gap)
  const track = Array.from({ length: len }, (_, i) => products[(rot + i) % n])

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <motion.div className="flex" style={{ x, gap }}>
        {track.map((product, i) => (
          <div key={i} className="shrink-0" style={{ width: cardW }}>
            {renderItem(product)}
          </div>
        ))}
      </motion.div>

      <button
        type="button"
        onClick={() => advance(-1)}
        aria-label="Previous products"
        className="border-border bg-background/80 text-foreground hover:bg-background absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => advance(1)}
        aria-label="Next products"
        className="border-border bg-background/80 text-foreground hover:bg-background absolute top-1/2 right-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
