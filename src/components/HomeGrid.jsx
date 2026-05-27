import ProductCard from './ProductCard'
import { products } from '@/data/products'

export default function HomeGrid() {
  return (
    <>
      <div className="product-grid">
        {products.map((prod) => {
          if (prod.tag === 'NEW DROP' | prod.collection === 'SS25') {
            return <ProductCard key={prod.id} product={prod} />
          }
        })}
      </div>
    </>
  )
}
