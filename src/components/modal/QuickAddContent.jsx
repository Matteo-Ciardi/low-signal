import { ArrowRight, Check, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export default function QuickAddContent({
  product,
  selectedSize,
  setSelectedSize,
  onClose,
  onAddToCart,
  headerProps,
}) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) return
    if (onAddToCart) onAddToCart({ product, size: selectedSize })
    setAdded(true)
  }
  const productImage = useMemo(() => {
    if (!product?.images || product.images.length === 0) return ''
    const primaryImg =
      product.images.find((img) => img.isPrimary) || product.images[0]
    return primaryImg?.imageUrl || ''
  }, [product])

  const categoryLabel = product.collectionName

  return (
    <>
      <div
        className="mb-5 flex items-start justify-between gap-4"
        {...headerProps}
      >
        <div>
          <p className="text-label text-primary mb-2 tracking-wider uppercase">
            {categoryLabel}
          </p>
          <h3
            id="quick-add-title"
            className="text-foreground text-2xl leading-none font-bold uppercase"
          >
            {product.name}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="border-border text-muted bg-background/50 inline-flex size-11 items-center justify-center rounded-full border transition-colors hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mb-5 flex items-start gap-4">
        {/* IMMAGINE */}
        <div className="bg-card border-border h-50 w-40 shrink-0 overflow-hidden rounded-xl border">
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* INFO DETTAGLI */}
        <div className="flex h-50 min-w-0 flex-col justify-between py-1">
          <p className="line-clamp-4 text-sm leading-relaxed text-white/75">
            {product.description || 'No description available for this item.'}
          </p>
          <p className="text-mono text-foreground mt-2 text-xl font-bold">
            € {product.price?.toFixed(2)}
          </p>
        </div>
      </div>

      {/* SELEZIONE TAGLIE */}
      <div className="mb-6">
        <p className="text-label text-muted mb-3 font-mono text-xs tracking-wider uppercase">
          Size
        </p>

        <div className="flex flex-wrap gap-2">
          {product.variants && product.variants.length > 0 ? (
            product.variants.map((variant) => {
              const sizeValue = variant.size
              // Il bottone diventa disattivato se lo stock è 0 o negativo
              const isAvailable = variant.stockQuantity > 0
              const isActive = selectedSize === sizeValue

              return (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => setSelectedSize(sizeValue)}
                  className={`border-border inline-flex h-11 min-w-12 items-center justify-center border px-4 font-mono text-sm font-bold transition-colors ${
                    !isAvailable
                      ? 'text-muted cursor-not-allowed border-dashed bg-white/5 line-through opacity-20'
                      : isActive
                        ? 'bg-primary text-background border-primary'
                        : 'text-foreground hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  {sizeValue}
                </button>
              )
            })
          ) : (
            <p className="font-mono text-sm text-white/40">
              NO SIZES AVAILABLE
            </p>
          )}
        </div>
      </div>

      {/* AZIONI */}
      <div className="flex gap-3">
        <Link
          to={`/product/${product.id}`}
          className="btn-secondary flex-1"
          onClick={onClose}
        >
          Details
          <ArrowRight className="ml-2" size={16} />
        </Link>

        <button
          type="button"
          className="btn-primary flex-1"
          disabled={!selectedSize}
          onClick={handleAddToCart}
        >
          {added ? (
            <>
              ADDED
              <Check className="ml-2" size={16} />
            </>
          ) : selectedSize ? (
            'ADD TO BAG'
          ) : (
            'SELECT SIZE'
          )}
        </button>
      </div>
    </>
  )
}
