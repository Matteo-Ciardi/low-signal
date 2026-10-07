import { Minus, Plus } from 'lucide-react'

import { useCart } from '@/context/CartContext'

export default function CartItem({ item }) {
  const { setQuantity, removeItem } = useCart()

  const decrease = () => {
    if (item.quantity <= 1) removeItem(item.key)
    else setQuantity(item.key, item.quantity - 1)
  }

  const increase = () => setQuantity(item.key, item.quantity + 1)

  return (
    <div className="border-border flex gap-4 border-b pb-5">
      {/* IMMAGINE */}
      <div className="bg-muted h-24 w-20 shrink-0 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full" />
        ) : null}
      </div>

      {/* DETTAGLI */}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-foreground font-body truncate text-xs leading-4 font-bold tracking-[1.44px] uppercase">
          {item.name}
        </p>

        <p className="text-muted-foreground font-mono mt-1 text-xs leading-4 tracking-[1.2px] uppercase">
          SZ: {item.size}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          {/* QUANTITÀ */}
          <div className="border-border flex h-[26px] items-center gap-2 border">
            <button
              type="button"
              onClick={decrease}
              aria-label={`Riduci quantità di ${item.name}`}
              className="text-foreground flex h-6 w-6 items-center justify-center transition-colors hover:text-white"
            >
              <Minus size={12} strokeWidth={1.5} />
            </button>

            <span className="text-foreground font-mono w-5 text-center text-xs leading-4">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={increase}
              aria-label={`Aumenta quantità di ${item.name}`}
              className="text-foreground flex h-6 w-6 items-center justify-center transition-colors hover:text-white"
            >
              <Plus size={12} strokeWidth={1.5} />
            </button>
          </div>

          {/* PREZZO */}
          <span className="text-foreground font-mono shrink-0 text-sm leading-5 font-bold">
            € {(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
