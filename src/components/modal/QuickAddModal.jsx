import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import { useModal } from '@/hooks/useModal'
import { useCart } from '@/context/CartContext'
import QuickAddContent from './QuickAddContent'

export default function QuickAddModal({ isOpen, product, onClose }) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const [dragY, setDragY] = useState(0)

  const { addItem, openCart } = useCart()

  const startYRef = useRef(0)
  const isDraggingRef = useRef(false)

  // Aggiunge il prodotto al carrello, chiude la modale e apre la sidebar
  const handleAddToCart = ({ product: item, size }) => {
    addItem(item, size)
    onClose()
    openCart()
  }

  // Media query detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mediaQuery.matches)

    const handler = (e) => setIsDesktop(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Scroll lock + Escape key
  useModal(isOpen, onClose)

  // Auto-select first size on sheet open (mobile only)
  useEffect(() => {
    if (!isOpen || isDesktop || !product) return
    const firstVariant = product.variants?.[0]
    const initialSize = firstVariant?.size ?? ''
    setSelectedSize(initialSize)
  }, [isOpen, isDesktop, product])

  // Reset size on close
  useEffect(() => {
    if (!isOpen) setSelectedSize(null)
  }, [isOpen])

  // Drag-to-dismiss handlers (sheet only)
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

  if (!isOpen || !product) return null

  // Desktop: centered overlay
  if (isDesktop) {
    return createPortal(
      <div className="fixed inset-0 z-1200 flex items-center justify-center">
        <button
          type="button"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="bg-card border-border relative z-10 w-full max-w-2xl rounded-2xl border p-8 shadow-2xl">
          <QuickAddContent
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            onClose={onClose}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>,
      document.body
    )
  }

  // Mobile: bottom sheet with drag-to-dismiss
  return createPortal(
    <div className="fixed inset-0 z-1200">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur"
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
        <div
          className="mb-5 flex touch-none items-center justify-center py-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="h-1.5 w-14 rounded-full bg-white/20" />
        </div>

        <QuickAddContent
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onClose={onClose}
          onAddToCart={handleAddToCart}
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
