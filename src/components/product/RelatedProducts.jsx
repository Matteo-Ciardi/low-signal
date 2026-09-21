import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const tagClasses = {
  RESTOCKED: 'bg-background text-foreground',
  'NEW DROP': 'bg-primary text-background',
  LIMITED: 'bg-foreground text-background',
  'SOLD OUT': 'bg-secondary text-foreground',
}

export default function RelatedProducts({ products = [] }) {
  if (products.length === 0) return null

  return (
    <section className="mt-12 mb-16">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-label font-mono text-xs font-bold uppercase">
          Also in SS25
        </h3>
        <Link
          to="/collections"
          className="text-label text-muted flex items-center gap-2 text-xs transition-colors hover:text-foreground"
        >
          VIEW ALL
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => {
          const primaryImg =
            product.images?.find((img) => img.isPrimary) ||
            product.images?.[0]

          return (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="group"
            >
              <div className="bg-card relative aspect-[4/5] overflow-hidden">
                <span
                  className={`text-label absolute top-3 left-3 z-20 inline-flex px-3 py-2 font-bold ${
                    tagClasses[product.tag] ?? 'bg-card text-foreground'
                  }`}
                >
                  {product.tag || 'NEW DROP'}
                </span>

                {primaryImg && (
                  <img
                    src={primaryImg.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 flex">
                  <span className="text-mono bg-card border-border flex-1 border-t py-2.5 text-center text-xs font-bold uppercase">
                    Details
                  </span>
                  <span className="bg-primary text-background flex-1 border-t py-2.5 text-center text-xs font-bold uppercase">
                    Quick Add
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-foreground text-sm font-semibold">
                    {product.name}
                  </p>
                  <span className="text-mono text-foreground shrink-0 text-sm">
                    ${product.price}
                  </span>
                </div>
                <p className="text-muted text-xs uppercase">
                  {product.collectionName}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
