export default function ProductCard({ product }) {
  return (
    <>
      <div>
        <div className="mb-4">
          <img
            src={product.img}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-foreground text-xl font-bold">
              {product.name}
            </span>

            <span>{product.category}</span>
          </div>

          <div>
            <span className="text-foreground text-mono text-xl font-bold">
              €{product.price}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
