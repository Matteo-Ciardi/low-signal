import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, X } from 'lucide-react'

export default function QuickAddSheet({ isOpen, product, onClose }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [dragY, setDragY] = useState(0)

  const startYRef = useRef(0)
  const isDraggingRef = useRef(false)

  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientY
    isDraggingRef.current = true
  }

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return

    const currentY = e.touches[0].clientY
    const deltaY = currentY - startYRef.current

    if (deltaY <= 0) {
      setDragY(0)
      return
    }

    setDragY(deltaY)
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false

    if (dragY > 200) {
      onClose()
      setDragY(0)
      return
    }

    setDragY(0)
  }

  useEffect(() => {
    if (!isOpen || !product) return

    setSelectedSize(product.sizes?.[0] ?? '')

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, product, onClose])

  if (!isOpen || !product) return null

  return createPortal(
    <div className="fixed inset-0 z-1200 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-add-title"
        className="surface-card absolute right-0 bottom-0 left-0 rounded-t-3xl border-b-0 px-5 pt-4 pb-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDraggingRef.current ? 'none' : 'transform 220ms ease',
        }}
      >
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/20" />

        <div
          className="mb-5 flex touch-none items-start justify-between gap-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div>
            <p className="text-label text-primary mb-2">
              {product.collection} / {product.category}
            </p>
            <h3
              id="quick-add-title"
              className="text-foreground text-2xl leading-none"
            >
              {product.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="border-border text-muted inline-flex size-11 items-center justify-center rounded-full border"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5 flex items-start gap-4">
          <div className="bg-card h-28 w-24 shrink-0 overflow-hidden rounded-xl">
            <img
              src={product.img}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm leading-relaxed text-white/75">
              {product.desc}
            </p>
            <p className="text-mono text-foreground mt-2 text-lg">
              € {product.price}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-label text-muted mb-3">Size</p>

          <div className="flex flex-wrap gap-2">
            {product.sizes?.map((size) => {
              const isActive = selectedSize === size

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`border-border inline-flex h-11 min-w-12 items-center justify-center border px-4 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary text-background border-primary'
                      : 'text-foreground'
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="btn-secondary flex-1"
            onClick={onClose}
          >
            Details
            <ArrowRight className="ml-2" size={16} />
          </button>

          <button type="button" className="btn-primary flex-1">
            Add to bag
          </button>
        </div>
      </section>
    </div>,
    document.body
  )
}
