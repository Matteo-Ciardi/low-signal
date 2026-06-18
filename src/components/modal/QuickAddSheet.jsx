import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import QuickAddContent from './QuickAddContent'

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

    // Impedisce il trascinamento verso l'alto
    if (deltaY <= 0) {
      setDragY(0)
      return
    }

    setDragY(deltaY)
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false

    // Se l'utente ha trascinato il foglio verso il basso per più di 200px, chiude la modale
    if (dragY > 200) {
      onClose()
      setDragY(0)
      return
    }

    setDragY(0)
  }

  useEffect(() => {
    if (!isOpen || !product) return

    // Mappiamo correttamente la prima taglia dall'array variants del DB
    const firstVariant = product.variants?.[0]
    const initialSize = firstVariant?.size ?? ''
    setSelectedSize(initialSize)

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
    <div className="fixed inset-0 z-1200">
      {/* OVERLAY SFONDO */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur"
        onClick={onClose}
      />

      {/* FOGLIO MODALE (SHEET) */}
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
        {/* DRAG HANDLE PER MOBILE */}
        <div
          className="mb-5 flex touch-none items-center justify-center py-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="h-1.5 w-14 rounded-full bg-white/20" />
        </div>

        {/* CONTENUTO INIETTATO */}
        <QuickAddContent
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onClose={onClose}
          headerProps={{
            className: 'mb-5 flex touch-none items-start justify-between gap-4',
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
          }}
        />
      </section>
    </div>,
    document.body
  )
}
