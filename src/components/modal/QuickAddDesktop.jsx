import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import QuickAddContent from './QuickAddContent'

export default function QuickAddDesktop({ isOpen, product, onClose }) {
  // DICHIARAZIONE DEGLI STATI MANCANTI PER LE TAGLIE
  const [selectedSize, setSelectedSize] = useState(null)

  useEffect(() => {
    if (!isOpen) return

    // Blocco dello scroll anche su desktop quando è aperta
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      // Reset della taglia selezionata alla chiusura
      setSelectedSize(null)
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  return createPortal(
    <div className="fixed inset-0 z-1200 flex items-center justify-center">
      {/* Sfondo Oscurato / Overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenitore Modale Desktop */}
      <div className="bg-card border-border relative z-10 w-full max-w-2xl rounded-2xl border p-8 shadow-2xl">
        {/* Componente di Contenuto Condiviso */}
        <QuickAddContent
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onClose={onClose}
        />
      </div>
    </div>,
    document.body
  )
}
