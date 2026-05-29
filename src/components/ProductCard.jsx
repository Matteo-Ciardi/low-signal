const tagClasses = {
  RESTOCKED: 'bg-background text-foreground',
  'NEW DROP': 'bg-primary text-background',
  LIMITED: 'bg-foreground text-background',
  'SOLD OUT': 'bg-white/10 text-foreground',
}

export default function ProductCard({ product, onOpen }) {
  const isInteractive = typeof onOpen === 'function'

  const isMobileViewport = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 1023px)').matches
  }

  const handleActivate = () => {
    if (!isInteractive) return
    if (!isMobileViewport()) return
    onOpen(product)
  }

  const handleQuickAddClick = (event) => {
    event.stopPropagation()

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
          {product.tag}
        </span>

        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 lg:group-hover:scale-105"
        />

        <div className="bg-primary absolute bottom-0 left-0 hidden w-full py-4 text-center lg:group-hover:block lg:hover:bg-orange-300">
          <button
            type="button"
            onClick={handleQuickAddClick}
            className="text-mono text-background font-extrabold"
          >
            QUICK ADD +
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-foreground text-lg leading-none font-semibold">
              {product.name}
            </p>
            <p className="text-label text-muted mt-2">{product.category}</p>
          </div>

          <span className="text-mono text-foreground text-sm">
            € {product.price}
          </span>
        </div>
      </div>
    </div>
  )
}
