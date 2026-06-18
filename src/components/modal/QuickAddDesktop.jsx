import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function QuickAddDesktop({ isOpen, product, onClose }) {
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
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  return createPortal(
    <div className="fixed inset-0 z-1200 flex items-center justify-center">
      {/* Sfondo Oscurato */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur"
        onClick={onClose}
      />

      {/* Contenitore Modale Desktop */}
      <div className="bg-card relative z-10 w-full max-w-2xl rounded-2xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="text-mono absolute top-4 right-4 text-sm uppercase opacity-50 hover:opacity-100"
        >
          Chiudi
        </button>

        <h1 className="mb-4 text-2xl font-bold">Modale per Desktop</h1>
        <p className="mb-2">Stai guardando: {product.name}</p>
        {/* Qui inserirai la logica delle taglie/contenuto desktop */}
      </div>
    </div>,
    document.body
  )
}
