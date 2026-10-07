import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const STORAGE_KEY = 'low-signal-cart'

const CartContext = createContext(null)

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item) => item && item.key && typeof item.quantity === 'number'
    )
  } catch {
    return []
  }
}

function getPrimaryImage(product) {
  if (!product?.images || product.images.length === 0) return ''
  const primary =
    product.images.find((img) => img.isPrimary) || product.images[0]
  return primary?.imageUrl || ''
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() =>
    typeof window === 'undefined' ? [] : readStoredCart()
  )
  const [isOpen, setIsOpen] = useState(false)

  // Persistenza del carrello su localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage pieno o non disponibile: il carrello resta in memoria
    }
  }, [items])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((product, size) => {
    if (!product) return

    const key = `${product.id}-${size}`

    setItems((prev) => {
      const existing = prev.find((item) => item.key === key)

      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          size,
          price: product.price ?? 0,
          image: getPrimaryImage(product),
          quantity: 1,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((item) => item.key !== key))
  }, [])

  const setQuantity = useCallback((key, quantity) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((item) => item.key !== key))
      return
    }

    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      isOpen,
      count,
      total,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      count,
      total,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      openCart,
      closeCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart deve essere utilizzato dentro un CartProvider')
  }

  return context
}
