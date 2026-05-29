import { ArrowRight, X } from "lucide-react"

export default function QuickAddContent({
  product,
  selectedSize,
  setSelectedSize,
  onClose,
  headerProps
}) {
  return (
    <>
      <div className="mb-5 flex items-start justify-between gap-4"
      {...headerProps}>
        <div>
          <p className="text-label text-primary mb-2">
            {product.collection} / {product.category}
          </p>
          <h3
            id="quick-add-title"
            className="text-foreground text-2xl leading-none"
          >
            {product.name}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="border-border text-muted inline-flex size-11 items-center justify-center rounded-full border"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mb-5 flex items-start gap-4">
        <div className="bg-card h-50 w-40 shrink-0 overflow-hidden rounded-xl">
          <img
            src={product.img}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm leading-relaxed text-white/75">
            {product.desc}
          </p>
          <p className="text-mono text-foreground mt-2 text-lg">
            € {product.price}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-label text-muted mb-3">Size</p>

        <div className="flex flex-wrap gap-2">
          {product.sizes?.map((size) => {
            const isActive = selectedSize === size

            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`border-border inline-flex h-11 min-w-12 items-center justify-center border px-4 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-background border-primary'
                    : 'text-foreground'
                }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          className="btn-secondary flex-1"
          onClick={onClose}
        >
          Details
          <ArrowRight className="ml-2" size={16} />
        </button>

        <button type="button" className="btn-primary flex-1">
          Add to bag
        </button>
      </div>
    </>
  )
}
