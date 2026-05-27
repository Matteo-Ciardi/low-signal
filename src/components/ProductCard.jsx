export default function ProductCard({ product }) {
  const tagClasses = {
    RESTOCKED: 'bg-background text-foreground',
    'NEW DROP': 'bg-primary text-background',
    LIMITED: 'bg-foreground text-background',
  }

  return (
    <>
      <div className="cursor-pointer">
        <div className="relative mb-4">
          <span
            className={`text-label absolute top-4 left-4 px-2 py-1 lg:px-4 lg:py-2 font-extrabold ${tagClasses[product.tag]}`}
          >
            {product.tag}
          </span>
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
