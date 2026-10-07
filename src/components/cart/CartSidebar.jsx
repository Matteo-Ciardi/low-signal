import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useCart } from '@/context/CartContext'
import { useModal } from '@/hooks/useModal'
import CartItem from './CartItem'

export default function CartSidebar() {
  const { items, isOpen, count, total, closeCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll lock + chiudi con ESC
  useModal(isOpen, closeCart)

  // Chiusura automatica al cambio rotta
  const previousPathRef = useRef(location.pathname)

  useEffect(() => {
    if (previousPathRef.current === location.pathname) return
    previousPathRef.current = location.pathname
    closeCart()
  }, [location.pathname, closeCart])

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1300">
          {/* BACKDROP */}
          <motion.button
            type="button"
            aria-label="Chiudi carrello"
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
          />

          {/* PANNELLO */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="bg-card border-border absolute top-0 right-0 flex h-full w-full flex-col border-l lg:w-96"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
          >
            {/* HEADER */}
            <div className="border-border flex shrink-0 items-center justify-between border-b px-6 py-6">
              <h2
                id="cart-title"
                className="text-foreground font-mono text-xs leading-4 font-bold tracking-[2.4px] uppercase"
              >
                CART ({count})
              </h2>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Chiudi carrello"
                className="text-foreground flex h-5 w-5 items-center justify-center transition-colors hover:text-white"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            {/* CORPO */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-6">
              {items.length === 0 ? (
                <p className="text-muted-foreground font-body mt-8 text-center text-sm leading-5 tracking-[1.4px] uppercase">
                  Your cart is empty.
                </p>
              ) : (
                <div className="flex flex-col gap-5">
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER */}
            {items.length > 0 && (
              <div className="border-border flex shrink-0 flex-col gap-5 border-t px-6 py-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground font-body text-xs leading-4 tracking-[1.8px] uppercase">
                    Total
                  </span>
                  <span className="text-foreground font-mono text-[20px] leading-7 font-bold">
                    € {total.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  className="bg-primary text-primary-foreground font-body flex h-12 w-full items-center justify-center gap-2 text-xs leading-4 font-bold tracking-[2.4px] uppercase transition-colors hover:bg-orange-300"
                  onClick={handleCheckout}
                >
                  CHECKOUT
                  <ArrowRight size={14} strokeWidth={1.6} />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
