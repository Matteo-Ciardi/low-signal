import { useNavigate } from 'react-router-dom'

const tagClasses = {
  RESTOCKED: 'bg-background text-foreground',
  'NEW DROP': 'bg-primary text-background',
  LIMITED: 'bg-foreground text-background',
  'SOLD OUT': 'bg-secondary text-foreground',
}

export default function ProductCard({ product, onOpen }) {
  const isInteractive = typeof onOpen === 'function'
  const navigate = useNavigate()

  if (!product) return null

  const primaryImageObj =
    product.images?.find((img) => img.isPrimary) || product.images?.[0]
  const productImage = primaryImageObj?.imageUrl || 'Image not available'

  const isMobileViewport = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 1023px)').matches
  }

  // Click sull'intera card: su mobile apre la modale Quick Add,
  // su desktop naviga alla pagina del prodotto
  const handleActivate = () => {
    if (isMobileViewport()) {
      if (!isInteractive) return
      onOpen(product)
      return
    }
    if (!product.slug) return
    navigate(`/product/${product.slug}`)
  }

  // Gestisce il click specifico sul bottone "QUICK ADD +" (visibile solo su desktop in hover)
  const handleQuickAddClick = (event) => {
    event.stopPropagation() // Evita il bubbling del click sulla card
    if (!isInteractive) return
    onOpen(product)
  }

  return (
    <div
      onClick={handleActivate}
      className={`product-card group ${isInteractive ? 'cursor-pointer' : ''}`}
    >
      <div className="product-card-image relative">
        <span
          className={`text-label absolute top-3 left-3 z-20 inline-flex px-3 py-2 font-bold ${
            tagClasses[product.tag] ?? 'bg-card text-foreground'
          }`}
        >
          {product.tag || 'NEW DROP'}
        </span>

        <img
          src={productImage}
          alt={product.name || 'Product Image'}
          className="h-full w-full object-cover transition-transform duration-500 lg:group-hover:scale-105"
        />

        {/* Bottone Desktop su Hover */}
        <div
          className="bg-primary absolute bottom-0 left-0 hidden w-full py-4 text-center lg:group-hover:block lg:hover:bg-orange-300"
          onClick={handleQuickAddClick}
        >
          <button
            type="button"
            className="text-mono text-background font-extrabold"
          >
            QUICK ADD +
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-foreground text-lg leading-none font-semibold">
              {product.name}
            </p>
          </div>

          <span className="text-mono text-foreground text-lg">
            € {product.price?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
