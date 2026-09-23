export default function SizeSelector({
  variants = [],
  selectedSize,
  onSelectSize,
}) {
  return (
    <div className="mb-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-label text-muted font-mono text-xs tracking-wider uppercase">
          Select Size
        </p>
        <button
          type="button"
          className="text-label text-muted font-mono text-xs underline transition-colors hover:text-foreground"
        >
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const sizeValue = variant.size
          const isAvailable = variant.stockQuantity > 0
          const isActive = selectedSize === sizeValue

          return (
            <button
              key={variant.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelectSize(sizeValue)}
              className={`border-border inline-flex h-11 min-w-12 items-center justify-center border px-4 font-mono text-sm font-bold transition-colors ${
                !isAvailable
                  ? 'text-muted cursor-not-allowed border-dashed bg-white/5 line-through opacity-20'
                  : isActive
                    ? 'bg-foreground text-background border-foreground'
                    : 'text-foreground hover:border-white/30 hover:bg-white/5'
              }`}
            >
              {sizeValue}
            </button>
          )
        })}
      </div>

      {!selectedSize && (
        <p className="text-red-500 mt-3 text-sm">
          Please select a size to continue.
        </p>
      )}
    </div>
  )
}
