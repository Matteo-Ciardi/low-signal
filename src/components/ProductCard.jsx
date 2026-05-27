const tagClasses = {
  RESTOCKED: 'bg-background text-foreground',
  'NEW DROP': 'bg-primary text-background',
  LIMITED: 'bg-foreground text-background',
}

export default function ProductCard({ product }) {
  return (
    <>
      <div className="group cursor-pointer">
        <div className="relative mb-4 overflow-hidden">
          <span
            className={`z-10 text-label absolute top-4 left-4 px-2 py-1 font-extrabold lg:px-4 lg:py-2 ${tagClasses[product.tag] || 'bg-primary text-background'}`}
          >
            {product.tag}
          </span>
          <img
            src={product.img}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="hidden absolute bottom-0 left-0 bg-primary py-4 group-hover:block hover:bg-orange-300 w-full text-center">
            <button className="text-mono font-extrabold text-background">QUICK ADD +</button>
          </div>
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
