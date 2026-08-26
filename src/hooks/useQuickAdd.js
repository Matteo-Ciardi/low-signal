import { useState, useCallback } from 'react'

export function useQuickAdd() {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState(null)

  const open = useCallback((p) => {
    setProduct(p)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setProduct(null)
  }, [])

  return { isOpen, product, open, close }
}
