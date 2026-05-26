import ProductCard from './ProductCard'
import { products } from '@/data/products'

export default function HomeGrid() {
  return (
    <>
      <div className="product-grid">
        {products.map((prod) => {
          return <ProductCard key={prod.id} product={prod} />
        })}
      </div>
    </>
  )
}
